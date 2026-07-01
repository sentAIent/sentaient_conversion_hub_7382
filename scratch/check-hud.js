const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.goto('http://localhost:3000/interstellar-game/index.html');
  
  // Start the game
  await page.click('#btnExplore');
  await page.waitForTimeout(1000);
  
  // Click Flight Mode
  await page.evaluate(() => {
    const btn = document.getElementById('btnFlightMode');
    if (btn) btn.click();
  });
  
  await page.waitForTimeout(1000);
  
  const status = await page.evaluate(() => {
    const el = document.getElementById('sectionShipStatus');
    if (!el) return 'Not found';
    
    const computed = window.getComputedStyle(el);
    const parent = el.parentElement;
    const parentComputed = window.getComputedStyle(parent);
    const splashActive = document.body.classList.contains('splash-active');
    
    return {
      id: el.id,
      display: computed.display,
      visibility: computed.visibility,
      opacity: computed.opacity,
      width: computed.width,
      height: computed.height,
      top: computed.top,
      left: computed.left,
      classes: el.className,
      style: el.getAttribute('style'),
      parentDisplay: parentComputed.display,
      parentClasses: parent.className,
      splashActive: splashActive
    };
  });
  
  console.log(JSON.stringify(status, null, 2));
  await browser.close();
})();
