const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER:', msg.text()));

  await page.goto('http://localhost:3000/interstellar-game/index.html', { waitUntil: 'networkidle0' });

  // Wait for initial load
  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

  // Click start game
  console.log("Clicking start game...");
  await page.evaluate(() => {
    const btn = document.querySelector('.btn-start-game');
    if (btn) btn.click();
  });

  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

  console.log("Clicking engage flight...");
  await page.evaluate(() => {
    const btn = document.getElementById('btnEngageFlight');
    if (btn) btn.click();
  });

  await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 1000)));

  // Get deep computed styles
  const visibilityInfo = await page.evaluate(() => {
    const el = document.getElementById('sectionShipStatus');
    if (!el) return { error: 'Element not found' };

    const getStyles = (node) => {
        if (!node || node.nodeType !== 1) return null;
        const style = window.getComputedStyle(node);
        const rect = node.getBoundingClientRect();
        return {
            id: node.id || '(no-id)',
            className: node.className || '(no-class)',
            tag: node.tagName,
            display: style.display,
            visibility: style.visibility,
            opacity: style.opacity,
            zIndex: style.zIndex,
            position: style.position,
            top: style.top,
            left: style.left,
            width: rect.width,
            height: rect.height,
            inlineStyle: node.getAttribute('style')
        };
    };

    const hierarchy = [];
    let current = el;
    while (current && current !== document.body.parentElement) {
        hierarchy.push(getStyles(current));
        current = current.parentElement;
    }

    // Also let's get any other elements overlapping
    return hierarchy;
  });

  console.log(JSON.stringify(visibilityInfo, null, 2));
  
  await browser.close();
})();
