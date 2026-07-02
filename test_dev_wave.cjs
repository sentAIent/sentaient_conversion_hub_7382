const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on('console', msg => console.log('BROWSER:', msg.text()));
    page.on('pageerror', err => console.error('BROWSER ERROR:', err));
    await page.goto('http://localhost:8081/mindwave.html');
    await page.waitForTimeout(1000); // Wait a bit for initial setup
    
    // Switch to tsunami mode if not already
    await page.evaluate(() => {
        if(window.appControls && window.appControls.visualMode !== 'tsunami') {
            window.appControls.setVisualMode('tsunami');
        } else {
           console.log("no appControls or already tsunami");
        }
    });

    await page.waitForTimeout(3000); // Let wave form
    
    await page.screenshot({ path: '/Users/infinitealpha/.gemini/antigravity/brain/da778e0b-fdc4-4e36-a9ee-2bc86efef5dd/dev_wave_1.png' });
    console.log("Screenshot 1 taken");

    await page.waitForTimeout(3000); // Let wave form more
    await page.screenshot({ path: '/Users/infinitealpha/.gemini/antigravity/brain/da778e0b-fdc4-4e36-a9ee-2bc86efef5dd/dev_wave_2.png' });
    console.log("Screenshot 2 taken");

    await browser.close();
})();
