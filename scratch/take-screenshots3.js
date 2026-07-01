const puppeteer = require('puppeteer');
const path = require('path');

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:5003', { waitUntil: 'networkidle0' });

  await wait(2000);

  const artifactsDir = '/Users/ute/.gemini/antigravity/brain/8d8befa4-97c2-4911-ae35-ef3ba46c3d20/artifacts';

  await page.screenshot({ path: `${artifactsDir}/game-screenshot-real.png` });
  console.log('Saved main game screenshot');

  await page.evaluate(() => {
    document.getElementById('musicSettingsBtn').click();
  });

  await wait(1000);
  
  await page.screenshot({ path: `${artifactsDir}/game-screenshot-music3.png` });
  console.log('Saved music modal screenshot');

  await page.evaluate(() => {
    if (window.app) window.app.switchMusicTab('classical');
  });

  await wait(500);

  await page.screenshot({ path: `${artifactsDir}/game-screenshot-classical.png` });
  console.log('Saved classical modal screenshot');

  await page.evaluate(() => {
    if (window.app) window.app.playPlaylist('classical', 0);
  });

  await wait(1000);
  
  await page.screenshot({ path: `${artifactsDir}/game-screenshot-playing.png` });
  console.log('Saved playing screenshot');

  await browser.close();
})();
