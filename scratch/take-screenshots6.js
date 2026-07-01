const puppeteer = require('puppeteer');
const path = require('path');

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
        '--no-sandbox', 
        '--disable-setuid-sandbox', 
        '--autoplay-policy=no-user-gesture-required',
        '--allow-file-access-from-files'
    ]
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.setViewport({ width: 1280, height: 800 });

  const filePath = 'file://' + path.resolve('/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/index.html');
  console.log("Loading", filePath);
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  await wait(2000);

  const artifactsDir = '/Users/ute/.gemini/antigravity/brain/8d8befa4-97c2-4911-ae35-ef3ba46c3d20/artifacts';

  await page.evaluate(() => {
    console.log("window.app exists?", !!window.app);
    if (window.app) {
        window.app.openMusicSettings();
    } else {
        document.getElementById('musicSettingsModal').style.setProperty('display','flex','important');
    }
  });

  await wait(1000);
  
  await page.screenshot({ path: `${artifactsDir}/game-screenshot-music6.png` });
  console.log('Saved music modal screenshot 6');

  await browser.close();
})();
