const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ 
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'] 
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

  const url = 'file://' + require('path').resolve('./interstellar-game/index.html');
  await page.goto(url, { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    if (window.game && window.game.showShipModal) {
      window.game.showShipModal();
    } else if (window.app && window.app.showShipModal) {
      window.app.showShipModal();
    }
  });

  await new Promise(r => setTimeout(r, 1000));

  const rects = await page.evaluate(() => {
    const specs = document.getElementById('specs-interceptor');
    const wall = document.querySelector('.wall-back');
    const dockingBay = document.querySelector('.docking-bay');
    
    return {
        specs: specs ? {
            rect: specs.getBoundingClientRect(),
            display: window.getComputedStyle(specs).display,
            visibility: window.getComputedStyle(specs).visibility,
            opacity: window.getComputedStyle(specs).opacity,
            zIndex: window.getComputedStyle(specs).zIndex
        } : null,
        wall: wall ? {
            rect: wall.getBoundingClientRect(),
            display: window.getComputedStyle(wall).display,
            visibility: window.getComputedStyle(wall).visibility,
            opacity: window.getComputedStyle(wall).opacity,
            zIndex: window.getComputedStyle(wall).zIndex
        } : null,
        dockingBay: dockingBay ? {
            rect: dockingBay.getBoundingClientRect(),
            display: window.getComputedStyle(dockingBay).display,
            visibility: window.getComputedStyle(dockingBay).visibility,
            opacity: window.getComputedStyle(dockingBay).opacity,
            zIndex: window.getComputedStyle(dockingBay).zIndex
        } : null,
        html: specs ? specs.outerHTML : null
    };
  });
  
  console.log("=== RESULTS ===");
  console.log(JSON.stringify(rects, null, 2));
  
  await browser.close();
})();
