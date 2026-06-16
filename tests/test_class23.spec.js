const { test, expect } = require('@playwright/test');

test('Check Class 23 for errors', async ({ page }) => {
  const logs = [];
  page.on('console', msg => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
          logs.push(msg.text());
      }
  });
  page.on('pageerror', error => {
      logs.push(error.message);
  });

  await page.goto('http://localhost:5173/mindwave.html');
  await page.waitForTimeout(1000);
  
  console.log('Clicking Class 23 Button 0');
  await page.evaluate(() => {
      window.setCymaticPattern(23, 0);
  });
  
  await page.waitForTimeout(1000);
  console.log('Console errors:', logs);
  
  expect(logs.length).toBe(0);
});
