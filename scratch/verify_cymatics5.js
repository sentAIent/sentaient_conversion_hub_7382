const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 1920, height: 1080 });

    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 4000));
    
    await page.evaluate(() => {
        const cb = document.querySelector('input[type="checkbox"]');
        if (cb) cb.click();
        const btns = Array.from(document.querySelectorAll('button'));
        const contBtn = btns.find(b => b.innerText.toLowerCase().includes('continue'));
        if (contBtn) contBtn.click();
    });

    await new Promise(r => setTimeout(r, 1000));
    
    const clickResult = await page.evaluate(() => {
        const cymaticsPill = Array.from(document.querySelectorAll('.tab-pill')).find(p => p.innerText.toLowerCase().includes('cymatics'));
        if (cymaticsPill) {
            cymaticsPill.click();
            return 'Pill clicked!';
        } else {
            return 'PILL NOT FOUND';
        }
    });

    console.log('[Puppeteer]', clickResult);

    await new Promise(r => setTimeout(r, 1000));
    
    const displayStr = await page.evaluate(() => {
        const el = document.getElementById('tab-cymatics');
        if (!el) return 'tab-cymatics missing';
        return 'tab-cymatics classes: ' + el.className;
    });
    console.log('[Puppeteer]', displayStr);

    await page.screenshot({ path: 'scratch/ui_verify5.png' });

    await browser.close();
})();
