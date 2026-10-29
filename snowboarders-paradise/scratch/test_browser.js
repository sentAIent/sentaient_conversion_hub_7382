const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Collect console messages
  page.on('console', msg => {
      console.log(`[Browser Console]: ${msg.text()}`);
  });
  
  page.on('pageerror', err => {
      console.error(`[Browser Error]: ${err.message}`);
  });

  console.log("Navigating to http://localhost:8081...");
  try {
      await page.goto('http://localhost:8081', { timeout: 30000 });
      console.log("Navigation successful. Waiting for 10 seconds for game to load...");
      
      await page.waitForTimeout(10000); // Let the game run for 10 seconds
      
      console.log("Taking screenshot...");
      await page.screenshot({ path: 'scratch/screenshot.png' });
      console.log("Test completed successfully.");
  } catch (error) {
      console.error(`Navigation or test failed: ${error}`);
  } finally {
      await browser.close();
  }
})();
