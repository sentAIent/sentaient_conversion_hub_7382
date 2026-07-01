const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.error('PAGE ERROR:', error));

    try {
        await page.goto('http://localhost:5173/public/interstellar-game/index.html', { waitUntil: 'networkidle2', timeout: 10000 });
        console.log('Page loaded');
        
        // Wait for modal to be ready
        await page.waitForSelector('#musicSettingsModal', { timeout: 5000 }).catch(() => console.log('Modal not found initially'));
        
        // Evaluate window.app
        const appExists = await page.evaluate(() => !!window.app);
        console.log('window.app exists:', appExists);
        
        const gameAudioExists = await page.evaluate(() => !!window.gameAudio);
        console.log('window.gameAudio exists:', gameAudioExists);

        if (!appExists || !gameAudioExists) {
            console.log('CRITICAL: globals not defined');
        }

        // Try to toggle mute
        await page.evaluate(() => {
            console.log('Attempting to call app.toggleMute()');
            try {
                if (window.app) window.app.toggleMute();
            } catch (e) {
                console.error('Error in toggleMute:', e.toString());
            }
        });

    } catch (e) {
        console.error('Puppeteer error:', e);
    } finally {
        await browser.close();
    }
})();
