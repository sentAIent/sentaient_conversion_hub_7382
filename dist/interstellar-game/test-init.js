const puppeteer = require('/Users/ute/.gemini/antigravity/brain/8d8befa4-97c2-4911-ae35-ef3ba46c3d20/scratch/node_modules/puppeteer');

(async () => {
    console.log("Launching Puppeteer...");
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
    });

    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    
    console.log("Navigating to http://localhost:8081/index.html...");
    
    try {
        await page.goto('http://localhost:8081/index.html', { waitUntil: 'domcontentloaded', timeout: 5000 });
        console.log("Navigation complete!");
        
        // Wait for the prompt to become visible (Systems Online)
        console.log("Waiting for loading to complete...");
        await page.waitForFunction(() => {
            const prompt = document.getElementById('loadingPrompt');
            return prompt && prompt.style.opacity === '1';
        }, { timeout: 10000 });
        console.log("Loading complete. Clicking prompt...");
        
        await page.click('#loadingPrompt');
        
        await page.waitForTimeout(2000); // Wait for fade out
        
        console.log("Checking if engine is active...");
        const isActive = await page.evaluate(() => {
            return window.game && typeof window.game.animate === 'function';
        });
        
        console.log("Is engine active?", isActive);
        
    } catch (e) {
        console.error("Error during execution:", e);
    } finally {
        await browser.close();
    }
})();
