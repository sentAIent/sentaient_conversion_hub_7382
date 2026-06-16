const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  // Go to page
  await page.goto('http://127.0.0.1:8080/mindwave.html', { waitUntil: 'networkidle' });
  
  // Wait for load
  await page.waitForTimeout(3000);
  
  // Enter app
  if (await page.$('#enterAppBtn')) {
    await page.click('#enterAppBtn');
    await page.waitForTimeout(1000);
  }
  
  // Click Cymatics tab
  const tabs = await page.$$('.tab-pill');
  for (let t of tabs) {
    const text = await t.innerText();
    if (text.includes('Cymatics')) {
      await t.click();
      break;
    }
  }
  
  await page.waitForTimeout(1000);
  
  // Scroll down a bit in the container to see the bottom classes
  await page.evaluate(() => {
    const container = document.querySelector('.custom-scrollbar');
    if (container) container.scrollTop = 5000;
  });
  
  await page.waitForTimeout(1000);
  
  // Screenshot the app area
  await page.screenshot({ path: '/Users/infinitealpha/.gemini/antigravity/brain/da778e0b-fdc4-4e36-a9ee-2bc86efef5dd/cymatics_bottom_real.png' });
  
  console.log('Screenshot saved to cymatics_bottom_real.png');
  await browser.close();
})();
