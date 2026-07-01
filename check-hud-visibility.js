const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    // Override setTimeout/setInterval if needed, but let's just try to load and start the game
    await page.goto('file://' + process.cwd() + '/public/interstellar-game/index.html', { waitUntil: 'networkidle2', timeout: 10000 }).catch(e => console.log('goto timeout, continuing...'));
    
    console.log("Page loaded. Starting game...");
    await page.evaluate(() => {
        if (typeof startGame === 'function') startGame();
    });
    
    // Wait for splash transition
    await new Promise(r => setTimeout(r, 2000));
    
    // Check computed styles
    const result = await page.evaluate(() => {
        const hud = document.getElementById('sectionShipStatus');
        const uiContainer = document.getElementById('uiContainer');
        const body = document.body;
        
        if (!hud) return "sectionShipStatus not found";
        
        const hudStyle = window.getComputedStyle(hud);
        const uiStyle = window.getComputedStyle(uiContainer);
        
        return {
            hud: {
                display: hudStyle.display,
                visibility: hudStyle.visibility,
                opacity: hudStyle.opacity,
                zIndex: hudStyle.zIndex,
                width: hudStyle.width,
                height: hudStyle.height,
                top: hudStyle.top,
                bottom: hudStyle.bottom,
                left: hudStyle.left,
                right: hudStyle.right,
                cssText: hud.style.cssText
            },
            uiContainer: {
                display: uiStyle.display,
                visibility: uiStyle.visibility,
                opacity: uiStyle.opacity,
                zIndex: uiStyle.zIndex,
                width: uiStyle.width,
                height: uiStyle.height
            },
            bodyClasses: body.className
        };
    });
    
    console.log(JSON.stringify(result, null, 2));
    await browser.close();
})();
