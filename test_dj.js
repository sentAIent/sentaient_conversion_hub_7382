const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Collect console messages
  page.on('console', msg => {
    console.log(`[Browser Console ${msg.type()}] ${msg.text()}`);
  });
  
  await page.goto('http://127.0.0.1:8080/mindwave.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  
  await page.evaluate(async () => {
     console.log("Forcing DJ Sound 0...");
     if(window.triggerDjSound) {
         await window.triggerDjSound(0);
     } else {
         console.log("triggerDjSound not defined");
     }
  });
  
  await page.waitForTimeout(1000);
  await browser.close();
})();
