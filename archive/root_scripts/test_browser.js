const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('BROWSER_ERROR:', msg.text());
        }
    });
    
    page.on('pageerror', err => {
        console.log('PAGE_ERROR:', err.message);
    });

    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2' });
    
    // wait a moment for shaders to compile if they do
    await new Promise(r => setTimeout(r, 2000));

    await browser.close();
})();
