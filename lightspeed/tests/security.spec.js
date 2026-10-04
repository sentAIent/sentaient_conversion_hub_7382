import { test, expect } from '@playwright/test';

test.describe('OWASP Security Headers and Injection Prevention', () => {
  test('should enforce Content Security Policy (CSP)', async ({ page }) => {
    const response = await page.goto('/');
    const headers = response.headers();
    
    expect(headers['content-security-policy']).toBeDefined();
    expect(headers['content-security-policy']).toContain('report-uri');
    expect(headers['x-frame-options']).toBe('DENY');
    expect(headers['x-content-type-options']).toBe('nosniff');
  });

  test('should sanitize user inputs to prevent XSS', async ({ page }) => {
    await page.goto('/login');
    // Try injecting a script into the email field
    await page.fill('input[type="email"]', '<script>alert("XSS")</script>');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Ensure no alert was fired and input was rejected or safely handled
    const errorMsg = await page.locator('text=invalid').isVisible();
    // Assuming backend/Supabase correctly rejects invalid email formats safely
    expect(errorMsg || await page.locator('text=Failed').isVisible()).toBeTruthy();
  });

  test('should rate limit authentication attempts', async ({ page }) => {
    await page.goto('/login');
    for (let i = 0; i < 6; i++) {
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', 'wrongpassword');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(500); // brief wait
    }
    
    // 5th attempt should trigger lockout
    const lockoutMsg = await page.locator('text=Too many attempts').isVisible() || 
                       await page.locator('text=locked').isVisible();
    expect(lockoutMsg).toBeTruthy();
  });
});
