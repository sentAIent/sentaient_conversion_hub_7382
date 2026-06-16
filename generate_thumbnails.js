const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const classes = [
    { id: 'c1', count: 14 },
    { id: 'c2', count: 12 },
    { id: 'c3', count: 10 },
    { id: 'c4', count: 8 }
];

const outDir = path.join(__dirname, 'binaural-assets', 'images', 'cymatics');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

(async () => {
    console.log('[Puppeteer] Launching headless browser...');
    const browser = await puppeteer.launch({ 
        headless: "new",
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    
    await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });
    
    console.log('[Puppeteer] Navigating to local Vite dev server...');
    await page.goto('http://127.0.0.1:5173', { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    await page.evaluate(() => {
        const ui = document.getElementById('uiOverlay');
        if (ui) ui.style.display = 'none';
        if(window.MindWaveState) {
            window.MindWaveState.autoRotate = false;
        }
    });

    await new Promise(r => setTimeout(r, 2000));

    console.log('[Puppeteer] Beginning 44 WebGL screenshot captures...');

    for (let c of classes) {
        for (let i = 0; i < c.count; i++) {
            const patternId = c.id + "_" + i;
            
            await page.evaluate((id) => {
                if (window.setCymaticPattern) window.setCymaticPattern(id);
                if (window.setCymaticColor) {
                    window.setCymaticColor(1, '#ff0055');
                    window.setCymaticColor(2, '#00ffff');
                    window.setCymaticColor(3, '#ff00ff');
                }
            }, patternId);
            
            await new Promise(r => setTimeout(r, 1000));
            
            const outPath = path.join(outDir, patternId + '_thumb.png');
            await page.screenshot({ path: outPath });
            console.log('[Puppeteer] Saved ' + patternId + '_thumb.png');
        }
    }

    console.log('[Puppeteer] All 44 thumbnails generated successfully.');
    await browser.close();
    process.exit(0);
})();
