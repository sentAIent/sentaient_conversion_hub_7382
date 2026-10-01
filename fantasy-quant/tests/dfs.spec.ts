import { test, expect } from '@playwright/test';

test('DFS Dashboard basic functionality', async ({ page }) => {
  // Mock Supabase Auth to bypass login
  await page.route('**/auth/v1/user', async route => {
    const json = {
      id: "123",
      email: "test@example.com",
      role: "authenticated",
      app_metadata: {},
      user_metadata: {}
    };
    await route.fulfill({ json });
  });

  // Mock User tier to be MAX
  await page.route('**/rest/v1/users?select=subscription_tier&id=eq.123', async route => {
    const json = [{ subscription_tier: 'max' }];
    await route.fulfill({ json });
  });

  await page.goto('/dfs');

  // Verify header
  await expect(page.getByRole('heading', { name: 'Player Pool' })).toBeVisible();

  // We check if basic UI components exist
  await expect(page.locator('text=Lineup Builder')).toBeVisible();

  // Toggle Live Mode
  const liveModeBtn = page.getByText('ENABLE LIVE');
  if (await liveModeBtn.isVisible()) {
      await liveModeBtn.click();
      await expect(page.getByText('LIVE MODE ON')).toBeVisible();
  }

  // Because the database might be empty in testing, we just check the layout container
  const mainLayout = page.locator('div.flex-col.lg\\:flex-row');
  await expect(mainLayout).toBeVisible();
});
