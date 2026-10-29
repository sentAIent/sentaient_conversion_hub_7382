const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8081');
  await page.waitForTimeout(5000); // wait for load
  await page.screenshot({ path: 'scratch/screenshot_local.png' });
  await browser.close();
})();
