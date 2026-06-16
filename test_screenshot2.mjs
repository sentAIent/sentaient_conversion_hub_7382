import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    console.log('Navigating...');
    await page.goto('http://localhost:5174/mindwave.html', { waitUntil: 'networkidle2' });
    
    console.log('Hiding popups and overlays...');
    await page.evaluate(() => {
        // Find any overlay/modal/popup elements and hide them
        const selectorsToHide = [
            '#onboarding-modal', 
            '.modal', 
            '.popup', 
            '#email-capture', 
            '#discount-modal', 
            '.overlay',
            '[id*="modal"]',
            '[class*="modal"]',
            '[class*="overlay"]',
            '#cloud-sync-modal'
        ];
        selectorsToHide.forEach(sel => {
            document.querySelectorAll(sel).forEach(el => {
                if (el && el.style) {
                    el.style.display = 'none';
                    el.style.opacity = '0';
                    el.style.pointerEvents = 'none';
                }
            });
        });
    });

    console.log('Waiting for UI...');
    const tabs = await page.$$('button');
    for (let btn of tabs) {
        const text = await page.evaluate(el => el.innerText, btn);
        if (text && text.includes('Cymatics II')) {
            await btn.click();
            break;
        }
    }
    
    await new Promise(r => setTimeout(r, 1000));
    
    const buttons = await page.$$('button');
    for (let btn of buttons) {
        const text = await page.evaluate(el => el.innerText, btn);
        if (text && text.includes('Pixel Nebula')) {
            await btn.click();
            break;
        }
    }
    
    console.log('Waiting for shader...');
    await new Promise(r => setTimeout(r, 3000));
    
    const screenshotPath = '/Users/infinitealpha/.gemini/antigravity/brain/c5e1ae3d-cdf6-490f-8a67-ec4ae66e3a97/test_pixel_nebula.png';
    await page.screenshot({ path: screenshotPath });
    console.log('Saved to', screenshotPath);
    
    await browser.close();
})();
