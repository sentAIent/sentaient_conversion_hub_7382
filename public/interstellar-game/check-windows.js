const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1600, height: 1060 });
    await page.goto('http://127.0.0.1:8080/public/interstellar-game/index.html');
    await page.waitForTimeout(1000);
    
    // Simulate playing mode
    await page.evaluate(() => {
        if (window.app && window.app.startPlaying) {
            window.app.startPlaying();
        }
    });
    await page.waitForTimeout(1000);
    
    // Enable flight mode
    await page.evaluate(() => {
        if (window.app && window.app.toggleFlightMode) {
            window.app.flightMode = false; // toggle it on
            window.app.toggleFlightMode();
        }
    });
    
    await page.waitForTimeout(2000);
    await page.screenshot({ path: '/Users/ute/.gemini/antigravity/brain/8d8befa4-97c2-4911-ae35-ef3ba46c3d20/artifacts/game-windows.png' });
    await browser.close();
    console.log("Screenshot saved!");
})();
