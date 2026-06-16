const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    
    await page.goto('http://localhost:5173/mindwave.html');
    
    // wait for visualizer load
    await new Promise(r => setTimeout(r, 2000));
    
    console.log("Calling window.setCymaticPattern(25, 0)...");
    await page.evaluate(() => {
        window.setCymaticPattern(25, 0);
    });
    
    await new Promise(r => setTimeout(r, 1000));
    
    const vizState = await page.evaluate(() => {
        if (!window.viz3D || !window.viz3D.cymaticsCore) return "NO_VIZ";
        const isCymaticsActive = window.viz3D.activeModes.has('cymatics');
        const activeClass = window.viz3D.cymaticsCore.activeClassId;
        const groupVisible = window.viz3D.cymaticsGroup.visible;
        const shaderCompiled = !!window.viz3D.cymaticsCore.materials[25].program;
        
        return { isCymaticsActive, activeClass, groupVisible, shaderCompiled };
    });
    
    console.log("Viz State:", JSON.stringify(vizState, null, 2));
    
    await browser.close();
})();
