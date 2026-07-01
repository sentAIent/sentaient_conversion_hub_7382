const puppeteer = require('puppeteer');

(async () => {
    console.log('Starting puppeteer...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    page.on('console', msg => console.log('BROWSER:', msg.text()));
    
    const url = 'file:///Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/index.html';
    await page.goto(url);
    
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => {
        window.game.toggleFlightMode();
    });
    
    await page.waitForTimeout(1000);
    
    const status = await page.evaluate(() => {
        const el = document.getElementById('sectionShipStatus');
        if (!el) return 'Not found';
        const rect = el.getBoundingClientRect();
        const computed = window.getComputedStyle(el);
        return {
            rect: rect,
            display: computed.display,
            visibility: computed.visibility,
            opacity: computed.opacity,
            zIndex: computed.zIndex,
            classList: Array.from(el.classList),
            parentElementId: el.parentElement.id,
            parentElementClass: el.parentElement.className
        };
    });
    console.log('sectionShipStatus:', status);
    
    const controls = await page.evaluate(() => {
        const el = document.getElementById('sectionControls');
        return { rect: el.getBoundingClientRect(), display: window.getComputedStyle(el).display };
    });
    console.log('sectionControls:', controls);

    const gems = await page.evaluate(() => {
        const el = document.getElementById('sectionGems');
        return { rect: el.getBoundingClientRect(), display: window.getComputedStyle(el).display };
    });
    console.log('sectionGems:', gems);

    await page.screenshot({ path: '/Users/ute/.gemini/antigravity/brain/8d8befa4-97c2-4911-ae35-ef3ba46c3d20/artifacts/game-screenshot-file.png' });
    
    await browser.close();
    process.exit(0);
})();
