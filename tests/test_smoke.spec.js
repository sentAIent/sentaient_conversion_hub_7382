const { test, expect } = require('@playwright/test');

test('Smoke Test Mindwave HTML', async ({ page }) => {
    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });
    page.on('pageerror', error => {
        errors.push(error.message);
    });

    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(3000); // Give it time to hit setupUI

    console.log("Errors captured:", errors);
    expect(errors.length).toBe(0);
});
