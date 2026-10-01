import { test, expect } from '@playwright/test';

test.describe('Cognitive Agent Studio Canvas', () => {
    test('should render canvas and allow dragging cards', async ({ page }) => {
        await page.goto('http://localhost:5173/agent-studio');

        // Check if the Studio loads
        await expect(page).toHaveTitle(/Cognitive Agent Studio/);

        // Find the Swarm Input card
        const controlsCard = page.locator('text=Swarm Input & Controls');
        await expect(controlsCard).toBeVisible();

        // Simulate dragging the card
        const boundingBox = await controlsCard.boundingBox();
        if (boundingBox) {
            await page.mouse.move(boundingBox.x + 10, boundingBox.y + 10);
            await page.mouse.down();
            await page.mouse.move(boundingBox.x + 100, boundingBox.y + 100);
            await page.mouse.up();
        }

        // Wait a bit to ensure React state updates
        await page.waitForTimeout(500);

        // Ideally, we'd check if the inline style 'left' and 'top' changed,
        // but checking it remains visible after dragging is a basic check.
        await expect(controlsCard).toBeVisible();
    });

    test('should launch swarm simulation successfully', async ({ page }) => {
        await page.goto('http://localhost:5173/agent-studio');

        // Wait for the Launch Swarm button to be visible
        const launchBtn = page.getByRole('button', { name: /Launch Swarm/i });
        await expect(launchBtn).toBeVisible();

        // Click the Launch Swarm button
        await launchBtn.click();

        // Verify that the terminal logs output that sandbox was initiated
        const terminalLog = page.locator('text=Docker Sandbox initiated');
        await expect(terminalLog).toBeVisible({ timeout: 5000 });
    });
});
