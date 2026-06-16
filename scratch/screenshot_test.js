const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle0' });
    
    // Wait for visuals to render a few frames
    await new Promise(r => setTimeout(r, 3000));
    
    await page.screenshot({ path: '/Users/infinitealpha/.gemini/antigravity/brain/6c8de517-fd99-47cc-9f9c-e3ef0196ab0f/artifacts/visual_state.png' });
    await browser.close();
    console.log("Screenshot saved.");
})();
