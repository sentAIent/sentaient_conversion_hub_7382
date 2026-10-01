import { test, expect } from '@playwright/test';

test.describe('Agent Studio E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigating to the Agent Studio path
    await page.goto('/agent-studio');
  });

  test('should render the infinite canvas and major components', async ({ page }) => {
    // Wait for the infinite canvas container to be visible
    const canvas = page.locator('.cursor-grab').first();
    await expect(canvas).toBeVisible();

    // Check if the VoiceAgent card is rendered
    const voiceCard = page.getByText('LiveKit Voice AI');
    await expect(voiceCard).toBeVisible();

    // Check if the QuantDataGrid card is rendered
    const quantGridCard = page.getByText('Enterprise Quant Grid');
    await expect(quantGridCard).toBeVisible();
    
    // Check if LocalWebLLM card is rendered
    const llmCard = page.getByText('WebGPU LLM Sandbox');
    await expect(llmCard).toBeVisible();
  });

  test('should be able to drag a card', async ({ page }) => {
    const voiceCardTitle = page.getByText('LiveKit Voice AI');
    
    // Get the initial bounding box
    const initialBox = await voiceCardTitle.boundingBox();
    expect(initialBox).not.toBeNull();

    // Perform a drag operation
    await page.mouse.move(initialBox.x + 10, initialBox.y + 10);
    await page.mouse.down();
    await page.mouse.move(initialBox.x + 100, initialBox.y + 100, { steps: 5 });
    await page.mouse.up();

    // Verify it moved
    const newBox = await voiceCardTitle.boundingBox();
    expect(newBox.x).toBeGreaterThan(initialBox.x);
    expect(newBox.y).toBeGreaterThan(initialBox.y);
  });
});
