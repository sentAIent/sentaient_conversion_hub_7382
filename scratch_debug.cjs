const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
        page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
        page.on('requestfailed', request => console.log('BROWSER REQUEST FAILED:', request.url(), request.failure().errorText));

        console.log('Navigating to game...');
        await page.goto('http://localhost:5173/interstellar-game/index.html', { waitUntil: 'networkidle0', timeout: 10000 });
        
        console.log('Waiting 2 seconds for JS execution...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('Evaluating game state...');
        const isGameDefined = await page.evaluate(() => typeof window.game !== 'undefined');
        console.log('window.game defined?', isGameDefined);

        await browser.close();
    } catch (e) {
        console.error('Puppeteer error:', e);
        process.exit(1);
    }
})();
