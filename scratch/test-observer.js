const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    
    await page.goto('http://localhost:5173/mindwave.html');
    
    // Wait for viz3D
    await page.waitForFunction(() => window.viz3D && window.viz3D.cymaticsCore);
    console.log('Visualizer initialized!');
    
    // Click the observer toggle
    await page.evaluate(() => {
        const toggle = document.getElementById('observerToggle');
        toggle.click();
    });
    
    console.log('Clicked toggle.');
    
    // Check values
    await page.waitForTimeout(500); // Let animation run a bit
    
    const value = await page.evaluate(() => {
        return window.viz3D.cymaticsCore.materials[25].uniforms.uObserver.value;
    });
    
    console.log('uObserver value after 500ms:', value);
    
    await page.waitForTimeout(1000); // Wait more
    
    const value2 = await page.evaluate(() => {
        return window.viz3D.cymaticsCore.materials[25].uniforms.uObserver.value;
    });
    
    console.log('uObserver value after 1500ms:', value2);
    
    await browser.close();
})();
