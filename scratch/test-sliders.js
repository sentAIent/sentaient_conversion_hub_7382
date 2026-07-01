const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.error('PAGE ERROR:', err));

    await page.goto('http://localhost:3000/interstellar-game/', { waitUntil: 'networkidle0' });

    // Click the MUSIC button to open modal
    console.log('Opening music modal...');
    await page.evaluate(() => {
        document.getElementById('musicSettingsBtn').click();
    });

    await page.waitForTimeout(500);

    // Try to change master volume slider
    console.log('Changing master volume slider...');
    await page.evaluate(() => {
        const slider = document.getElementById('masterVolumeSlider');
        slider.value = 0.5;
        // dispatch input event
        slider.dispatchEvent(new Event('input'));
    });

    await page.waitForTimeout(500);

    // Try to click Master Mute button
    console.log('Clicking Master Mute button...');
    await page.evaluate(() => {
        document.getElementById('masterMuteToggleBtn').click();
    });

    await browser.close();
})();
