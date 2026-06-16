const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5174/mindwave.html', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 5000)); // Wait for animations to settle
  await page.screenshot({ path: '/Users/infinitealpha/.gemini/antigravity/brain/189289ec-e102-4d2c-8d8b-4524d67c5db2/mindwave_screenshot.png' });
  await browser.close();
})();
