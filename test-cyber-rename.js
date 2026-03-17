import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Capture unhandled errors and console logs
    page.on('pageerror', err => console.log('[PAGE ERROR]', err.message));
    page.on('console', msg => console.log('[BROWSER CONSOLE]', msg.text()));

    console.log('[TEST] Navigating to http://localhost:5173/mindwave-beta.html...');
    await page.goto('http://localhost:5173/mindwave-beta.html', { waitUntil: 'load' });
    
    await page.waitForSelector('#cyberBtn', { timeout: 15000 });
    console.log('[TEST] Found #cyberBtn. Clicking...');
    await page.click('#cyberBtn');
    
    console.log('[TEST] Waiting 4 seconds for lazy-loading to complete...');
    await new Promise(r => setTimeout(r, 4000));
    
    console.log('[TEST] Taking screenshot of the outcome...');
    await page.screenshot({ path: '/Users/infinitealpha/.gemini/antigravity/brain/961c626b-8a4c-4697-8d05-fa5f6e1ab809/cyber_rename_outcome.png' });

    console.log('[TEST] Checking activeModes...');
    const result = await page.evaluate(() => {
        // Fallback to checking els.canvas.activeVisualizer if getVisualizer isn't globally exported 
        // depending on Vite's module bundling encapsulation behavior
        const viz = (typeof window.getVisualizer === 'function') ? window.getVisualizer() : (window.els && window.els.canvas && window.els.canvas.activeVisualizer) ? window.els.canvas.activeVisualizer : null;
        return {
            activeModes: viz ? Array.from(viz.activeModes) : null,
            cyberLogicMode: viz ? viz.cyberLogicMode : null,
        };
    });
    console.log('[TEST] Visualizer State:', result);

    await browser.close();
    console.log('[TEST] Complete.');
})();
