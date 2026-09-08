import { PlaywrightCrawler, Dataset } from 'crawlee';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

/**
 * Executes a stealth headless browser scrape using Crawlee.
 * @param {string} targetUrl - The URL to scrape.
 * @returns {Promise<string>} - The extracted raw text/metadata from the page.
 */
export async function scrapeTarget(targetUrl) {
    if (!targetUrl.startsWith('http')) {
        targetUrl = 'https://' + targetUrl;
    }

    console.log(`[Crawlee] Initializing stealth crawler for: ${targetUrl}`);
    
    let extractedText = '';

    const crawler = new PlaywrightCrawler({
        launchContext: {
            launchOptions: {
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            }
        },
        maxRequestsPerCrawl: 1, // Only scrape the target page for now
        async requestHandler({ page, request, log }) {
            log.info(`Processing ${request.url}...`);
            
            // Wait for network to be idle to ensure SPA frameworks render
            await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => log.warning('Network idle timeout, proceeding anyway.'));
            
            // Extract the main body text, stripping out massive JS/CSS blocks
            const textContent = await page.evaluate(() => {
                // Remove scripts, styles, noscript, etc.
                document.querySelectorAll('script, style, noscript, iframe, img, svg').forEach(el => el.remove());
                return document.body.innerText;
            });

            const title = await page.title();
            const metaDescription = await page.locator('meta[name="description"]').getAttribute('content').catch(() => '');

            extractedText = `TITLE: ${title}\nDESCRIPTION: ${metaDescription}\n\nCONTENT:\n${textContent.substring(0, 15000)}`; // limit to 15k chars for prompt safety
            
            log.info(`Successfully extracted ${extractedText.length} characters.`);
        },
        failedRequestHandler({ request, log }) {
            log.error(`Request ${request.url} failed too many times.`);
            extractedText = `Failed to scrape content from ${request.url}.`;
        },
    });

    try {
        await crawler.run([targetUrl]);
        return extractedText;
    } catch (e) {
        console.error('[Crawlee] Engine failure:', e);
        return `Failed to scrape content due to engine error: ${e.message}`;
    }
}

/**
 * Takes a screenshot of a live social media post URL using Playwright.
 * @param {string} postUrl - The URL of the live post
 * @param {string} savePath - Absolute path to save the .png
 */
export async function screenshotPost(postUrl, savePath) {
    console.log(`[Crawlee] Taking screenshot of: ${postUrl}`);
    const crawler = new PlaywrightCrawler({
        launchContext: {
            launchOptions: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] }
        },
        maxRequestsPerCrawl: 1,
        async requestHandler({ page }) {
            // Wait for network idle and main content to load
            await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
            
            // Try to dismiss common cookie banners/modals if they obscure the post
            await page.evaluate(() => {
                document.querySelectorAll('[role="dialog"], #cookie-banner, .cookie-notice').forEach(el => el.remove());
                document.body.style.overflow = 'hidden'; // Hide scrollbars
            }).catch(() => {});

            await page.screenshot({ path: savePath, fullPage: false });
            console.log(`[Crawlee] Screenshot saved to: ${savePath}`);
        },
    });

    await crawler.run([postUrl]);
}
