const puppeteer = require('puppeteer');
const path = require('path');

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });

  const filePath = `file://${path.resolve(__dirname, '../public/interstellar-game/index.html')}`;
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  await wait(2000);

  const artifactsDir = '/Users/ute/.gemini/antigravity/brain/8d8befa4-97c2-4911-ae35-ef3ba46c3d20/artifacts';

  await page.screenshot({ path: `${artifactsDir}/game-screenshot-1.png` });

  await page.evaluate(() => {
    if (window.app) window.app.openMusicSettings();
  });

  await wait(1000);

  await page.screenshot({ path: `${artifactsDir}/game-screenshot-music.png` });

  await page.evaluate(() => {
    if (window.app) window.app.switchMusicTab('classical');
  });

  await wait(500);

  await page.screenshot({ path: `${artifactsDir}/game-screenshot-classical.png` });

  // Let's click the play button for a track
  await page.evaluate(() => {
    if (window.app) window.app.playPlaylist('classical', 0);
  });

  await wait(1000);
  
  await page.screenshot({ path: `${artifactsDir}/game-screenshot-playing.png` });

  await browser.close();
})();
