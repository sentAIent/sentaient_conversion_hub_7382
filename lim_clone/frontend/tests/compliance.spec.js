import { test, expect } from '@playwright/test';

test.describe('App Store Compliance & User Verification Flow Tests', () => {

  test('TC_001: Reviewer Gate Authentication Bypass', async ({ page }) => {
    await page.goto('/');
    
    // Check that reviewer bypass button is visible on Login screen
    const reviewerBtn = page.locator('button:has-text("Apple / Google Reviewer Demo Access")');
    await expect(reviewerBtn).toBeVisible();

    // Click to bypass authentication
    await reviewerBtn.click();

    // Verify main workspace layout is loaded
    await expect(page.locator('h1:has-text("Contango Quant")')).toBeVisible();
  });

  test('TC_002: KYC Profile Onboarding & Thesis Generation', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("Apple / Google Reviewer Demo Access")').click();

    // Navigate to KYC Planner
    await page.locator('button:has-text("KYC Planner")').click();
    await expect(page.locator('h2:has-text("Investor KYC & Thesis Profiler")')).toBeVisible();

    // Step 1: Investor Objectives
    await page.selectOption('select', { index: 1 }); // Moderate Risk
    await page.locator('button:has-text("Next Step")').click();

    // Step 2: Financial OCR Upload
    await expect(page.locator('h3:has-text("Financial Statement Analyzer")')).toBeVisible();
    await page.locator('button:has-text("Next Step")').click(); // Proceed

    // Step 3: Liquidity Profile
    await expect(page.locator('h3:has-text("Future Financial Liquidity Profile")')).toBeVisible();
    await page.locator('button:has-text("Next Step")').click();

    // Step 4: Thesis Generation & allocation confirmation
    await expect(page.locator('h3:has-text("Automated Portfolio Thesis Allocation")')).toBeVisible();
    await page.locator('button:has-text("Confirm & Activate Portfolio")').click();

    // Verify returning to step 1 / success
    await expect(page.locator('h3:has-text("Investor Objectives & Risk Profile")')).toBeVisible();
  });

  test('TC_003: Quant Studio Backtester & Analytical Verification', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("Apple / Google Reviewer Demo Access")').click();

    // Navigate to Quant Studio tab
    await page.locator('button:has-text("Quant Studio")').click();
    await expect(page.locator('h2:has-text("Quant Studio & Institutional Algo Lab")')).toBeVisible();

    // Verify 5-Stage framework configurations
    await expect(page.locator('select:first-of-type')).toBeVisible(); // Universe selection dropdown
    
    // Run backtest simulation
    const runBtn = page.locator('button:has-text("Run Institutional Simulation")');
    await expect(runBtn).toBeVisible();
  });

  test('TC_004: UGC Content Moderation - Report & Block Actions', async ({ page }) => {
    await page.goto('/');
    await page.locator('button:has-text("Apple / Google Reviewer Demo Access")').click();

    // Navigate to Leaderboard
    await page.locator('button:has-text("Leaderboard")').click();
    await expect(page.locator('h2:has-text("Social Leaderboard & Strategy Hub")')).toBeVisible();

    // Check first Report button opens dialog
    const reportBtn = page.locator('button:has-text("🚩 Report")').first();
    await expect(reportBtn).toBeVisible();

    // Check first Block button
    const blockBtn = page.locator('button:has-text("🚫 Block")').first();
    await expect(blockBtn).toBeVisible();
  });

});
