const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:8081');
  await page.waitForTimeout(1000);
  
  // Click checkboxes
  const checkboxes = await page.$$('input[type="checkbox"]');
  for (const cb of checkboxes) {
    // try to click
    await cb.click({force: true}).catch(() => {});
  }
  
  // Wait a bit, click the button
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('div')).filter(el => el.textContent === 'ENTER PARADISE');
    if(btns.length) btns[0].click();
  });
  
  await page.waitForTimeout(1000);
  
  // Take screenshot of menu
  await page.screenshot({ path: 'scratch/screenshot_menu.png' });
  
  // Click DROP IN
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('div')).filter(el => el.textContent === 'DROP IN');
    if(btns.length) btns[0].click();
  });
  
  await page.waitForTimeout(3000);
  
  // Take screenshot of game
  await page.screenshot({ path: 'scratch/screenshot_game.png' });
  
  await browser.close();
})();
