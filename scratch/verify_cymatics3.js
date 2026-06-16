const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 5000));
    
    const info = await page.evaluate(() => {
        // 1. Is tab-cymatics in the DOM?
        const tab = document.getElementById('tab-cymatics');
        if (!tab) return 'tab-cymatics not found in DOM';
        
        // 2. Click the Cymatics pill
        const cymaticsPill = Array.from(document.querySelectorAll('.tab-pill')).find(p => p.innerText.includes('Cymatics'));
        if (cymaticsPill) {
            cymaticsPill.click();
        } else {
            return 'Cymatics pill not found';
        }
        
        return 'Pill clicked. Tab classes: ' + tab.className;
    });
    
    console.log(info);
    await new Promise(r => setTimeout(r, 1000));
    
    const info2 = await page.evaluate(() => {
        const tab = document.getElementById('tab-cymatics');
        return 'After 1s, Tab classes: ' + tab.className;
    });
    console.log(info2);

    await browser.close();
})();
