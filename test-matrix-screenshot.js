const puppeteer = require('puppeteer');

(async () => {
    try {
        console.log('Launching browser...');
        // Add args to bypass GPU if needed but normally we want WebGL for ThreeJS
        const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox', '--use-gl=swiftshader'] });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 720 });

        page.on('console', msg => console.log('[BROWSER CONSOLE]', msg.text()));
        page.on('pageerror', err => console.error('[BROWSER EXCEPTION]', err.message));

        console.log('Navigating to http://127.0.0.1:5173/mindwave.html ...');
        await page.goto('http://127.0.0.1:5173/mindwave.html', { waitUntil: 'networkidle2' });

        console.log('Waiting for load...');
        await new Promise(r => setTimeout(r, 2000));

        console.log('Clicking Matrix btn...');
        await page.evaluate(() => {
            const btn = document.getElementById('matrixBtn');
            if (btn) btn.click();
            else console.log('Could not find matrixBtn in DOM');
        });

        console.log('Waiting 2 seconds for visual load...');
        await new Promise(r => setTimeout(r, 2000));

        console.log('Taking screenshot...');
        await page.screenshot({ path: '/tmp/matrix-test.png' });

        await browser.close();
        console.log('Done, screenshot at /tmp/matrix-test.png');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
})();
