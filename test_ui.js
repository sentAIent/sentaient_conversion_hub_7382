const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4173/mindwave.html');
  await page.waitForTimeout(2000);
  
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.cymatics-pattern-btn')).map(b => b.innerText.trim());
  });
  console.log('Buttons:', buttons);
  
  const h4s = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h4')).map(h => h.innerText.trim());
  });
  console.log('H4s:', h4s);
  
  await page.screenshot({ path: 'artifacts/screenshot.png' });
  await browser.close();
})();
