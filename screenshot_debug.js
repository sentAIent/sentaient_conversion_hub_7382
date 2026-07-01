const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  const { spawn } = require('child_process');
  const server = spawn('python3', ['-m', 'http.server', '8082']);
  
  await new Promise(r => setTimeout(r, 1000));

  await page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:8082/interstellar-game/index.html');
  
  await new Promise(r => setTimeout(r, 1000));
  
  await page.evaluate(() => {
    if (window.app && window.app.showShipModal) {
      window.app.showShipModal();
    }
  });

  await new Promise(r => setTimeout(r, 2000));
  
  const html = await page.evaluate(() => {
      const el = document.getElementById('specs-interceptor');
      return el ? el.innerHTML : 'NOT FOUND';
  });
  console.log('HTML for specs-interceptor:', html);

  const style = await page.evaluate(() => {
      const el = document.getElementById('specs-interceptor');
      if (!el) return 'NOT FOUND';
      const s = window.getComputedStyle(el);
      return `width: ${s.width}, height: ${s.height}, display: ${s.display}, visibility: ${s.visibility}, color: ${s.color}`;
  });
  console.log('STYLE for specs-interceptor:', style);

  await browser.close();
  server.kill();
})();
