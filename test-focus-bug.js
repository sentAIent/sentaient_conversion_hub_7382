const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    page.on('console', msg => {
        if (msg.text().includes('[Controls]') || msg.text().includes('[Matrix]') || msg.text().includes('[Cyber]') || msg.text().includes('[Visualizer]')) {
            console.log('BROWSER LOG:', msg.text());
        }
    });

    console.log('Navigating to page...');
    await page.goto('http://localhost:5173/mindwave-official.html', { waitUntil: 'load' });

    console.log('Waiting for visualizer ready...');
    await new Promise(r => setTimeout(r, 2000));

    console.log('Clicking MW button...');
    await page.click('#matrixModeMindwave');
    await new Promise(r => setTimeout(r, 500));

    console.log('Typing ZEPHYR in text input but not clicking TXT...');
    const input = await page.$('#matrixTextInput');
    // First, clear input if needed
    await page.evaluate(() => document.getElementById('matrixTextInput').value = '');
    await input.type('ZEPHYR');

    await new Promise(r => setTimeout(r, 500));

    console.log('Clicking MW button again to reset mode...');
    await page.click('#matrixModeMindwave');
    await new Promise(r => setTimeout(r, 500));

    console.log('Clicking text input to trigger focus event...');
    await page.click('#matrixTextInput');
    await new Promise(r => setTimeout(r, 1000));

    // Verify what the visualizer mode is
    const mode = await page.evaluate(() => {
        const viz = window.viz3D || (window.MindWave && window.MindWave.visualizer);
        return {
            mode: viz.matrixLogicMode,
            text: viz.matrixCustomText
        };
    });
    console.log('Visualizer final state:', mode);

    await browser.close();
})();
