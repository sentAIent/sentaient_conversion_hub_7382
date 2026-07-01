const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ 
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'] 
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 800 });
  const url = 'file://' + require('path').resolve('./interstellar-game/index.html');
  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    if (window.game && window.game.showShipModal) {
      window.game.showShipModal();
    } else if (window.app && window.app.showShipModal) {
      window.app.showShipModal();
    }
  });

  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({path: 'screenshot_clean.png'});
  await browser.close();
})();
