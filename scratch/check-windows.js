const puppeteer = require('puppeteer');
(async () => {
    try {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto('file:///Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/index.html');
        // Wait for load
        await new Promise(r => setTimeout(r, 1000));
        // Start game
        await page.evaluate(() => {
            window.game.toggleFlightMode();
        });
        await new Promise(r => setTimeout(r, 500));
        
        // Check sectionShipStatus
        const status = await page.evaluate(() => {
            const el = document.getElementById('sectionShipStatus');
            if (!el) return 'Not found';
            const rect = el.getBoundingClientRect();
            const style = window.getComputedStyle(el);
            return {
                rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
                display: style.display,
                visibility: style.visibility,
                opacity: style.opacity,
                zIndex: style.zIndex,
                parentDisplay: window.getComputedStyle(el.parentElement).display,
                classList: Array.from(el.classList)
            };
        });
        console.log("Status:", JSON.stringify(status, null, 2));
        
        await browser.close();
    } catch (e) {
        console.error(e);
    }
})();
