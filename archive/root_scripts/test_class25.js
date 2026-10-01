const puppeteer = require('puppeteer');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    console.log('Navigating to http://localhost:5173/mindwave.html...');
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2' });
    
    // Wait for the visualizer to be fully ready
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
    
    console.log('Testing Observer Effect toggle...');
    try {
        await page.evaluate(() => {
            if (window.toggleObserverEffect) {
                window.toggleObserverEffect(true);
            } else {
                throw new Error("window.toggleObserverEffect is not defined on window!");
            }
        });
        
        // Wait a moment for pattern to set
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const result = await page.evaluate(() => {
            const viz = window.viz3D;
            if (!viz || !viz.cymaticsCore) return 'No CymaticsCore found';
            if (!viz.cymaticsCore.materials[25]) return 'materials[25] is undefined';
            if (!viz.cymaticsCore.materials[25].uniforms) return 'materials[25].uniforms is undefined';
            
            return {
                uObserver: viz.cymaticsCore.materials[25].uniforms.uObserver.value,
                activeClassId: viz.cymaticsCore.activeClassId
            };
        });
        
        console.log('Result:', result);
        
        if (result.uObserver === 1.0 && result.activeClassId === 25) {
            console.log('SUCCESS! Class 25 Observer toggle works!');
        } else {
            console.error('FAILED. State did not update as expected.');
        }
        
    } catch (e) {
        console.error('Error during test:', e);
    }
    
    await browser.close();
})();
