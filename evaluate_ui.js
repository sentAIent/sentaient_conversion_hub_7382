const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4173/mindwave.html');
  await page.waitForTimeout(2000);
  
  // Wait for cymatics buttons
  const buttons = await page.$$('.cymatics-pattern-btn');
  console.log(`Found ${buttons.length} buttons.`);
  
  // Check the first button layout
  if (buttons.length > 0) {
    const box = await buttons[0].boundingBox();
    console.log('Button 0 bounding box:', box);
    const style = await page.evaluate(el => {
        return window.getComputedStyle(el).cssText.substring(0, 100) + '...';
    }, buttons[0]);
    console.log('Button 0 style sample:', style);
  }
  
  // Check what the screen actually looks like. Are there overlapping elements?
  const gridBoxes = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.grid')).map(g => {
       const box = g.getBoundingClientRect();
       return {className: g.className, width: box.width, height: box.height, display: window.getComputedStyle(g).display};
    });
  });
  console.log('Grids:', gridBoxes);
  
  await browser.close();
})();
