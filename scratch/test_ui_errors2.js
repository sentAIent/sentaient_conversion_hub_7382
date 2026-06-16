const puppeteer = require('puppeteer');

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    // Capture page errors
    page.on('pageerror', err => {
        console.error('Page Error:', err.toString());
    });
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error('Console Error:', msg.text());
        }
    });

    console.log("Navigating to http://localhost:5173/mindwave.html...");
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    console.log("Waiting for visualization to initialize...");
    await page.waitForFunction('window.viz3D && window.viz3D.cymaticsCore', { timeout: 30000 }).catch(e => console.log("viz3D init timeout"));

    console.log("Testing Class 24 buttons...");
    await page.evaluate(() => {
        if(window.setConstellationUI) window.setConstellationUI('Aura', 1, null);
        if(window.setConstellationLinesToggle) window.setConstellationLinesToggle(false);
    });
    
    await new Promise(r => setTimeout(r, 1000));
    
    console.log("Testing Class 25 buttons...");
    await page.evaluate(() => {
        if(window.setCymaticPattern) window.setCymaticPattern(25, 0);
    });
    
    await new Promise(r => setTimeout(r, 1000));
    
    await page.evaluate(() => {
        if(window.toggleObserverEffect) window.toggleObserverEffect(true);
    });

    await new Promise(r => setTimeout(r, 1000));

    console.log("Test complete. Check output for errors.");
    await browser.close();
    process.exit(0);
})();
