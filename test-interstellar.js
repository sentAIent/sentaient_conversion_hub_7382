const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.error('PAGE ERROR:', err.toString()));
    
    const url = 'http://localhost:3000/interstellar-game/index.html';
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: 'networkidle0' });
    
    // Wait for engine to initialize
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: 'interstellar_boot.png' });
    console.log('Took boot screenshot.');
    
    // Attempt to click FLY
    const flyButtonX = 80; // Estimated from logs
    const flyButtonY = 60;
    await page.mouse.click(flyButtonX, flyButtonY);
    console.log('Clicked FLY button.');
    
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: 'interstellar_flight.png' });
    console.log('Took flight screenshot.');
    
    // Zoom out
    console.log('Zooming out...');
    for(let i=0; i<10; i++) {
        await page.mouse.wheel({ deltaY: 100 });
        await new Promise(r => setTimeout(r, 100));
    }
    
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({ path: 'interstellar_zoomed_out.png' });
    console.log('Took zoomed out screenshot.');
    
    await browser.close();
    process.exit(0);
})();
