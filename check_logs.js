const { chromium } = require('playwright');

(async () => {
    console.log('Launching browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
        console.log(`[PAGE CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
    });
    
    page.on('pageerror', error => {
        console.log(`[PAGE ERROR]: ${error.message}`);
    });

    console.log('Navigating to http://localhost:5173/mindwave.html...');
    try {
        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle', timeout: 30000 });
        console.log('Page loaded successfully.');
        // Wait an extra 3 seconds to let visualizer init
        await page.waitForTimeout(3000);
    } catch (err) {
        console.error(`Navigation failed: ${err.message}`);
    } finally {
        await browser.close();
    }
})();
