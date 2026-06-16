import { chromium } from 'playwright';

(async () => {
    console.log('Launching browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
        console.log(`[CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
    });
    
    page.on('pageerror', error => {
        console.log(`[PAGE ERROR]: ${error.message}`);
    });

    console.log('Navigating to http://127.0.0.1:5173/mindwave.html...');
    try {
        await page.goto('http://127.0.0.1:5173/mindwave.html', { waitUntil: 'domcontentloaded', timeout: 15000 });
        console.log('Page DOM loaded.');
        await page.waitForTimeout(5000);
    } catch (err) {
        console.error(`Navigation failed: ${err.message}`);
    } finally {
        await browser.close();
    }
})();
