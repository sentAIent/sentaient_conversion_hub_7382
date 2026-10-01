const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => {
    console.log(`PAGE LOG [${msg.type()}]:`, msg.text());
  });
  
  page.on('pageerror', err => {
    console.log('PAGE ERROR:', err.message);
  });
  
  await page.goto('http://localhost:5173/mindwave.html', {waitUntil: 'networkidle0'});
  
  console.log("Page loaded. Clicking Class 24 button...");
  
  await page.evaluate(() => {
    if (window.setCymaticPattern) {
        window.setCymaticPattern(24, 0);
    } else {
        console.log("window.setCymaticPattern not found!");
    }
  });
  
  // Wait a bit to let any WebGL errors surface
  await new Promise(r => setTimeout(r, 5000));
  
  await browser.close();
})();
