const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error' || msg.type() === 'warning') {
            console.log(`[BROWSER ${msg.type().toUpperCase()}] ${msg.text()}`);
        }
    });

    try {
        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2', timeout: 10000 });
        await new Promise(r => setTimeout(r, 5000));
    } catch (err) {
        console.error('Page load error:', err);
    }

    await browser.close();
})();
