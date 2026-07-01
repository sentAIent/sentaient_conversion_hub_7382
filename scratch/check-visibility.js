const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Go to the local page
    await page.goto(`file://${__dirname}/../public/interstellar-game/index.html`, { waitUntil: 'domcontentloaded' });
    
    // Wait a bit for JS to init
    await page.waitForTimeout(1000);
    
    // Toggle flight mode
    await page.evaluate(() => {
        if (window.game && window.game.toggleFlightMode) {
            window.game.toggleFlightMode();
        }
    });
    
    // Wait for any animations
    await page.waitForTimeout(500);
    
    // Evaluate status of sectionShipStatus
    const statusInfo = await page.evaluate(() => {
        const el = document.getElementById('sectionShipStatus');
        if (!el) return 'Element not found';
        
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);
        
        return {
            rect: {
                x: rect.x, y: rect.y, width: rect.width, height: rect.height,
                top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left
            },
            style: {
                display: computed.display,
                visibility: computed.visibility,
                opacity: computed.opacity,
                zIndex: computed.zIndex,
                position: computed.position,
                transform: computed.transform
            },
            html: el.outerHTML.substring(0, 500)
        };
    });
    
    console.log(JSON.stringify(statusInfo, null, 2));
    
    // Check if body has splash-active
    const bodyClasses = await page.evaluate(() => document.body.className);
    console.log("Body classes:", bodyClasses);

    await browser.close();
})();
