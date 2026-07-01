const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Navigate to local file
  const filePath = 'file://' + path.resolve('../public/interstellar-game/index.html');
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  
  // Wait a bit for initialization
  await page.evaluate(() => new Promise(r => setTimeout(r, 1000)));

  // Force flight mode to trigger toggleFlightMode
  await page.evaluate(() => {
    // try to call toggleFlightMode directly or simulate click
    document.body.classList.remove('splash-active');
    if (typeof window.toggleFlightMode === 'function') {
      window.toggleFlightMode();
    } else {
      // Simulate click on start button
      const startBtn = document.getElementById('startGameBtn');
      if (startBtn) startBtn.click();
    }
  });

  await page.evaluate(() => new Promise(r => setTimeout(r, 1000)));

  // Check visibility of #sectionShipStatus and its ancestors
  const info = await page.evaluate(() => {
    const el = document.getElementById('sectionShipStatus');
    if (!el) return { error: 'Element not found' };
    
    let current = el;
    const pathInfo = [];
    while (current && current.tagName) {
      const style = window.getComputedStyle(current);
      pathInfo.push({
        tag: current.tagName.toLowerCase(),
        id: current.id,
        className: current.className,
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity
      });
      current = current.parentElement;
    }
    
    // Also check body classes
    const bodyClasses = document.body.className;
    
    // Check elements that contain health and shield
    const bars = Array.from(document.querySelectorAll('#sectionShipStatus .bar-fill, #sectionShipStatus .status-item')).map(b => ({
      className: b.className,
      id: b.id,
      display: window.getComputedStyle(b).display
    }));

    return { pathInfo, bodyClasses, bars };
  });

  console.log(JSON.stringify(info, null, 2));

  await browser.close();
})();
