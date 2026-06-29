const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Capture all console logs
    page.on('console', msg => {
        const type = msg.type().toUpperCase();
        console.log(`[${type}] ${msg.text()}`);
    });

    // Handle page errors
    page.on('pageerror', error => {
        console.error(`[PAGE ERROR] ${error.message}`);
    });

    console.log("Navigating to http://127.0.0.1:8081/ ...");
    await page.goto('http://127.0.0.1:8081/', { waitUntil: 'networkidle2', timeout: 30000 });
    
    console.log("Page loaded. Waiting 10 seconds...");
    await new Promise(r => setTimeout(r, 10000));
    
    await browser.close();
})();
