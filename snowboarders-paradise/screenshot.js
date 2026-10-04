const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  try {
    await page.goto('http://localhost:8081', { waitUntil: 'networkidle0', timeout: 30000 });
    // wait an extra 2 seconds for 3D canvas to render
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'ui_screenshot.png' });
    console.log('Screenshot saved to ui_screenshot.png');
  } catch (e) {
    console.error('Failed to take screenshot', e);
  } finally {
    await browser.close();
  }
})();
