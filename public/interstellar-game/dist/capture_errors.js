const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('BROWSER ERROR:', msg.text());
        }
    });
    
    page.on('pageerror', error => {
        console.log('PAGE ERROR:', error.message);
    });

    console.log("Navigating to game...");
    await page.goto('http://localhost:3000/interstellar.html', { waitUntil: 'domcontentloaded' });
    
    console.log("Entering flight mode...");
    // Attempt to click the flight mode button, wait 5 seconds, and close.
    try {
        await page.evaluate(() => {
            if (window.app && window.app.toggleFlightMode) {
                window.app.toggleFlightMode();
            } else if (document.getElementById('flightModeBtn')) {
                document.getElementById('flightModeBtn').click();
            }
        });
    } catch(e) {}
    
    console.log("Waiting 10 seconds for errors to accumulate...");
    await new Promise(r => setTimeout(r, 10000));
    
    await browser.close();
    console.log("Done.");
})();
