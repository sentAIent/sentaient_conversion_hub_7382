const { PlaywrightCrawler, Dataset } = require('crawlee');
const fs = require('fs');
const path = require('path');

// Target a sample ski report page (e.g. onthesnow or similar)
// For this demo, we'll mock the extraction to avoid getting blocked by Cloudflare,
// but the architecture is fully implemented using PlaywrightCrawler.

const crawler = new PlaywrightCrawler({
    // headless: true is default
    async requestHandler({ page, request, log }) {
        log.info(`Processing ${request.url}...`);
        
        // In a real scenario:
        // const temperature = await page.locator('.temp-value').textContent();
        // const snowfall = await page.locator('.snow-depth').textContent();
        
        // We simulate extraction
        const data = {
            url: request.url,
            temperature: -5 + Math.random() * 10, // Simulated -5 to 5 Celsius
            snowfallLevel: 0.5 + Math.random() * 2, // Simulated 0.5 to 2.5 meters
            timestamp: new Date().toISOString()
        };
        
        log.info(`Extracted data: ${JSON.stringify(data)}`);
        
        // Save to assets for the game to consume
        const dir = path.join(__dirname, '..', 'assets', 'data');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir, { recursive: true });
        }
        
        fs.writeFileSync(
            path.join(dir, 'liveWeather.json'), 
            JSON.stringify(data, null, 2)
        );
        
        log.info('Live weather data written to assets/data/liveWeather.json');
    },
    
    failedRequestHandler({ request, log }) {
        log.error(`Request ${request.url} failed too many times.`);
    }
});

async function runScraper() {
    console.log('Starting Sentaient Weather Scraper...');
    // We add a target URL (even if we mock the extraction inside the handler)
    await crawler.addRequests(['https://example.com/ski-report']);
    await crawler.run();
    console.log('Scraping finished.');
}

runScraper();
