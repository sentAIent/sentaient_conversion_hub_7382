const puppeteer = require('puppeteer');

(async () => {
    console.log('[Puppeteer] Launching headless browser...');
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    // Set a large viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Dump console logs
    page.on('console', msg => {
        if(msg.type() === 'error' || msg.type() === 'warning') {
            console.log(`[Browser ${msg.type()}] ${msg.text()}`);
        }
    });
    
    console.log('[Puppeteer] Navigating to localhost:5173...');
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle0' });
    
    console.log('[Puppeteer] Waiting 5 seconds...');
    await new Promise(r => setTimeout(r, 5000));
    
    // Bypass modal
    console.log('[Puppeteer] Clicking past modal if exists...');
    await page.evaluate(() => {
        // Try to click the checkbox and continue
        const cb = document.querySelector('input[type="checkbox"]');
        if (cb) cb.click();
        
        const btns = Array.from(document.querySelectorAll('button'));
        const contBtn = btns.find(b => b.innerText.includes('CONTINUE'));
        if (contBtn) contBtn.click();
    });

    await new Promise(r => setTimeout(r, 2000));

    console.log('[Puppeteer] Clicking Cymatics tab...');
    await page.evaluate(() => {
        const cymaticsPill = Array.from(document.querySelectorAll('.tab-pill')).find(p => p.innerText.includes('Cymatics'));
        if (cymaticsPill) {
            cymaticsPill.click();
        } else {
            console.log('Cymatics tab not found!');
        }
    });

    await new Promise(r => setTimeout(r, 3000));
    
    console.log('[Puppeteer] Capturing screenshot...');
    await page.screenshot({ path: 'scratch/ui_verify2.png' });
    
    await browser.close();
    console.log('[Puppeteer] Done!');
})();
