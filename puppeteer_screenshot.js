const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        page.on('console', msg => {
            console.log('BROWSER LOG:', msg.text());
        });

        await page.setViewport({ width: 1280, height: 720 });
        
        console.log('Navigating to http://localhost:5173/mindwave.html...');
        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2', timeout: 15000 });
        
        // Force preload
        await page.evaluate(async () => {
            if (window.preloadVisualizer) window.preloadVisualizer();
            // Wait for visualizerReady event
            await new Promise(resolve => {
                window.addEventListener('visualizerReady', resolve, {once:true});
                // Or if it's already ready
                if (window.VIZ_READY_DISPATCHED) resolve();
            });
        });
        
        console.log('Visualizer loaded. Forcing Cymatics Pixel Nebula...');
        await page.evaluate(() => {
            document.querySelectorAll('dialog').forEach(el => el.close());
            document.querySelectorAll('.fixed, .absolute').forEach(el => {
                if (window.getComputedStyle(el).zIndex > 50) {
                    el.style.display = 'none';
                }
            });
            const viz = window.getVisualizer();
            if (viz) {
                if (window.setVisualMode) window.setVisualMode('cymatics', null, true);
                if (viz.setCymaticPatternByIndex) viz.setCymaticPatternByIndex(59);
            }
        });
        
        console.log('Waiting for pattern to render...');
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        console.log('Taking screenshot...');
        const screenshotPath = '/Users/infinitealpha/.gemini/antigravity/brain/c5e1ae3d-cdf6-490f-8a67-ec4ae66e3a97/test_pixel_nebula_fixed_v4.png';
        await page.screenshot({ path: screenshotPath });
        console.log(`Screenshot saved to ${screenshotPath}`);
        
        await browser.close();
    } catch (err) {
        console.error('Error during puppeteer script:', err);
        process.exit(1);
    }
})();
