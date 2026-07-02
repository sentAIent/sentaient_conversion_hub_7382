const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
    
    await page.goto('http://localhost:8001');
    console.log('Page loaded');
    
    // Wait for boot sequence
    await page.waitForTimeout(4000);
    
    // Click visuals tab
    try {
        await page.click('#tab-visuals');
        console.log('Clicked visuals tab');
        await page.waitForTimeout(1000);
        
        // Click Cymatics
        await page.click('#btn-cymatics');
        console.log('Clicked cymatics');
        await page.waitForTimeout(2000);
        
        // Rapidly click classes 17-25
        for(let i=0; i<20; i++) {
            await page.evaluate(() => {
                if(window.setVisualMode) window.setVisualMode('cymatics');
                if(window.visualizer && window.visualizer.cymaticsCore) {
                    const classes = [17, 18, 19, 20, 22, 23, 24, 25];
                    const cls = classes[Math.floor(Math.random() * classes.length)];
                    window.visualizer.cymaticsCore.setPattern(cls, 1);
                }
            });
            await page.waitForTimeout(100);
        }
        console.log('Finished rapid clicking. Waiting for crash...');
        await page.waitForTimeout(3000);
    } catch(e) {
        console.log('Test error:', e.message);
    }
    
    await browser.close();
})();
