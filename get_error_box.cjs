const puppeteer = require('puppeteer-core');

(async () => {
    try {
        const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        const browser = await puppeteer.launch({ executablePath, headless: "new" });
        const page = await browser.newPage();
        
        await page.goto('http://localhost:8081/mindwave.html', { waitUntil: 'networkidle2', timeout: 8000 });
        
        await new Promise(r => setTimeout(r, 2000));
        
        // Ensure tsunami is active
        await page.evaluate(() => {
            if (window.controls && window.controls.switchVisualMode) {
                window.controls.switchVisualMode('tsunami');
            }
        });

        // Try to click the ACTUAL master play button to start everything
        await page.evaluate(() => {
            const btn = document.getElementById('masterPlayBtn');
            if (btn) btn.click();
        });

        await new Promise(r => setTimeout(r, 3000));
        
        // Grab error box contents
        const errorHtml = await page.evaluate(() => {
            const box = document.getElementById('debug-error-box');
            return box ? box.innerHTML : "NO ERROR BOX";
        });
        
        console.log("ERROR BOX:", errorHtml);
        
        await browser.close();
    } catch (e) {
        console.error("Puppeteer Script Error:", e);
    }
})();
