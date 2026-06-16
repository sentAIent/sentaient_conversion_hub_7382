const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ 
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    
    // Go to mindwave
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle0' });
    
    // Switch to cymatics tab to open the sidebar
    await page.evaluate(() => {
        if(window.switchRightTab) window.switchRightTab('cymatics');
    });
    
    // Wait for the UI to be visible
    await new Promise(r => setTimeout(r, 2000));
    
    // Expand the "Class 25" accordion
    await page.evaluate(() => {
        const headers = document.querySelectorAll('.accordion-header');
        headers.forEach(h => {
            if(h.innerText.includes('CLASS 25')) {
                h.click();
            }
        });
    });
    
    await new Promise(r => setTimeout(r, 500));
    
    await page.screenshot({ path: 'artifacts/ultimate_ui_preview.png' });
    await browser.close();
    console.log("Screenshot saved as ultimate_ui_preview.png");
})();
