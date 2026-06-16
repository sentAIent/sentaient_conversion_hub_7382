const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    try {
        console.log("Navigating to mindwave.html...");
        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2', timeout: 30000 });

        // Wait for visualizer to load
        console.log("Waiting for viz3D...");
        await page.waitForFunction('window.viz3D && window.viz3D.cymaticsCore', { timeout: 15000 });

        console.log("Opening class XXIV tab...");
        // Ensure class 24 tab is open (if there are tabs, or we can just programmatically click the buttons)
        
        // Wait for the Lion button
        console.log("Clicking Lion Aura button...");
        await page.evaluate(() => {
            const buttons = document.querySelectorAll('.c24-layer3-btn');
            if (buttons.length > 1) {
                buttons[1].click(); // Lion is index 1
            } else {
                window.setConstellationUI('Aura', 1, document.body);
            }
        });

        await page.waitForTimeout(1000); // Wait for texture to load and render

        const screenshotPath = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/scratch/lion_test.png';
        await page.screenshot({ path: screenshotPath });
        console.log(`Screenshot saved to ${screenshotPath}`);
        
    } catch (e) {
        console.error("Error during test:", e);
    } finally {
        await browser.close();
    }
})();
