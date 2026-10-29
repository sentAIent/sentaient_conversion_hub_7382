import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/LegalEagle/);
});

test('shows sign in page when not authenticated', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.locator('text=Sign in')).toBeVisible();
});
