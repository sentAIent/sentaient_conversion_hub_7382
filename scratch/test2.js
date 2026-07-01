const puppeteer = require('puppeteer');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error('[Browser Error]', msg.text());
        } else if (!msg.text().includes('Failed to load resource')) {
            console.log('[Browser]', msg.text());
        }
    });

    console.log('Loading page...');
    await page.goto('http://localhost:8080/interstellar-game/', { waitUntil: 'networkidle0' });
    
    console.log('Wait 2s for UI to build...');
    await new Promise(r => setTimeout(r, 2000));

    console.log('Clicking Deep Space...');
    const start = Date.now();
    await page.evaluate(() => {
        const btn = document.querySelector('.bg-toggle[data-style="deep-space"]');
        if (btn) btn.click();
    });
    console.log(`Click done. Waiting 2s...`);
    
    await new Promise(r => setTimeout(r, 2000));
    const dt = Date.now() - start;
    console.log(`Total time since click: ${dt}ms`);
    
    console.log('Done.');
    await browser.close();
})();
