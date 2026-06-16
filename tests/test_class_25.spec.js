const { test, expect } = require('@playwright/test');

test('Class 25 loads cleanly without WebGL errors', async ({ page }) => {
    let hasError = false;

    page.on('console', msg => {
        const text = msg.text();
        if (msg.type() === 'error' && (text.includes('shader') || text.includes('WebGL'))) {
            console.error(`[Browser Error] ${text}`);
            hasError = true;
        } else {
            console.log(`[Browser Console] ${text}`);
        }
    });

    page.on('pageerror', err => {
        console.error(`[Page Error] ${err.toString()}`);
        hasError = true;
    });

    console.log("Loading mindwave.html...");
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle' });

    console.log("Waiting for visualizer...");
    await page.waitForFunction('window.viz3D && window.viz3D.cymaticsCore', { timeout: 10000 });

    console.log("Setting pattern to Class 25 (Quantum Double-Slit)...");
    await page.evaluate(() => {
        window.setCymaticPattern(25, 0);
    });

    // Wait 2 seconds to let the shader compile and run
    await page.waitForTimeout(2000);

    expect(hasError).toBe(false);
    console.log("SUCCESS: No shader errors detected. Class 25 loaded cleanly.");
});
