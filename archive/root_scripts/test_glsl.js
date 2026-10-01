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
        
        console.log("=== Testing Pattern 12 (Type 8 / Level 3) ===");
        await page.evaluate(() => {
            if (typeof selectCymaticPattern === "function") {
                selectCymaticPattern(12);
            }
        });
        await new Promise(r => setTimeout(r, 2000));
        
        console.log("=== Testing Pattern 22 (Type 9 / Level 4) ===");
        await page.evaluate(() => {
            if (typeof selectCymaticPattern === "function") {
                selectCymaticPattern(22);
            }
        });
        await new Promise(r => setTimeout(r, 2000));

        await browser.close();
    } catch (e) {
        console.error("Puppeteer script failed:", e);
    }
})();
