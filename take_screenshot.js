const { chromium } = require('playwright');
(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 }});
    await page.goto('http://localhost:8080/mindwave.html', { waitUntil: 'networkidle', timeout: 15000 });
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: '/Users/infinitealpha/.gemini/antigravity/brain/da778e0b-fdc4-4e36-a9ee-2bc86efef5dd/what_user_sees.png' });
    
    // Attempt to click the checkbox and continue
    try {
        await page.click('#disclaimerAccept');
        await page.click('#disclaimerContinueBtn');
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: '/Users/infinitealpha/.gemini/antigravity/brain/da778e0b-fdc4-4e36-a9ee-2bc86efef5dd/after_disclaimer.png' });
        
        // Open cymatics tab
        await page.evaluate(() => {
            const btn = document.querySelector('.tab-pill[onclick*="cymatics"]');
            if (btn) btn.click();
            else if (window.switchRightTab) window.switchRightTab('cymatics');
        });
        await new Promise(r => setTimeout(r, 2000));
        await page.screenshot({ path: '/Users/infinitealpha/.gemini/antigravity/brain/da778e0b-fdc4-4e36-a9ee-2bc86efef5dd/cymatics_tab.png' });
    } catch(e) {
        console.error(e);
    }
    await browser.close();
    console.log("Screenshots taken.");
})();
