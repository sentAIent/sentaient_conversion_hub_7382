const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));

  await page.goto('file:///Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/index.html', {waitUntil: 'domcontentloaded'});
  console.log("Page loaded");
  
  await new Promise(r => setTimeout(r, 1000));
  
  try {
      await page.evaluate(() => {
          if(window.app && window.app.openMusicSettings) window.app.openMusicSettings();
          else document.getElementById('musicSettingsModal').style.display='flex';
      });
      await new Promise(r => setTimeout(r, 1000));
      await page.evaluate(() => {
          app.updateBinauralCustom();
          app.setBinauralPreset(1.5, 136.1, document.querySelector('button'));
      });
      console.log("Freq manipulated successfully");
  } catch (e) {
      console.log("Error in evaluate:", e);
  }
  
  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
})();
