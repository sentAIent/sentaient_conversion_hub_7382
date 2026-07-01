const puppeteer = require('puppeteer');
(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        page.on('console', msg => console.log('BROWSER:', msg.text()));
        page.on('pageerror', err => console.log('ERROR:', err.toString()));
        try {
            await page.goto('http://127.0.0.1:8081/index.html', { timeout: 10000 });
        } catch (e) {
            console.log("Goto timed out, continuing anyway...");
        }
        
        console.log("Waiting for 2 seconds...");
        await new Promise(r => setTimeout(r, 2000));
        
        // Output the loading log
        const logContent = await page.evaluate(() => {
            const ll = document.getElementById('loadingLog');
            const err = document.getElementById('errorMsg');
            return {
                loadingLog: ll ? ll.innerText : 'null',
                errorMsg: err ? err.innerText : 'null'
            };
        });
        console.log("PAGE STATE:", logContent);
        
        console.log("Navigated to page, waiting for SYSTEMS ONLINE...");
        // Try clicking the document body
        await page.evaluate(() => {
            document.getElementById('loadingScreen').click();
        });
        
        await new Promise(r => setTimeout(r, 2000));
        
        const uiStyle = await page.evaluate(() => {
            const ui = document.getElementById('stats');
            return window.getComputedStyle(ui).display;
        });
        
        console.log("Stats UI display after click:", uiStyle);
        await browser.close();
    } catch(e) {
        console.error("Test failed:", e);
        process.exit(1);
    }
})();
