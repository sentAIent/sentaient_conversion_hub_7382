const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // Start python server in background just for this script
  const { spawn } = require('child_process');
  const server = spawn('python3', ['-m', 'http.server', '8081']);
  
  await new Promise(r => setTimeout(r, 1000));

  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:8081/public/interstellar-game/index.html');
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Click "Start Drawing" to bypass initial menu if needed, though app is global
  await page.evaluate(() => {
    if (window.app && window.app.showShipModal) {
      window.app.showShipModal();
    }
  });

  await new Promise(r => setTimeout(r, 2000));
  
  await page.screenshot({ path: '/Users/ute/.gemini/antigravity/brain/c1d3833b-43c3-45b9-ad95-ee3e982d6f47/hangar_screenshot_1200.png' });

  await page.setViewport({ width: 800, height: 600 });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: '/Users/ute/.gemini/antigravity/brain/c1d3833b-43c3-45b9-ad95-ee3e982d6f47/hangar_screenshot_800.png' });

  await browser.close();
  server.kill();
})();
