const puppeteer = require('puppeteer-core');

(async () => {
    try {
        const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        const browser = await puppeteer.launch({ executablePath, headless: "new" });
        const page = await browser.newPage();
        
        page.on('console', msg => {
            if (msg.type() === 'error' || msg.text().includes('ERROR')) {
                console.log(`[CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
            }
        });
        
        page.on('pageerror', err => {
            console.log(`[PAGE ERROR]: ${err.message}`);
        });

        console.log("Navigating to http://localhost:8081/mindwave.html...");
        await page.goto('http://localhost:8081/mindwave.html', { waitUntil: 'networkidle2', timeout: 5000 });
        
        console.log("Waiting for 3 seconds for load...");
        await new Promise(r => setTimeout(r, 3000));
        
        console.log("Switching to Tsunami mode...");
        // Call global function to set mode
        await page.evaluate(() => {
            if (window.controls && window.controls.switchVisualMode) {
                window.controls.switchVisualMode('tsunami');
            }
        });

        console.log("Clicking play button...");
        await page.evaluate(() => {
            const playBtn = document.getElementById('masterPlayBtn');
            if (playBtn) playBtn.click();
        });

        console.log("Waiting 5 seconds for errors...");
        await new Promise(r => setTimeout(r, 5000));
        
        await browser.close();
    } catch (e) {
        console.error("Puppeteer Script Error:", e);
    }
})();
