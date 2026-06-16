const puppeteer = require('puppeteer');

(async () => {
    console.log("Launching browser for screenshot test...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForFunction('window.viz3D && window.viz3D.cymaticsCore', { timeout: 10000 });
    
    // Give time to render
    await new Promise(r => setTimeout(r, 2000));
    
    console.log("Activating Class 24...");
    await page.evaluate(() => {
        if(window.setCymaticPattern) window.setCymaticPattern(24, 0);
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'scratch/class24_screenshot.png' });
    
    console.log("Activating Class 25...");
    await page.evaluate(() => {
        if(window.setCymaticPattern) window.setCymaticPattern(25, 0);
        if(window.toggleObserverEffect) window.toggleObserverEffect(true);
    });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'scratch/class25_screenshot.png' });

    console.log("Screenshots captured.");
    await browser.close();
    process.exit(0);
})();
