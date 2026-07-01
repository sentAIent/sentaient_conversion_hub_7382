const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Capture console logs
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));
    
    try {
        await page.goto('http://localhost:5173/interstellar-game/index.html', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: 'scratch/screenshot_debug2.png' });
        console.log("Screenshot saved.");
    } catch (e) {
        console.error("Error:", e);
    }
    
    await browser.close();
})();
