import { test, expect } from '@playwright/test';

test('has title and loads studio', async ({ page }) => {
  await page.goto('/');

  // Should have title
  await expect(page).toHaveTitle(/Contango Quant/i);

  // Navigate to Strategy Studio
  const studioTab = page.locator('text=Quant Studio');
  await studioTab.click();

  // Verify the Backtester button is there
  const backtestTab = page.locator('text=5-Stage Backtester');
  await expect(backtestTab).toBeVisible();

  // Switch to Greeks Lab
  const greeksTab = page.locator('text=Options Greeks Lab');
  await greeksTab.click();

  // Verify Greek dials appear
  await expect(page.locator('text=Theoretical Price')).toBeVisible();
});
