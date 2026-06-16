const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({headless: "new"});
    const page = await browser.newPage();
    let errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text());
        }
    });
    page.on('pageerror', error => {
        errors.push(error.message);
    });
    
    await page.goto('http://localhost:5173/mindwave.html', {waitUntil: 'networkidle0'});
    
    if (errors.length > 0) {
        console.log("ERRORS FOUND:");
        errors.forEach(e => console.log(e));
    } else {
        console.log("No console errors found.");
    }
    await browser.close();
})();
