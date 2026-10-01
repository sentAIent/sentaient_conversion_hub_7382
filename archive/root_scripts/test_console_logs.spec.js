import { test, expect } from '@playwright/test';

test('Collect console errors and warnings', async ({ page }) => {
  const logs = [];
  page.on('console', msg => {
    if (msg.type() === 'error' || msg.type() === 'warning') {
      logs.push(`[${msg.type().toUpperCase()}] ${msg.text()}`);
    }
  });
  
  page.on('pageerror', exception => {
    logs.push(`[PAGE ERROR] ${exception.message}`);
  });

  await page.goto('http://localhost:5173/mindwave.html');
  
  // Wait for 5 seconds to passively collect logs
  await page.waitForTimeout(5000);
  
  console.log('=== CAPTURED LOGS ===');
  logs.forEach(log => console.log(log));
  console.log('=====================');
});
