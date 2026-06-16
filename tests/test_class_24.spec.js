const { test, expect } = require('@playwright/test');

test('Class 24 Layer 2 UI and Shader Test', async ({ page }) => {
    page.on('console', msg => console.log('BROWSER: ' + msg.text()));
    
    // 1. Load the page and wait for everything to settle
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000); // Wait for boot sequence

    // 2. Click the "Enter Mindwave" / "Start" buttons if paywalls exist
    try {
        const modalBtn = await page.locator('.modal-content button.bg-cyan-500');
        if (await modalBtn.isVisible({ timeout: 1000 })) {
            await modalBtn.click();
            await page.waitForTimeout(500);
        }
    } catch (e) {}

    // Bypass any remaining overlays to ensure we can click the visualizer UI
    await page.evaluate(() => {
        const paywall = document.getElementById('paywall-overlay');
        if (paywall) paywall.remove();
        const survey = document.getElementById('intent-survey-modal');
        if (survey) survey.remove();
    });

    // 3. Open the UI panel if closed
    await page.evaluate(() => {
        const toggle = document.getElementById('uiToggle');
        if (toggle && toggle.checked) {
            toggle.click();
        }
    });
    
    // 4. Force init visualizer directly if lazy loading failed
    await page.evaluate(() => {
        if (!window.viz3D && window.setupUI) {
             window.setupUI();
        }
    });
    await page.waitForTimeout(1000);

    // 5. Select Class 24
    await page.evaluate(() => {
        if (window.viz3D && window.viz3D.cymaticsCore) {
             window.viz3D.cymaticsCore.setPattern(24, 0);
        }
    });
    await page.waitForTimeout(500);

    // 6. Click the Dragon Constellation (Lines - Index 2)
    await page.evaluate(() => {
        const btns = document.querySelectorAll('#c24-lines-container button');
        if (btns[2]) btns[2].click();
    });
    await page.waitForTimeout(500);
    
    const dragonBtn = await page.locator('#c24-lines-container button').nth(2);

    // 7. Assertions: UI Highlight
    const classList = await dragonBtn.evaluate(b => Array.from(b.classList));
    expect(classList).toContain('border-cyan-400'); // Our active highlight

    // 8. Assertions: Shader Uniform Update
    const uniformState = await page.evaluate(() => {
        const mat = window.viz3D.cymaticsCore.materials[24];
        return {
            linesId: window.viz3D.cymaticsCore.activeLinesId,
            hasTexture3: mat.uniforms.uTexture3.value && mat.uniforms.uTexture3.value.isTexture
        };
    });
    
    console.log('Shader State:', uniformState);
    expect(uniformState.linesId).toBe(2);
    expect(uniformState.hasTexture3).toBe(true);
});
