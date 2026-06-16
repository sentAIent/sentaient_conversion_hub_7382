const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    try {
        await page.goto('http://localhost:8080/mindwave.html', { waitUntil: 'networkidle', timeout: 15000 });
        await new Promise(r => setTimeout(r, 2000));
        await page.evaluate(() => {
            const btn = document.querySelector('.tab-pill[onclick*="studio"]');
            if (btn) btn.click();
            else if (window.switchRightTab) window.switchRightTab('studio');
        });
        await new Promise(r => setTimeout(r, 1000));
        await page.screenshot({ path: 'fast_test_studio.png' });
        await browser.close();
        process.exit(0);
    } catch (e) {
        console.error(e);
        await browser.close();
        process.exit(1);
    }
})();
