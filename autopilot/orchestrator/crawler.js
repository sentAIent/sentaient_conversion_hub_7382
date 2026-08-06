import { chromium } from 'playwright';
import * as dotenv from 'dotenv';
import { createClient } from 'redis';
import fs from 'fs';
import path from 'path';

dotenv.config();

const redis = createClient({ 
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD
});

redis.on('error', (err) => console.error('[Crawler] Redis Error', err));

async function startCrawlerWorker() {
    await redis.connect();
    console.log("[Crawler] Autonomous Browser Engine started. Polling for apps to crawl...");
    setInterval(pollCrawlerQueue, 30000); // Poll every 30 seconds
    pollCrawlerQueue();
}

async function pollCrawlerQueue() {
    try {
        const keys = await redis.keys("queue:*");
        for (const key of keys) {
            const dataStr = await redis.get(key);
            if (!dataStr) continue;
            
            const item = JSON.parse(dataStr);
            
            // Only process items meant for the browser agent that are approved
            if (item.campaignType === 'browser_agent' && item.status === 'approved_for_publishing') {
                console.log(`[Crawler] Found app to crawl: ${item.brand} at ${item.inputValue}`);
                await crawlApp(key, item);
            }
        }
    } catch (err) {
        console.error("[Crawler] Queue poll error:", err);
    }
}

async function crawlApp(key, item) {
    let browser;
    try {
        // Mark as crawling
        item.status = 'crawling';
        await redis.set(key, JSON.stringify(item));

        const outputDir = process.env.MEDIA_OUTPUT_PATH || path.join(process.cwd(), '../media/staging');
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const timestamp = Date.now();
        const screenshotPath = path.join(outputDir, `${item.brand}_${timestamp}.png`);
        const videoDir = path.join(outputDir, `vid_${item.brand}_${timestamp}`);

        // Launch Chromium with video recording enabled
        browser = await chromium.launch({ headless: true });
        const context = await browser.newContext({
            recordVideo: { dir: videoDir, size: { width: 1280, height: 720 } },
            viewport: { width: 1280, height: 720 }
        });

        const page = await context.newPage();

        console.log(`[Crawler] Navigating to ${item.inputValue}...`);
        await page.goto(item.inputValue, { waitUntil: 'networkidle', timeout: 60000 });

        // Handle Optional Authentication
        if (item.credentials && item.credentials.username) {
            console.log(`[Crawler] Attempting login for ${item.brand}...`);
            // Basic heuristic login logic (would need AI heuristics in production)
            const userSelectors = ['input[type="email"]', 'input[name="username"]', 'input[name="email"]', 'input[id="email"]'];
            const passSelectors = ['input[type="password"]', 'input[name="password"]', 'input[id="password"]'];
            const submitSelectors = ['button[type="submit"]', 'input[type="submit"]', 'button:has-text("Log in")', 'button:has-text("Sign in")'];

            for (const selector of userSelectors) {
                const el = await page.$(selector);
                if (el) {
                    await el.fill(item.credentials.username);
                    break;
                }
            }

            for (const selector of passSelectors) {
                const el = await page.$(selector);
                if (el) {
                    await el.fill(item.credentials.password);
                    break;
                }
            }

            for (const selector of submitSelectors) {
                const el = await page.$(selector);
                if (el) {
                    await el.click();
                    await page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
                    break;
                }
            }
        }

        // Wait a few seconds for dashboards to load animations
        await page.waitForTimeout(3000);

        // Take Full Page Screenshot
        console.log(`[Crawler] Capturing screenshot...`);
        await page.screenshot({ path: screenshotPath, fullPage: true });

        // Extract DOM text for Gemini analysis
        console.log(`[Crawler] Extracting page text...`);
        const pageText = await page.evaluate(() => document.body.innerText.substring(0, 5000));

        // Close context to finish video recording
        await context.close();
        
        // Find the generated video file
        const videoFiles = fs.readdirSync(videoDir).filter(f => f.endsWith('.webm'));
        let finalVideoPath = null;
        if (videoFiles.length > 0) {
            finalVideoPath = path.join(videoDir, videoFiles[0]);
        }

        console.log(`[Crawler] Uploading assets to MinIO...`);
        const assetUrls = {
            screenshotUrl: `http://localhost:9000/sentaient-assets/staging/${path.basename(screenshotPath)}`,
            videoUrl: finalVideoPath ? `http://localhost:9000/sentaient-assets/staging/${path.basename(finalVideoPath)}` : null,
        };

        // --- GEMINI VISION ANALYSIS ---
        console.log(`[Crawler] Sending screenshot to Gemini Vision for understanding...`);
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        const screenshotBase64 = screenshotBuffer.toString('base64');
        
        let systemPrompt = "You are an expert Autonomous Browser Intelligence Agent. Analyze this application screenshot and its text.";
        if (item.goal === 'marketing') systemPrompt += " Write a high-converting marketing script promoting the features visible in this UI.";
        else if (item.goal === 'tutorial') systemPrompt += " Write a step-by-step user tutorial for the interface shown.";
        else if (item.goal === 'manual') systemPrompt += " Write comprehensive technical employee documentation for the UI shown.";

        try {
            const geminiRes = await fetch('http://localhost:8080/proxy/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gemini-1.5-pro',
                    prompt: `Application Name: ${item.brand}\nURL: ${item.inputValue}\nExtracted Text: ${pageText}`,
                    systemPrompt: systemPrompt,
                    screenshotBase64: screenshotBase64
                })
            });
            const geminiData = await geminiRes.json();
            item.generated_copy = geminiData.text;
            console.log(`[Crawler] Gemini analysis complete.`);
        } catch (aiError) {
            console.error(`[Crawler] Gemini Vision failed:`, aiError.message);
            item.generated_copy = "AI Analysis failed to generate.";
        }
        // ------------------------------

        // Mark as fully complete (or ready for user review)
        item.status = 'asset_generation_complete';
        item.crawledData = {
            screenshotPath,
            videoPath: finalVideoPath,
            pageText,
            assetUrls
        };

        await redis.set(key, JSON.stringify(item));
        console.log(`[Crawler] Finished crawl for ${item.brand}. Ready for user review.`);

    } catch (err) {
        console.error(`[Crawler] Failed to crawl ${item.brand}:`, err.message);
        item.status = 'failed';
        item.error = err.message;
        await redis.set(key, JSON.stringify(item));
    } finally {
        if (browser) await browser.close();
    }
}

startCrawlerWorker();
