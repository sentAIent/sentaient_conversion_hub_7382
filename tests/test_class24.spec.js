import { test, expect } from '@playwright/test';

test('Class 24 Procedural Geometry buttons update WebGL uniform', async ({ page }) => {
  await page.goto('/mindwave.html');
  await page.waitForFunction(() => window.viz3D && window.viz3D.cymaticsCore);

  // Explicitly activate Class 24 first
  await page.evaluate(() => {
    if (window.setCymaticPattern) window.setCymaticPattern(24, 0);
  });

  // Give the shader a moment to compile/initialize
  await page.waitForTimeout(500);

  // Execute the click directly in the browser context to bypass display:none visibility constraints
  // Since the visualizer class might not be fully expanded in the UI accordion
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const btn = buttons.find(b => b.textContent.includes('Deep Space Links'));
    if (btn) btn.click();
  });

  const uniformValue = await page.evaluate(() => {
    return window.viz3D.cymaticsCore.materials[24]?.uniforms?.uLayer2Type?.value;
  });

  expect(uniformValue).toBe(2.0);
});
