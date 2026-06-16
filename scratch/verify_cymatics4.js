const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        console.log(`[Browser] ${msg.text()}`);
    });
    
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 3000));
    
    console.log('[Puppeteer] Clicking Cymatics pill via execute...');
    await page.evaluate(() => {
        const cb = document.querySelector('input[type="checkbox"]');
        if (cb) cb.click();
        const btns = Array.from(document.querySelectorAll('button'));
        const contBtn = btns.find(b => b.innerText.includes('CONTINUE'));
        if (contBtn) contBtn.click();
        
        const cymaticsPill = Array.from(document.querySelectorAll('.tab-pill')).find(p => p.innerText.includes('Cymatics'));
        if (cymaticsPill) {
            console.log('Found pill, clicking now!');
            cymaticsPill.click();
        } else {
            console.log('PILL NOT FOUND');
        }
    });

    await new Promise(r => setTimeout(r, 1000));
    
    const displayStr = await page.evaluate(() => {
        const el = document.getElementById('tab-cymatics');
        if (!el) return 'tab-cymatics missing';
        return 'tab-cymatics classes: ' + el.className;
    });
    console.log('[Puppeteer] ' + displayStr);

    await browser.close();
})();
