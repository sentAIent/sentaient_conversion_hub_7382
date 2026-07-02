const puppeteer = require('puppeteer-core');

(async () => {
    try {
        const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
        // Run headful to see what the user sees, or connect to an existing instance if possible.
        // Actually, we'll just launch a headless browser to capture what the HTML looks like.
        const browser = await puppeteer.launch({ executablePath, headless: "new", defaultViewport: {width: 1280, height: 720} });
        const page = await browser.newPage();
        
        await page.goto('http://localhost:8081/mindwave.html', { waitUntil: 'networkidle2', timeout: 5000 });
        
        await new Promise(r => setTimeout(r, 2000));
        
        // Turn on tsunami
        await page.evaluate(() => {
            if (window.controls && window.controls.switchVisualMode) {
                window.controls.switchVisualMode('tsunami');
            }
        });
        
        // Click play to start the visualizer
        await page.evaluate(() => {
            const playBtn = document.getElementById('masterPlayBtn');
            if (playBtn) playBtn.click();
        });
        
        // Wait 3 seconds for rendering
        await new Promise(r => setTimeout(r, 3000));
        
        // Capture screenshot
        await page.screenshot({ path: '/Users/infinitealpha/.gemini/antigravity/brain/da778e0b-fdc4-4e36-a9ee-2bc86efef5dd/scratch/flashing_red_debug.png' });
        console.log("Screenshot saved to flashing_red_debug.png");
        
        await browser.close();
    } catch (e) {
        console.error("Puppeteer Error:", e);
    }
})();
