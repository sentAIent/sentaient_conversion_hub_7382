const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

  await page.goto('file:///Users/infinitealpha/Dev/BinauralBeats/v7_restore/mindwave.html');
  
  // Set disclaimer accepted
  await page.evaluate(() => {
    localStorage.setItem('mindwave_disclaimer_accepted', 'true');
  });
  
  // Reload to apply localStorage
  await page.reload();

  console.log("Waiting for playBtn...");
  await page.waitForSelector('#playBtn', { state: 'visible' });

  console.log("Clicking playBtn...");
  await page.click('#playBtn');

  // Wait 2 seconds to see what happens in console
  await page.waitForTimeout(2000);

  // Check state
  const isAudioPlaying = await page.evaluate(() => {
    return window.isAudioPlaying ? window.isAudioPlaying() : false;
  });
  console.log("isAudioPlaying:", isAudioPlaying);

  await browser.close();
})();
