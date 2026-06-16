const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error' || msg.text().includes('Cymatics') || msg.text().includes('Viz') || msg.text().includes('CYMATIC')) {
            console.log(`[BROWSER LOG] ${msg.type().toUpperCase()}: ${msg.text()}`);
        }
    });

    page.on('pageerror', err => {
        console.log(`[PAGE ERROR] ${err.toString()}`);
    });

    console.log("Navigating to http://localhost:5173/mindwave.html");
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(e => console.log(e));

    console.log("Waiting for visualizerReady...");
    await page.evaluate(() => {
        return new Promise(resolve => {
            if (window.VIZ_READY_DISPATCHED) resolve();
            else window.addEventListener('visualizerReady', resolve, {once: true});
            setTimeout(resolve, 15000); // 15s timeout
        });
    });

    console.log("Evaluating window.getVisualizer...");
    const vizCheck = await page.evaluate(() => {
        const viz = window.getVisualizer ? window.getVisualizer() : null;
        if (!viz) return "NO VIZ";
        
        return {
            hasCymaticsCore: !!viz.cymaticsCore,
            hasApplyMethod: typeof viz.applyCymaticClassAndVariation === 'function',
            cymaticPatternsArrayLength: viz.constructor.CYMATIC_PATTERNS ? viz.constructor.CYMATIC_PATTERNS.length : 'MISSING'
        };
    });
    console.log("Viz Check:", vizCheck);
    
    await browser.close();
})();
