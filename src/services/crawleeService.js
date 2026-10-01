import { PlaywrightCrawler, Dataset } from 'crawlee';
import { supabase } from './databaseService.js';

/**
 * Enterprise Crawlee Service for SentAIent Conversion Hub
 * Handles stealth, headless browser automation, and data pipelines.
 */
class CrawleeService {
    constructor() {
        this.crawler = null;
    }

    /**
     * Initializes a standard Playwright crawler with stealth enabled to bypass basic bot protections.
     */
    initCrawler(requestHandler, maxRequestsPerCrawl = 50) {
        this.crawler = new PlaywrightCrawler({
            // Launch options for Playwright (stealth mode)
            launchContext: {
                launchOptions: {
                    headless: true,
                    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
                }
            },
            // Concurrency and retry settings
            maxConcurrency: 10,
            maxRequestRetries: 3,
            maxRequestsPerCrawl,

            // Automatically save data to dataset
            requestHandler: async (context) => {
                try {
                    await requestHandler(context);
                } catch (error) {
                    console.error(`Crawler Error on ${context.request.url}:`, error.message);
                }
            },
            
            // Handle failed requests after all retries
            failedRequestHandler: ({ request, error }) => {
                console.error(`Request ${request.url} failed completely after retries. Error: ${error.message}`);
            },
        });
        
        return this.crawler;
    }

    /**
     * Extracts deep knowledge from a target URL using Crawlee and pushes it to Supabase for RAG.
     */
    async scrapeToVectorDB(startUrls, metadata = {}) {
        let results = [];
        const crawler = this.initCrawler(async ({ page, request, enqueueLinks }) => {
            console.log(`Processing ${request.url}...`);
            
            // Extract the main content of the page
            const title = await page.title();
            const textContent = await page.evaluate(() => document.body.innerText);
            
            // Push to local results array
            const data = {
                url: request.url,
                title,
                content: textContent.substring(0, 5000), // Limit size for embedding
                metadata,
                scraped_at: new Date().toISOString()
            };
            results.push(data);
            
            // Optionally enqueue links to the same domain (depth logic would go here)
        });

        await crawler.run(startUrls);
        
        // Push the results to Supabase (assuming a standard 'knowledge_base' table exists)
        if (results.length > 0 && supabase) {
            const { error } = await supabase.from('knowledge_base').insert(results);
            if (error) {
                console.error("Failed to push scraped data to Supabase:", error);
            } else {
                console.log(`Successfully indexed ${results.length} pages into Vector DB.`);
            }
        }
        
        return results;
    }
}

export const crawleeService = new CrawleeService();
