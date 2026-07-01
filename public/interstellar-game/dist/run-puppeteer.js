const puppeteer = require('/Users/ute/.gemini/antigravity/brain/8d8befa4-97c2-4911-ae35-ef3ba46c3d20/scratch/node_modules/puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
    
    await page.goto('file://' + __dirname + '/index.html');
    
    // Wait for a bit
    await new Promise(r => setTimeout(r, 2000));
    
    await browser.close();
})();
