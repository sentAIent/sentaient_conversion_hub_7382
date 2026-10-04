const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:8081');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'scratch/screenshot_menu2.png' });
  
  // Try to dispatch pointer events to simulate react-native-web onPress
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('div')).filter(el => el.textContent === 'DROP IN');
    if(btns.length) {
       const btn = btns[0];
       btn.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true}));
       btn.dispatchEvent(new PointerEvent('pointerup', {bubbles: true}));
    }
  });
  
  await page.waitForTimeout(3000);
  await page.screenshot({ path: 'scratch/screenshot_game2.png' });
  
  await browser.close();
})();
