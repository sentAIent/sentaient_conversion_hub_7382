const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  try {
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle0', timeout: 30000 });
    
    // Wait for visualizer to boot
    await new Promise(r => setTimeout(r, 3000));
    
    // Force the visualizer to render class 19
    await page.evaluate(() => {
      if (window.visualizer) {
        console.log("Triggering Class 19 Variation 0");
        window.visualizer.cymaticsCore.activeClassId = 19;
        window.visualizer.cymaticsCore.activeVariationId = 0;
        // force material update
        window.visualizer.cymaticsCore.updatePattern(19, 0);
      } else {
        console.log("window.visualizer is not ready.");
      }
    });
    
    // wait for a few frames
    await new Promise(r => setTimeout(r, 2000));
    
  } catch (e) {
    console.error("Puppeteer Error:", e);
  } finally {
    await browser.close();
  }
})();
