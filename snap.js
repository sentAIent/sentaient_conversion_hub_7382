const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    await page.goto('http://localhost:5173/mindwave', { waitUntil: 'networkidle2' });
    
    // Give it time to render and load visualizer
    await new Promise(r => setTimeout(r, 4000));
    
    await page.screenshot({ path: 'artifacts/screenshot_initial.png' });
    
    // Open Cymatics menu
    await page.evaluate(() => {
        if(window.gameEngine && window.gameEngine.controls) {
            window.gameEngine.controls.setVisualMode('cymatics');
        } else {
            // Click the Cymatics tab manually
            const el = document.querySelector('[onclick*="cymatics"]');
            if(el) el.click();
        }
    });
    
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'artifacts/screenshot_menu.png' });
    
    // Click Plasma Interference
    await page.evaluate(() => {
        if(typeof selectCymaticPattern === 'function') {
            selectCymaticPattern(45);
        }
    });
    
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'artifacts/screenshot_plasma.png' });
    
    await browser.close();
})();
