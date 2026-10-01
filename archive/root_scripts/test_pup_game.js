const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({ 
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new', 
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--allow-file-access-from-files'] 
  });
  const page = await browser.newPage();
  
  page.on('console', msg => {
      console.log('PAGE LOG:', msg.type(), msg.text());
  });
  page.on('pageerror', err => {
      console.log('PAGE ERROR:', err.message);
  });
  page.on('requestfailed', request => {
      console.log('PAGE REQUEST FAILED:', request.url(), request.failure().errorText);
  });

  const errors = [];
  page.on('response', response => {
      if (!response.ok()) {
          errors.push(`Response error: ${response.status()} ${response.url()}`);
      }
  });
  page.on('pageerror', err => errors.push(err.message));

  await page.goto('http://localhost:5173/interstellar-game/index.html', { waitUntil: 'networkidle0' });

  // Wait a bit
  await new Promise(r => setTimeout(r, 2000));

  const splashVisibleBefore = await page.evaluate(() => {
    const splash = document.getElementById('loadingScreen');
    return splash ? window.getComputedStyle(splash).opacity : 'null';
  });

  // Click the prompt to dismiss splash
  await page.evaluate(() => {
      const prompt = document.getElementById('loadingPrompt');
      if (prompt) prompt.click();
  });

  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
      const flyBtn = document.querySelector('button[onclick*="toggleFlightMode"]');
      if (flyBtn) flyBtn.click();
  });

  await new Promise(r => setTimeout(r, 5000));
  await page.screenshot({ path: 'game-screenshot-flight-5s.png' });

  const enemies = await page.evaluate(() => {
      if (!window.app || !window.app.enemyShips) return [];
      return window.app.enemyShips.map(e => e.type);
  });

  const splashVisibleAfter = await page.evaluate(() => {
    const splash = document.getElementById('loadingScreen');
    return splash ? window.getComputedStyle(splash).opacity : 'null';
  });

  const hudRects = await page.evaluate(() => {
      const getRect = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {x: r.x, y: r.y, width: r.width, height: r.height, display: window.getComputedStyle(el).display};
      };
      return {
          vitals: getRect(document.getElementById('sectionVitals')),
          controls: getRect(document.getElementById('sectionControls')),
          leftCol: getRect(document.querySelector('.hud-left')),
          rightCol: getRect(document.querySelector('.hud-right'))
      }
  });

  console.log(JSON.stringify({
      errors,
      enemies,
      splashVisibleBefore,
      splashVisibleAfter,
      hudRects
  }, null, 2));

  await browser.close();
})();
