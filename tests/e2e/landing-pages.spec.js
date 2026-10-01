import { test, expect } from '@playwright/test';

test.describe('Landing Pages', () => {
  test('Icebreaker Landing loads', async ({ page }) => {
    await page.goto('/icebreaker');
    await expect(page.getByRole('heading', { name: 'Icebreaker', exact: true })).toBeVisible();
    await expect(page.getByText('100% Human')).toBeVisible();
  });

  test('Interstellar Landing loads', async ({ page }) => {
    await page.goto('/interstellar/landing'); // Just testing /interstellar as that might be the route
    // Fallback to testing the title or h1
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Mindwave Landing loads', async ({ page }) => {
    await page.goto('/mindwave');
    await expect(page.locator('h1').first()).toBeVisible();
  });
});
