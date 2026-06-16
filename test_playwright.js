const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

  const absolutePath = 'file://' + path.resolve('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/test_engine.html');
  await page.goto(absolutePath);

  await page.waitForSelector('#playBtn', { state: 'visible' });
  await page.click('#playBtn');

  await page.waitForTimeout(1000);

  const gain = await page.evaluate(() => {
     // Wait, we can't easily read internal state unless we expose it.
     return "Clicked";
  });
  console.log(gain);

  await browser.close();
})();
