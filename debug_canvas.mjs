import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'load' });
  await page.waitForTimeout(3000);
  
  const canvasInfo = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return 'No canvas found';
    return {
      width: canvas.width,
      height: canvas.height,
      styleWidth: canvas.style.width,
      styleHeight: canvas.style.height,
      clientWidth: canvas.clientWidth,
      clientHeight: canvas.clientHeight,
      rect: canvas.getBoundingClientRect()
    };
  });
  console.log(canvasInfo);
  await browser.close();
})();
