const puppeteer = require('puppeteer-core');
(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            headless: "new"
        });
        const page = await browser.newPage();
        await page.goto('http://example.com', { timeout: 10000 });
        console.log("SUCCESS!");
        await browser.close();
        process.exit(0);
    } catch (e) {
        console.log("FAILED: " + e.message);
        process.exit(1);
    }
})();
