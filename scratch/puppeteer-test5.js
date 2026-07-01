const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.error('PAGE ERROR:', error));

    try {
        await page.goto('http://localhost:8085/index.html', { waitUntil: 'domcontentloaded', timeout: 10000 });
        console.log('Page loaded');
        
        await new Promise(r => setTimeout(r, 2000));
        
        await page.evaluate(() => {
            console.log('window.app:', !!window.app);
            console.log('window.gameAudio:', !!window.gameAudio);
            if (window.app) {
                console.log('Calling app.toggleMasterMute()');
                try {
                    window.app.toggleMasterMute();
                } catch(e) {
                    console.log('Error calling toggleMasterMute:', e.stack);
                }
                console.log('Calling app.setMasterVolume(0.5)');
                try {
                    window.app.setMasterVolume(0.5);
                } catch(e) {
                    console.log('Error calling setMasterVolume:', e.stack);
                }
            }
        });
    } catch (e) {
        console.error('Puppeteer error:', e);
    } finally {
        await browser.close();
    }
})();
