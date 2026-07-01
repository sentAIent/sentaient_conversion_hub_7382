const puppeteer = require('puppeteer');

(async () => {
    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log(`[PAGE LOG] ${msg.text()}`));

    console.log("Navigating to about:blank to set localStorage...");
    await page.goto('about:blank');
    
    // Set localStorage on the correct domain if needed, but since it's localhost, we just navigate to a dummy page on localhost first
    await page.goto('http://localhost:8083/favicon.ico').catch(()=>console.log("no favicon, expected"));
    await page.evaluate(() => {
        localStorage.clear();
        console.log("LocalStorage CLEARED!");
    });

    console.log("Navigating to index.html...");
    // Use timeout to detect freeze
    try {
        await page.goto('http://localhost:8083/index.html', { timeout: 10000 });
        console.log("Page loaded successfully without freezing!");
    } catch (e) {
        console.log("Goto timeout - Page FROZE!");
    }

    await browser.close();
})();
