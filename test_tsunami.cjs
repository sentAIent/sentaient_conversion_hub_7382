const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    
    await page.goto('http://localhost:8080/mindwave.html', { waitUntil: 'networkidle' });
    
    console.log("Page loaded. Waiting for UI...");
    await page.waitForTimeout(2000);
    
    console.log("Clicking tsunami button...");
    await page.click('#tsunamiBtn');
    
    await page.waitForTimeout(2000);
    
    console.log("Taking screenshot...");
    await page.screenshot({ path: 'tsunami_test.png' });
    
    await browser.close();
})();
