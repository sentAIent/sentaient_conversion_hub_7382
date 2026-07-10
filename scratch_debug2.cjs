const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('Launching browser...');
        const browser = await puppeteer.launch({ 
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--remote-debugging-port=9222']
        });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
        page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
        page.on('requestfailed', request => console.log('BROWSER REQUEST FAILED:', request.url(), request.failure() ? request.failure().errorText : 'unknown'));

        console.log('Navigating to debug html...');
        await page.goto('http://localhost:5173/scratch_debug.html', { waitUntil: 'networkidle0', timeout: 30000 });
        
        console.log('Waiting 2 seconds for JS execution...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        await browser.close();
    } catch (e) {
        console.error('Puppeteer error:', e);
        process.exit(1);
    }
})();
