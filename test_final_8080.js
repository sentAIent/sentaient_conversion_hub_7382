const { chromium } = require('playwright');

(async () => {
    let hasErrors = false;
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        const text = msg.text();
        if (msg.type() === 'error') {
            console.error('BROWSER ERROR:', text);
            hasErrors = true;
        } else {
            console.log('BROWSER LOG:', text);
        }
    });

    page.on('pageerror', error => {
        console.error('PAGE ERROR:', error.message);
        hasErrors = true;
    });

    page.on('requestfailed', request => {
        console.error('REQUEST FAILED:', request.url(), request.failure().errorText);
    });

    try {
        console.log("Navigating to http://localhost:8080/mindwave.html ...");
        await page.goto('http://localhost:8080/mindwave.html', { waitUntil: 'networkidle', timeout: 15000 });
        await new Promise(r => setTimeout(r, 2000));

        // Click Cymatics to make sure it loads
        await page.evaluate(() => {
            const btn = document.querySelector('.tab-pill[onclick*="cymatics"]');
            if (btn) btn.click();
            else if (window.switchRightTab) window.switchRightTab('cymatics');
        });
        await new Promise(r => setTimeout(r, 1000));
        
        // Ensure Cymatics has text
        const text = await page.evaluate(() => {
            const el = document.getElementById('tab-cymatics');
            return el ? el.innerText.trim() : '';
        });
        
        if (!text || text.length < 10) {
            console.error("CYMATICS TAB EMPTY!");
            hasErrors = true;
        } else {
            console.log("CYMATICS TAB POPULATED. Length:", text.length);
        }

    } catch (e) {
        console.error("SCRIPT ERROR:", e.message);
        hasErrors = true;
    }

    await browser.close();
    
    if (hasErrors) {
        console.log("VERIFICATION FAILED");
        process.exit(1);
    } else {
        console.log("VERIFICATION PASSED");
        process.exit(0);
    }
})();
