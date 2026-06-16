import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Set window size explicitly
  await page.setViewportSize({ width: 1280, height: 720 });
  
  // Navigate to mindwave.html
  await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'load' });
  
  // Wait a moment for visualizer to load
  await page.waitForTimeout(3000);
  
  // Take a screenshot
  const screenshotPath = path.join(__dirname, 'diagonal_debug.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`Screenshot saved to: ${screenshotPath}`);
  
  await browser.close();
})();
