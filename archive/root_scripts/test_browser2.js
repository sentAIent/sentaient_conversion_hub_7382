const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        page.on('console', msg => {
            console.log(`[BROWSER CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
        });

        page.on('pageerror', err => {
            console.log(`[BROWSER ERROR] ${err.message}`);
        });

        await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
        
        await new Promise(r => setTimeout(r, 2000));
        
        // click the cosmic knot button
        await page.evaluate(() => {
            console.log("Clicking Cosmic Knot...");
            if (typeof selectCymaticPattern === "function") {
                selectCymaticPattern(0);
            } else {
                console.log("selectCymaticPattern is not defined");
            }
        });
        
        await new Promise(r => setTimeout(r, 2000));
        
        // check if visualizer shader compiled
        await page.evaluate(() => {
            if (window.getVisualizer && window.getVisualizer().cymaticMaterial) {
                console.log("Cymatic material exists.");
            } else {
                console.log("Cymatic material not found.");
            }
        });

        await browser.close();
    } catch (e) {
        console.error("Puppeteer script failed:", e);
    }
})();
