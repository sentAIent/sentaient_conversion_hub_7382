const { chromium } = require('playwright');

(async () => {
    console.log('Launching browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage();

    let logs = [];
    page.on('console', msg => {
        logs.push(`[${msg.type()}] ${msg.text()}`);
    });
    
    page.on('pageerror', err => {
        logs.push(`[PageError] ${err.message}`);
    });

    console.log('Navigating to mindwave.html...');
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle', timeout: 30000 });
    
    await page.waitForTimeout(5000); // let things settle

    // Try to click profile to see if modal opens without error
    console.log('Testing profile modal...');
    await page.evaluate(() => {
        if(window.openAuthTrigger) window.openAuthTrigger();
        else if(window.openAuthModal) window.openAuthModal();
    });
    
    await page.waitForTimeout(1000);

    const hasAdminBtn = await page.evaluate(() => {
        return document.getElementById('adminMarketingBtn') !== null;
    });

    console.log('Admin Button exists in DOM:', hasAdminBtn);

    const heartCymaticTriggered = logs.some(l => l.includes('Force-engaging Cymatics Default'));
    console.log('Force-engaging cymatics triggered:', heartCymaticTriggered);

    // Filter to only error and warning logs
    const importantLogs = logs.filter(l => l.startsWith('[error]') || l.startsWith('[warning]') || l.startsWith('[PageError]'));
    console.log('Important Logs:', importantLogs.slice(0, 20)); // show up to 20 errors/warnings
    
    await browser.close();
})();
