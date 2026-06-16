import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('[CONSOLE LOG]', msg.text()));
    page.on('pageerror', err => console.log('[PAGE ERROR]', err.toString()));
    
    console.log("Navigating to http://localhost:8001/mindwave.html");
    await page.goto('http://localhost:8001/mindwave.html', { waitUntil: 'networkidle0', timeout: 15000 });
    
    await page.screenshot({ path: 'test_load_screenshot.png' });
    console.log("Saved screenshot to test_load_screenshot.png");
    
    await browser.close();
})();
