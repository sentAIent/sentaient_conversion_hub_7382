const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const errors = [];
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });
    
    page.on('pageerror', err => {
        errors.push(err.toString());
    });

    try {
        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2', timeout: 10000 });
        console.log(JSON.stringify(errors));
    } catch (e) {
        console.log(JSON.stringify(["Failed to load page: " + e.message]));
    }
    
    await browser.close();
})();
