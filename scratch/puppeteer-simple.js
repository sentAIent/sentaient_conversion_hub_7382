const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', msg => console.log(msg.text()));
    await page.goto('data:text/html,<html><body><script>console.log("HELLO FROM PUPPETEER");</script></body></html>');
    await browser.close();
})();
