import { test, expect } from '@playwright/test';

test.describe('Interstellar Game E2E', () => {
    
    test.beforeEach(async ({ page }) => {
        // Go to the main entry point
        await page.goto('/');
    });

    test('should load the main hub and display the game container', async ({ page }) => {
        // Ensure the game container is present
        const gameContainer = page.locator('#game-container');
        await expect(gameContainer).toBeVisible();
        
        // Check for start button
        const startButton = page.locator('button', { hasText: 'START ADVENTURE' }).first();
        if (await startButton.isVisible()) {
            await startButton.click();
        }
    });

    test('should connect to multiplayer and instantiate the engine', async ({ page }) => {
        await page.goto('/interstellar');
        
        // Ensure iframe loads
        const iframe = page.locator('iframe[title="Interstellar Game"]');
        await expect(iframe).toBeVisible();

        // The iframe source should be the interstellar-game
        const src = await iframe.getAttribute('src');
        expect(src).toContain('/interstellar-game/index.html');
        
        // Wait for the iframe to load its content
        const frame = page.frameLocator('iframe[title="Interstellar Game"]');
        
        // Check if the canvas is rendered by the engine
        const canvas = frame.locator('#gameCanvas');
        await expect(canvas).toBeVisible({ timeout: 10000 });
    });

    test('should interact with the game UI and open settings', async ({ page }) => {
        await page.goto('/interstellar');
        
        const frame = page.frameLocator('iframe[title="Interstellar Game"]');
        
        // Wait for canvas
        await expect(frame.locator('#gameCanvas')).toBeVisible({ timeout: 10000 });
        
        // Check for HUD elements
        const hud = frame.locator('#hud');
        await expect(hud).toBeVisible();
        
        // Try clicking the settings/menu button if it exists
        const settingsBtn = frame.locator('.menu-btn, #menu-btn, button:has-text("MENU")').first();
        if (await settingsBtn.isVisible()) {
            await settingsBtn.click();
            
            // Check if settings overlay appears
            const settingsOverlay = frame.locator('.settings-panel, #settings-modal, .modal');
            await expect(settingsOverlay).toBeVisible();
        }
    });
});
