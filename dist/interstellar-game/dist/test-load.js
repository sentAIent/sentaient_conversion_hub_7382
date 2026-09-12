const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ 
            executablePath: './node_modules/.bin/chromium',
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        // Expose console logs
        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
        page.on('pageerror', err => console.error('BROWSER ERROR:', err.toString()));
        
        console.log("Navigating to index.html...");
        await page.goto('file://' + process.cwd() + '/index.html', { waitUntil: 'load' });
        
        console.log("Waiting 5 seconds to see what happens...");
        await new Promise(r => setTimeout(r, 5000));
        
        console.log("Clicking PRESS TO FLY...");
        await page.click('#loadingPrompt');
        
        console.log("Waiting 5 seconds after click...");
        await new Promise(r => setTimeout(r, 5000));

        await browser.close();
        console.log("Finished without hanging!");
    } catch (e) {
        console.error("Puppeteer Script Error:", e);
        process.exit(1);
    }
})();
