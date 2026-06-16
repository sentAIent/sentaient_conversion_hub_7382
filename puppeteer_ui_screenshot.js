const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });

        console.log("Navigating to http://localhost:5173/mindwave.html...");
        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2' });
        
        await new Promise(r => setTimeout(r, 3000));
        
        // Ensure right menu is open
        await page.evaluate(() => {
            const btn = document.querySelector('.tab-pill[title="Fractal Resonance"]');
            if (btn) btn.click();
            
            const panel = document.getElementById('rightPanel');
            if (panel) {
                panel.classList.remove('translate-x-full');
            }
        });
        
        await new Promise(r => setTimeout(r, 1000));

        const outputPath = path.join(process.cwd(), "test_ui_screenshot.png");
        console.log("Taking screenshot...");
        await page.screenshot({ path: outputPath });
        console.log(`Screenshot saved to ${outputPath}`);

        await browser.close();
    } catch (e) {
        console.error("Puppeteer script failed:", e);
    }
})();
