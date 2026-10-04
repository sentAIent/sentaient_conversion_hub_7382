import { PlaywrightCrawler, Dataset } from 'crawlee';

// This is a specialized Crawlee scraper for Sentaient
// It navigates to a company URL, finds Privacy Policies / TOS, and extracts text.

const crawler = new PlaywrightCrawler({
    async requestHandler({ request, page, enqueueLinks, log }) {
        log.info(`Processing ${request.url}...`);

        // Extract title and text
        const title = await page.title();
        const content = await page.locator('body').innerText();

        // Save results to dataset
        await Dataset.pushData({
            url: request.url,
            title,
            content: content.substring(0, 10000), // limit for LLM context
            scrapedAt: new Date().toISOString()
        });

        // If we are on the homepage, look for legal links
        if (request.label === 'START') {
            await enqueueLinks({
                globs: ['**/privacy*', '**/terms*', '**/legal*'],
                label: 'LEGAL_DOC',
            });
        }
    },
    maxRequestsPerCrawl: 10,
});

async function runScraper(startUrl: string) {
    await crawler.addRequests([{ url: startUrl, label: 'START' }]);
    await crawler.run();
    console.log('Scraping finished. Data saved to ./storage/datasets/default');
}

const targetUrl = process.argv[2] || 'https://example.com';
runScraper(targetUrl);
