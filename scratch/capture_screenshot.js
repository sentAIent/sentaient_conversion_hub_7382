const puppeteer = require('puppeteer');
const path = require('path');

async function run() {
    console.log('[Puppeteer] Launching headless browser...');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    const url = 'http://localhost:5173/mindwave.html';
    console.log(`[Puppeteer] Navigating to ${url}...`);
    
    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        console.log('[Puppeteer] Page loaded. Waiting 8 seconds for visualizer initialization...');
        await new Promise(resolve => setTimeout(resolve, 8000));
        
        // --- SCREENSHOT 1: SAND PLATE SRI YANTRA (Realistic sand grit nodes) ---
        console.log('[Puppeteer] Triggering Sand Medium and Sri Yantra Pattern...');
        await page.evaluate(() => {
            if (window.setCymaticMedium) {
                window.setCymaticMedium(1); // Set to Sand (SiO2)
            }
            if (window.selectCymaticPattern) {
                window.selectCymaticPattern(0); // Sri Yantra (Index 0)
            }
        });
        
        console.log('[Puppeteer] Sand plate activated. Waiting 5 seconds for simulation to stabilize...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        const path1 = '/Users/infinitealpha/.gemini/antigravity/brain/c5e1ae3d-cdf6-490f-8a67-ec4ae66e3a97/sand_plate_sri_yantra.png';
        console.log(`[Puppeteer] Capturing screenshot 1 to: ${path1}...`);
        await page.screenshot({ path: path1 });
        console.log('[Puppeteer] Screenshot 1 captured!');
        
        // --- SCREENSHOT 2: ADVANCED AETHERIC WEAVER ---
        console.log('[Puppeteer] Triggering Aetheric Weaver (Index 30) on Sand Medium...');
        await page.evaluate(() => {
            if (window.selectCymaticPattern) {
                window.selectCymaticPattern(30); // Aetheric Weaver (Index 30)
            }
        });
        
        console.log('[Puppeteer] Advanced Aetheric Weaver activated. Waiting 5 seconds...');
        await new Promise(resolve => setTimeout(resolve, 5000));
        
        const path2 = '/Users/infinitealpha/.gemini/antigravity/brain/c5e1ae3d-cdf6-490f-8a67-ec4ae66e3a97/advanced_aetheric_weaver.png';
        console.log(`[Puppeteer] Capturing screenshot 2 to: ${path2}...`);
        await page.screenshot({ path: path2 });
        console.log('[Puppeteer] Screenshot 2 captured!');
        
    } catch (err) {
        console.error('[Puppeteer] Error occurred:', err);
    } finally {
        console.log('[Puppeteer] Closing browser...');
        await browser.close();
        console.log('[Puppeteer] Completed!');
    }
}

run();
