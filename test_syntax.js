const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log(`[BROWSER ERROR] ${msg.text()}`);
            }
        });
        
        page.on('pageerror', err => {
            console.log(`[PAGE ERROR] ${err.message}`);
        });

        console.log("Loading mindwave.html...");
        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2' });
        
        await new Promise(r => setTimeout(r, 2000));
        console.log("Done checking.");
        await browser.close();
    } catch (e) {
        console.error("Failed:", e);
    }
})();
