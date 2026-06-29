import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/mindwave.html");
    await page.waitForTimeout(2000);
    
    await page.evaluate(() => { document.getElementById('startExperienceBtn').click() });
    await page.waitForTimeout(1000);

    await page.evaluate(() => { document.getElementById('tsunamiBtn').click() });
    await page.waitForTimeout(3000);

    await page.screenshot({ path: "screenshot_tsunami.png" });
    await browser.close();
})();
