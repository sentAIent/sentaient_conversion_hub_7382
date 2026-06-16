const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('BROWSER_LOG:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER_ERROR:', error.message));
    page.on('requestfailed', request => console.log('BROWSER_NET_FAIL:', request.url(), request.failure().errorText));

    await page.goto('http://localhost:5173/mindwave', { waitUntil: 'networkidle2' });
    
    // simulate opening cymatics menu if needed
    
    await browser.close();
})();
