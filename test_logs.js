const puppeteer = require('puppeteer');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

    console.log('Navigating to http://localhost:5173/mindwave.html...');
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2' });
    
    console.log('Waiting 5 seconds...');
    await new Promise(r => setTimeout(r, 5000));
    
    await browser.close();
})();
