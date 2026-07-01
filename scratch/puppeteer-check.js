const puppeteer = require('puppeteer-core');

(async () => {
    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: "new"
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log(`[CONSOLE] ${msg.text()}`));
    page.on('pageerror', err => console.log(`[ERROR] ${err.message}`));

    console.log("Navigating to index-instrumented.html...");
    try {
        await page.goto('http://localhost:8083/index-instrumented.html', { timeout: 15000 });
        console.log("Page loaded successfully without freezing!");
    } catch (e) {
        console.log("Goto timeout - Page FROZE!");
    }

    await new Promise(r => setTimeout(r, 2000));
    await browser.close();
    process.exit(0);
})();
