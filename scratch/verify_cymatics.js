const puppeteer = require('puppeteer');

(async () => {
    console.log('[Puppeteer] Launching headless browser...');
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    // Set a large viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('[Puppeteer] Navigating to localhost:5173...');
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle0' });
    
    console.log('[Puppeteer] Waiting 5 seconds...');
    await new Promise(r => setTimeout(r, 5000));
    
    console.log('[Puppeteer] Clicking Cymatics tab...');
    await page.evaluate(() => {
        const cymaticsPill = Array.from(document.querySelectorAll('.tab-pill')).find(p => p.innerText.includes('Cymatics'));
        if (cymaticsPill) {
            cymaticsPill.click();
        } else {
            console.log('Cymatics tab not found!');
        }
    });

    await new Promise(r => setTimeout(r, 2000));
    
    console.log('[Puppeteer] Capturing screenshot...');
    await page.screenshot({ path: 'scratch/ui_verify.png' });
    
    await browser.close();
    console.log('[Puppeteer] Done!');
})();
