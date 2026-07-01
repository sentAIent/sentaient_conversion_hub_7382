const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error('[Browser Error]', msg.text());
        } else {
            console.log('[Browser Log]', msg.text());
        }
    });

    await page.goto('http://localhost:8080/interstellar-game/', { waitUntil: 'networkidle0' });
    
    console.log('--- Clicking Deep Space ---');
    await page.evaluate(() => {
        const btn = document.querySelector('.bg-toggle[data-style="deep-space"]');
        if (btn) btn.click();
    });
    
    await new Promise(r => setTimeout(r, 2000));
    console.log('--- Done ---');
    
    await browser.close();
})();
