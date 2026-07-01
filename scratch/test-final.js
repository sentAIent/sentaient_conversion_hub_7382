const puppeteer = require('puppeteer');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.error('[Browser Error]', msg.text());
        } else if (!msg.text().includes('Failed to load resource')) {
            console.log('[Browser]', msg.text());
        }
    });

    page.on('pageerror', err => {
        console.error('[Page Error Exception]', err.toString());
    });

    console.log('Loading page...');
    await page.goto('http://localhost:8080/interstellar-game/', { waitUntil: 'domcontentloaded' });
    
    console.log('Wait 2s for UI to build...');
    await new Promise(r => setTimeout(r, 2000));

    console.log('Evaluating game state...');
    const state = await page.evaluate(() => {
        return {
            hasApp: typeof app !== 'undefined',
            activeStyles: typeof app !== 'undefined' ? Array.from(app.activeStyles) : null
        };
    });
    console.log('State:', state);

    console.log('Clicking Deep Space...');
    await page.evaluate(() => {
        const btn = document.querySelector('.bg-toggle[data-style="deep-space"]');
        if (btn) btn.click();
    });
    
    console.log(`Click done. Waiting 2s for render...`);
    await new Promise(r => setTimeout(r, 2000));
    
    const fps = await page.evaluate(() => {
        return new Promise(resolve => {
            let frames = 0;
            let start = performance.now();
            function loop() {
                frames++;
                if (performance.now() - start > 1000) {
                    resolve(frames);
                } else {
                    requestAnimationFrame(loop);
                }
            }
            requestAnimationFrame(loop);
        });
    });
    console.log('FPS after Deep Space:', fps);
    
    await browser.close();
})();
