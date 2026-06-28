const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto('http://localhost:3000/interstellar.html', { waitUntil: 'networkidle2' });
    // wait for loader to disappear (it takes 1.5s)
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'scratch/after-load.png' });
    
    // see if there is any visible overlay
    const overlays = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('div'))
            .filter(d => d.style.display !== 'none' && d.style.opacity !== '0')
            .map(d => ({id: d.id, class: d.className, text: d.innerText.substring(0, 50).replace(/\n/g, ' ')}));
    });
    console.log("Visible elements:", overlays.filter(o => o.id || o.class.includes('modal')));
    
    await browser.close();
})();
