const puppeteer = require('puppeteer-core');

(async () => {
    try {
        const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        const browser = await puppeteer.launch({ executablePath, headless: "new", defaultViewport: {width: 1280, height: 720} });
        const page = await browser.newPage();
        
        page.on('console', msg => {
            console.log(`[CONSOLE] ${msg.type().toUpperCase()}: ${msg.text()}`);
        });
        
        page.on('pageerror', err => {
            console.log(`[PAGE ERROR]: ${err.message}`);
        });

        // Don't wait for networkidle
        await page.goto('http://localhost:8081/mindwave.html', { waitUntil: 'domcontentloaded' });
        
        await new Promise(r => setTimeout(r, 4000));
        
        await page.evaluate(() => {
            if (window.controls && window.controls.switchVisualMode) {
                window.controls.switchVisualMode('tsunami');
            }
        });
        
        await page.evaluate(() => {
            const playBtn = document.getElementById('masterPlayBtn');
            if (playBtn) playBtn.click();
        });
        
        await new Promise(r => setTimeout(r, 4000));
        
        await browser.close();
    } catch (e) {
        console.error("Puppeteer Script Error:", e);
    }
})();
