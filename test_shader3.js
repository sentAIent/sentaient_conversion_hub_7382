const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  try {
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for visualizer to boot
    await new Promise(r => setTimeout(r, 4000));
    
    console.log("TRIGGERING CLASS 19 VARIATION 0...");
    await page.evaluate(() => {
      window.setCymaticPattern(19, 0);
    });
    
    await new Promise(r => setTimeout(r, 2000));
    console.log("TRIGGERING CLASS 19 VARIATION 1...");
    await page.evaluate(() => { window.setCymaticPattern(19, 1); });
    
    await new Promise(r => setTimeout(r, 2000));
  } catch (e) {
    console.error("Puppeteer Error:", e);
  } finally {
    await browser.close();
  }
})();
