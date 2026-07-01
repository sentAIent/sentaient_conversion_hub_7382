const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));
  await page.goto('http://127.0.0.1:8081/index.html');
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => {
      if(window.app && window.app.openMusicSettings) window.app.openMusicSettings();
      else document.getElementById('musicSettingsModal').style.display='flex';
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => {
      document.getElementById('masterVolumeSlider').value = 0.5;
      document.getElementById('masterVolumeSlider').dispatchEvent(new Event('input'));
  });
  console.log("Done");
  await browser.close();
})();
