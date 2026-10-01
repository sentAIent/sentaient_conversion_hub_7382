const puppeteer = require('puppeteer');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    console.log('Navigating to http://localhost:5173/mindwave.html...');
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2' });
    
    console.log('Waiting for visualizer to initialize...');
    await page.waitForFunction('window.VIZ_READY_DISPATCHED === true', { timeout: 10000 });
    
    // Switch to Cymatics tab to ensure it loads the module if not already
    console.log('Switching to Cymatics tab...');
    await page.evaluate(() => {
        const cymaticsPill = document.querySelector('.tab-pill[title="Cymatics"]');
        if (window.switchRightTab && cymaticsPill) {
            window.switchRightTab('cymatics', cymaticsPill);
        }
    });
    
    // Wait for the lazy module to load
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Dumping CymaticsCore constructor...');
    try {
        const result = await page.evaluate(() => {
            const viz = window.viz3D;
            if (!viz || !viz.cymaticsCore) return 'No CymaticsCore found';
            return viz.cymaticsCore.constructor.toString();
        });
        
        console.log('=== CONSTRUCTOR CODE START ===');
        console.log(result.substring(0, 500));
        console.log('... skipping ...');
        // Find the loop specifically
        const loopIndex = result.indexOf('for (let i');
        if (loopIndex !== -1) {
            console.log(result.substring(loopIndex, loopIndex + 200));
        } else {
            console.log('COULD NOT FIND FOR LOOP!');
        }
        console.log('=== CONSTRUCTOR CODE END ===');
        
    } catch (e) {
        console.error('Error during test:', e);
    }
    
    await browser.close();
})();
