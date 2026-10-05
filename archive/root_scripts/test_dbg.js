const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        page.on('console', msg => {
            console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
        });

        await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
        
        await new Promise(r => setTimeout(r, 2000));
        
        const dbgText = await page.evaluate(() => {
            const d = document.getElementById('_dbg');
            return d ? d.innerHTML : 'No _dbg div found';
        });
        
        console.log("DBG DIV:", dbgText);

        await browser.close();
    } catch (e) {
        console.error("Puppeteer script failed:", e);
    }
})();
