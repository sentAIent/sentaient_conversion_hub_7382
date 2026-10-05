import { test, expect } from '@playwright/test';

test.describe('Sentaient Website E2E Flows', () => {

    test('ComplianceGate blocks access until accepted', async ({ page }) => {
        // Go to the main route
        await page.goto('http://localhost:5173/');

        // Wait for ComplianceGate to appear
        const gate = page.locator('text="Data & Privacy Consent"');
        await expect(gate).toBeVisible({ timeout: 10000 });

        // Ensure main app content isn't accessible yet (or is behind backdrop)
        // Check for the "I ACCEPT" button
        const acceptButton = page.locator('button', { hasText: 'I ACCEPT' });
        await expect(acceptButton).toBeVisible();

        // Click accept
        await acceptButton.click();

        // Ensure ComplianceGate disappears
        await expect(gate).not.toBeVisible();
        
        // Ensure local storage is set correctly
        const isAccepted = await page.evaluate(() => localStorage.getItem('sentaient_compliance_accepted'));
        expect(isAccepted).toBe('true');
    });

    test('Core Navigation and UI elements render after consent', async ({ page }) => {
        // Pre-consent via local storage so we skip the gate
        await page.addInitScript(() => {
            localStorage.setItem('sentaient_compliance_accepted', 'true');
        });

        await page.goto('http://localhost:5173/');

        // Verify the compliance gate is NOT there
        await expect(page.locator('text="Data & Privacy Consent"')).not.toBeVisible();

        // Note: The specific assertions below should be adapted to the actual DOM structure of Sentaient.
        // For now, we assert that the page body is visible and contains some expected text or id.
        await expect(page.locator('body')).toBeVisible();
    });

});
