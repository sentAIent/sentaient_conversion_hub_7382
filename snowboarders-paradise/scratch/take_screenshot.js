const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8081');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: 'scratch/screenshot_puppeteer.png' });
  await browser.close();
})();
