const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ 
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        console.log("Navigating...");
        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2' });

        await page.waitForFunction(() => window.viz3D && window.viz3D.cymaticsCore, { timeout: 10000 });

        const keys = await page.evaluate(() => {
            return Object.keys(window.viz3D.cymaticsCore.materials);
        });
        console.log("Materials keys:", keys);

        await browser.close();
    } catch (err) {
        console.error("TEST FAILED:", err);
        process.exit(1);
    }
})();
