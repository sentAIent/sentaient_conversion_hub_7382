const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'file://' + path.resolve('interstellar-game/index.html');
    await page.goto(url);
    
    // Evaluate in browser context
    const data = await page.evaluate(() => {
        // Force initialize game
        const game = window.game;
        if (!game) return { error: "No game" };
        
        game.showShipModal();
        
        const specs = document.getElementById('specs-saucer');
        if (!specs) return { error: "No specs-saucer" };
        
        const wallBack = specs.closest('.wall-back');
        
        const getStyles = (el) => {
            if (!el) return null;
            const style = window.getComputedStyle(el);
            return {
                display: style.display,
                visibility: style.visibility,
                opacity: style.opacity,
                width: style.width,
                height: style.height,
                transform: style.transform,
                color: style.color,
                zIndex: style.zIndex,
                pointerEvents: style.pointerEvents,
                position: style.position,
                flex: style.flex
            };
        };
        
        const rect = specs.getBoundingClientRect();
        const wallRect = wallBack.getBoundingClientRect();
        
        return {
            specsFound: true,
            innerHTML: specs.innerHTML.substring(0, 50) + "...",
            specsStyle: getStyles(specs),
            specsRect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
            wallStyle: getStyles(wallBack),
            wallRect: { x: wallRect.x, y: wallRect.y, width: wallRect.width, height: wallRect.height }
        };
    });
    
    console.log(JSON.stringify(data, null, 2));
    await browser.close();
})();
