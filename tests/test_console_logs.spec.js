import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

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

  try {
    // Navigate and don't wait for full load, just commit
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'commit', timeout: 15000 });
    // Wait for 5 seconds to passively collect logs
    await page.waitForTimeout(5000);
  } catch (e) {
    logs.push(`[TEST RUNNER ERROR] ${e.message}`);
  }

  const outPath = path.join(process.cwd(), 'scratch', 'captured_logs.txt');
  if (!fs.existsSync(path.dirname(outPath))) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
  }
  fs.writeFileSync(outPath, logs.join('\n'), 'utf8');
  
  console.log('Logs written to ' + outPath);
  expect(true).toBe(true);
});
