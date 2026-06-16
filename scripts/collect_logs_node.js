const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const logs = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      logs.push(`[${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });

  page.on('pageerror', exception => {
    logs.push(`[PAGE ERROR] ${exception.message}`);
  });

  try {
    await page.goto('http://localhost:5173/mindwave.html', { timeout: 15000, waitUntil: 'commit' });
    await page.waitForTimeout(5000);
  } catch (e) {
    logs.push(`[NAVIGATION ERROR] ${e.message}`);
  }

  await browser.close();

  console.log('=== LOGS START ===');
  logs.forEach(l => console.log(l));
  console.log('=== LOGS END ===');
  process.exit(0);
})();
