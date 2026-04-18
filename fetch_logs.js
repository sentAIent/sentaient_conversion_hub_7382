const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  page.on('console', msg => {
    console.log(`[Browser Console ${msg.type().toUpperCase()}] ${msg.text()}`);
  });
  
  page.on('pageerror', error => {
    console.log(`[Browser PageError] ${error.message}`);
  });

  page.on('requestfailed', request => {
    console.log(`[Browser RequestFailed] ${request.url()} - ${request.failure()?.errorText}`);
  });

  console.log("Navigating to http://localhost:5173/...");
  await page.goto("http://localhost:5173/");

  // Wait 5 seconds to ensure initialization
  await new Promise(r => setTimeout(r, 5000));
  
  await browser.close();
})();
