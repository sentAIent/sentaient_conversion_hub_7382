const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ 
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'] 
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  const url = 'file://' + require('path').resolve('./interstellar-game/index.html');
  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    if (window.game && window.game.showShipModal) {
      window.game.showShipModal();
    } else if (window.app && window.app.showShipModal) {
      window.app.showShipModal();
    }
  });

  await new Promise(r => setTimeout(r, 1000));

  const specsHTML = await page.evaluate(() => {
    const el = document.getElementById('specs-interceptor');
    return el ? el.outerHTML : "NOT FOUND";
  });
  console.log("=== SPECS HTML ===");
  console.log(specsHTML);
  console.log("==================");

  const rect = await page.evaluate(() => {
    const el = document.getElementById('specs-interceptor');
    if (el) {
        const r = el.getBoundingClientRect();
        return { width: r.width, height: r.height, top: r.top, left: r.left, display: window.getComputedStyle(el).display };
    }
    return null;
  });
  console.log("=== SPECS RECT ===");
  console.log(rect);
  
  await browser.close();
})();
