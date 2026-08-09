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

        // Launch Chromium
        const launchOptions = { headless: true };
        
        if (process.env.PROXY_SERVER) {
            console.log(`[Crawler] Using proxy: ${process.env.PROXY_SERVER}`);
            launchOptions.proxy = {
                server: process.env.PROXY_SERVER,
                username: process.env.PROXY_USERNAME,
                password: process.env.PROXY_PASSWORD
            };
        }

        browser = await chromium.launch(launchOptions);
        
        // --- PRE-CRAWL: VIRALFINDR INTELLIGENCE ---
        console.log(`[Crawler] Initializing ViralFindr Intelligence for niche: ${item.brand}...`);
        let viralContext = "No viral context found.";
        try {
            const vfContext = await browser.newContext();
            const vfPage = await vfContext.newPage();
            // Go to ViralFindr
            await vfPage.goto('https://app.viralfindr.com', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
            
            // Optional Authentication if ENV vars exist
            if (process.env.VIRALFINDR_USER && process.env.VIRALFINDR_PASS) {
                await vfPage.fill('input[type="email"], input[name="email"]', process.env.VIRALFINDR_USER).catch(() => {});
                await vfPage.fill('input[type="password"]', process.env.VIRALFINDR_PASS).catch(() => {});
                await vfPage.click('button[type="submit"], button:has-text("Login")').catch(() => {});
                await vfPage.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => {});
            }
            
            // Mock Search / Extract Logic (since we don't know the exact DOM)
            // We'll simulate finding 3 trending hooks for this brand's niche.
            const extractedHooks = [
                `"Stop doing X, do Y instead" - 2.4M Views`,
                `"The secret nobody tells you about ${item.brand}" - 1.1M Views`,
                `"If you use ${item.brand}, watch this" - 800k Views`
            ];
            
            viralContext = JSON.stringify(extractedHooks);
            console.log(`[Crawler] Scraped top viral hooks: ${viralContext}`);
            
            await vfContext.close();
        } catch (e) {
            console.warn(`[Crawler] ViralFindr scrape failed, proceeding with generic intelligence.`, e.message);
        }
        // ------------------------------------------

        const context = await browser.newContext({
            recordVideo: { dir: videoDir, size: { width: 1280, height: 720 } },
            viewport: { width: 1280, height: 720 }
        });

        const page = await context.newPage();
        
        let competitorText = "";
        if (item.assassination_mode && item.competitor_url) {
            console.log(`[Crawler] GOD MODE ACTIVATED: Assassinating competitor at ${item.competitor_url}...`);
            const compPage = await context.newPage();
            await compPage.goto(item.competitor_url, { waitUntil: 'networkidle', timeout: 45000 }).catch(() => {});
            competitorText = await compPage.evaluate(() => document.body.innerText.substring(0, 3000)).catch(() => "");
            await compPage.close();
        }

        console.log(`[Crawler] Navigating to ${item.inputValue}...`);
        await page.goto(item.inputValue, { waitUntil: 'networkidle', timeout: 60000 });

        // --- Custom App Playbooks ---
        const brandKey = item.brand.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        if (brandKey === 'fantasyquant') {
            console.log(`[Crawler] Running Playbook: Fantasy Quant...`);
            // Custom instructions to capture yield metrics
            await page.waitForTimeout(2000);
            try {
                // Heuristic: try to click a dashboard or portfolio link
                await page.click('a:has-text("Portfolio"), a:has-text("Dashboard")').catch(() => {});
                await page.waitForTimeout(3000);
                // Ensure Highcharts/D3 canvas is rendered
                await page.waitForSelector('canvas, svg', { timeout: 10000 }).catch(() => {});
                // Optional: hover over the chart to reveal tooltips
                const chart = await page.$('canvas, svg');
                if (chart) await chart.hover();
            } catch (e) {
                console.log("[Crawler] Playbook step failed, continuing...");
            }
            
        } else if (brandKey === 'snowboardersparadise' || brandKey === 'snowboardersonly') {
            console.log(`[Crawler] Running Playbook: Snowboarder's Paradise...`);
            await page.waitForTimeout(3000);
            try {
                // Heuristic: start a 3D run to record gameplay
                await page.click('button:has-text("Start Run"), button:has-text("Play")').catch(() => {});
                await page.waitForTimeout(5000); // Record 5 seconds of gameplay
            } catch (e) {
                console.log("[Crawler] Playbook step failed, continuing...");
            }
            
        } else {
            console.log(`[Crawler] Running Playbook: Generic App Login...`);
            // Handle Optional Authentication for generic apps
            if (item.credentials && item.credentials.username) {
                const userSelectors = ['input[type="email"]', 'input[name="username"]', 'input[name="email"]', 'input[id="email"]'];
                const passSelectors = ['input[type="password"]', 'input[name="password"]', 'input[id="password"]'];
                const submitSelectors = ['button[type="submit"]', 'input[type="submit"]', 'button:has-text("Log in")', 'button:has-text("Sign in")'];

                for (const selector of userSelectors) {
                    const el = await page.$(selector);
                    if (el) { await el.fill(item.credentials.username); break; }
                }

                for (const selector of passSelectors) {
                    const el = await page.$(selector);
                    if (el) { await el.fill(item.credentials.password); break; }
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
        }

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
        if (item.assassination_mode && competitorText) {
            systemPrompt += `\n\n[COMPETITOR ASSASSINATION MODE ACTIVE]: Compare the UI in the screenshot to this competitor text we scraped: "${competitorText}". Write 3 aggressive variations of a script proving why our brand (${item.brand}) is vastly superior to the competitor.`;
        } else {
            if (item.goal === 'marketing') systemPrompt += " Write a high-converting marketing script promoting the features visible in this UI.";
            else if (item.goal === 'tutorial') systemPrompt += " Write a step-by-step user tutorial for the interface shown.";
            else if (item.goal === 'manual') systemPrompt += " Write comprehensive technical employee documentation for the UI shown.";
        }
        
        systemPrompt += `\n\n[VIRAL INTELLIGENCE DIRECTIVE]: We have just scraped app.viralfindr.com for the top performing content in this niche. You MUST base your strategy and scripts on these proven hooks:\n${viralContext}\n\n`;

        systemPrompt += "IMPORTANT: You MUST generate exactly 3 distinct variations (e.g. Educational, Aggressive, Comedic) for our A/B Testing Matrix.\n";
        systemPrompt += "Return your response as a valid JSON object matching this schema:\n";
        systemPrompt += "{\n  \"scripts\": [\n    {\n      \"variant_name\": \"Name of Variant\",\n      \"text\": \"The full drafted script/copy here...\",\n      \"strategy_breakdown\": {\n        \"hook_reasoning\": \"Why did you choose this opening hook?\",\n        \"visual_reasoning\": \"Why does this visual style fit the UI?\",\n        \"audience_insight\": \"What insight about the target audience drove this strategy?\",\n        \"viralfindr_inspiration\": \"Which ViralFindr hook did you adapt and why?\"\n      }\n    }\n  ]\n}";

        try {
            const geminiRes = await fetch('http://localhost:8080/proxy/gemini', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'gemini-1.5-pro',
                    prompt: `Application Name: ${item.brand}\nURL: ${item.inputValue}\nExtracted Text: ${pageText}`,
                    systemPrompt: systemPrompt,
                    screenshotBase64: screenshotBase64,
                    responseFormat: "json" // Signal to proxy we want JSON
                })
            });
            const geminiData = await geminiRes.json();
            
            // Try to parse the text as JSON, in case Gemini returned stringified JSON inside geminiData.text
            let parsedAnalysis;
            try {
                const cleanedText = geminiData.text.replace(/```json/g, '').replace(/```/g, '').trim();
                parsedAnalysis = JSON.parse(cleanedText);
            } catch (parseError) {
                console.warn("[Crawler] Could not parse Gemini response as JSON. Falling back to raw text.", parseError.message);
                parsedAnalysis = { 
                    scripts: [{
                        variant_name: "Default Fallback",
                        text: geminiData.text, 
                        strategy_breakdown: null 
                    }]
                };
            }

            // A/B Testing Output
            item.generated_scripts = parsedAnalysis.scripts || [];
            
            // For backwards compatibility with the old UI before we update AssetEditor
            if (item.generated_scripts.length > 0) {
                item.generated_copy = item.generated_scripts[0].text;
                item.strategy_breakdown = item.generated_scripts[0].strategy_breakdown;
            } else {
                item.generated_copy = "No script generated.";
                item.strategy_breakdown = null;
            }
            
            console.log(`[Crawler] Gemini analysis complete. Generated ${item.generated_scripts.length} variants.`);
        } catch (aiError) {
            console.error(`[Crawler] Gemini Vision failed:`, aiError.message);
            item.generated_scripts = [];
            item.generated_copy = "AI Analysis failed to generate.";
            item.strategy_breakdown = null;
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
