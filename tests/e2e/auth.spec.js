import { test, expect } from '@playwright/test';

test.describe('Authentication flows', () => {
  test('Login page loads and shows required elements', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Login/);
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
    await expect(page.getByPlaceholder(/@example.com/)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
  });

  test('Register page loads and shows required elements', async ({ page }) => {
    await page.goto('/register');
    // Ensure it doesn't crash
    await expect(page.locator('form')).toBeVisible();
    await expect(page.getByRole('button', { name: /Create Account/i })).toBeVisible();
  });
});
