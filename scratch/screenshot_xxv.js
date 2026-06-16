const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set viewport to capture full scene
    await page.setViewport({ width: 1280, height: 720 });
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    
    await page.goto('http://localhost:5173/mindwave.html');
    
    // wait for visualizer load
    await new Promise(r => setTimeout(r, 8000)); // wait for fade in
    
    console.log("Calling window.setCymaticPattern(25, 0)...");
    await page.evaluate(() => {
        window.setCymaticPattern(25, 0);
    });
    
    await new Promise(r => setTimeout(r, 2000));
    
    await page.screenshot({ path: 'scratch/xxv_1.png' });
    
    console.log("Toggling observer effect...");
    await page.evaluate(() => {
        window.toggleObserverEffect(true);
    });
    
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'scratch/xxv_2.png' });
    
    console.log("Done.");
    await browser.close();
})();
