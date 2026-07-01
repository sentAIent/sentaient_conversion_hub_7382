const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({ headless: true, defaultViewport: { width: 1920, height: 1080 } });
    const page = await browser.newPage();
    console.log("Navigating...");
    await page.goto('http://localhost:5173/interstellar-game/index.html');
    
    // Wait for splash screen to load
    await page.waitForTimeout(2000);
    
    // Click FLY
    console.log("Clicking FLY...");
    await page.evaluate(() => {
        const btn = document.getElementById('btnEnterFlight');
        if (btn) btn.click();
    });
    
    await page.waitForTimeout(2000);
    console.log("Taking Onload screenshot...");
    await page.screenshot({ path: 'scratch/screenshot_onload.png' });

    // Click Wide
    console.log("Clicking Wide...");
    await page.evaluate(() => {
        app.setLayout('wide');
    });
    await page.waitForTimeout(1000);
    console.log("Taking Wide screenshot...");
    await page.screenshot({ path: 'scratch/screenshot_wide.png' });

    // Click Tall
    console.log("Clicking Tall...");
    await page.evaluate(() => {
        app.setLayout('tall');
    });
    await page.waitForTimeout(1000);
    console.log("Taking Tall screenshot...");
    await page.screenshot({ path: 'scratch/screenshot_tall.png' });

    await browser.close();
    console.log("Done!");
})();
