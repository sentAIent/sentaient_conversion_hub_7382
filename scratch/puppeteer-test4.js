const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.error('PAGE ERROR:', error));

    try {
        await page.goto('http://localhost:8085/index.html', { waitUntil: 'domcontentloaded', timeout: 5000 });
        console.log('Page loaded');
        
        await page.waitForFunction(() => !!window.app && !!window.gameAudio, { timeout: 3000 }).catch(() => console.log('Timeout waiting for window.app'));
        
        await page.evaluate(() => {
            console.log('window.app:', !!window.app);
            console.log('window.gameAudio:', !!window.gameAudio);
            if (window.app) {
                console.log('Calling app.toggleMute()');
                window.app.toggleMute();
            }
        });
    } catch (e) {
        console.error('Puppeteer error:', e);
    } finally {
        await browser.close();
    }
})();
