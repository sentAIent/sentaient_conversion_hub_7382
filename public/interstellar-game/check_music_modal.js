const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
    
    await page.goto('http://127.0.0.1:3000/interstellar-game/index.html', { waitUntil: 'networkidle0' });
    console.log("Loaded page.");
    
    // Play to start audio context
    await page.evaluate(() => {
        const btn = document.getElementById('startEngineBtn');
        if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    
    // Open music modal
    await page.evaluate(() => {
        window.app.openMusicSettings();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    // Switch to binaural tab
    await page.evaluate(() => {
        window.app.switchMusicTab('binaural');
    });
    await new Promise(r => setTimeout(r, 1000));
    
    // Click Deep Delta
    console.log("Clicking Deep Delta...");
    await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('.btn-secondary')).find(b => b.textContent.includes('Deep Delta'));
        if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 2000));
    
    // Drag slider
    console.log("Changing music volume slider...");
    await page.evaluate(() => {
        const slider = document.getElementById('musicVolumeSlider');
        if (slider) {
            slider.value = 0.8;
            slider.dispatchEvent(new Event('input'));
        }
    });
    await new Promise(r => setTimeout(r, 1000));
    
    console.log("Clicking mute...");
    await page.evaluate(() => {
        const muteBtn = document.getElementById('muteToggleBtn');
        if (muteBtn) muteBtn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    
    await browser.close();
    console.log("Done.");
})();
