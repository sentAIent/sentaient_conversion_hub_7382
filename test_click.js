const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log(`[BROWSER LOG] ${msg.type().toUpperCase()}: ${msg.text()}`));
    page.on('pageerror', err => console.log(`[PAGE ERROR] ${err.toString()}`));
    await page.goto('http://localhost:8080/mindwave.html', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));
    console.log("Clicking cymatics tab...");
    await page.evaluate(() => {
        const btn = document.querySelector('[onclick*="switchRightTab(\'cymatics\'"]');
        if (btn) btn.click();
        else console.log("Cymatics button not found");
    });
    await new Promise(r => setTimeout(r, 1000));
    await browser.close();
})();
