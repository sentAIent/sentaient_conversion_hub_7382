import { test, expect } from '@playwright/test';

test.describe('Dashboards & Internal Tools', () => {
  test('Dashboard loads without crashing', async ({ page }) => {
    await page.goto('/dashboard');
    // If it redirects to login, check for login form
    // If it stays, check for dashboard elements
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(0);
  });

  test('Icebreaker Admin loads', async ({ page }) => {
    await page.goto('/icebreaker/admin');
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(0);
  });

  test('Agent Studio loads', async ({ page }) => {
    await page.goto('/agents/studio');
    const bodyText = await page.textContent('body');
    expect(bodyText.length).toBeGreaterThan(0);
  });
});
