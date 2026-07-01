const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

    await page.goto('http://localhost:3000/interstellar-game/index.html'); // Assuming server is running, or we use file://
    // Try file protocol if localhost is down
    if (page.url() === 'about:blank') {
        await page.goto('file:///Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/index.html');
    }

    await page.waitForTimeout(1000);
    
    console.log("Testing Music Settings Modal...");
    await page.evaluate(() => {
        if (window.app) window.app.openMusicSettings();
    });
    
    await page.waitForTimeout(500);

    console.log("Testing Music Volume Slider...");
    await page.evaluate(() => {
        const slider = document.getElementById('musicVolumeSlider');
        if (slider) {
            slider.value = 0.5;
            slider.dispatchEvent(new Event('input'));
        }
    });

    console.log("Testing Engine Volume Slider...");
    await page.evaluate(() => {
        const slider = document.getElementById('engineVolumeSlider');
        if (slider) {
            slider.value = 0.5;
            slider.dispatchEvent(new Event('input'));
        }
    });

    console.log("Testing Master Volume Slider...");
    await page.evaluate(() => {
        const slider = document.getElementById('masterVolumeSlider');
        if (slider) {
            slider.value = 0.5;
            slider.dispatchEvent(new Event('input'));
        }
    });
    
    console.log("Done testing sliders.");
    await browser.close();
})();
