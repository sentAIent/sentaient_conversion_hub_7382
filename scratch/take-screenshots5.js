const puppeteer = require('puppeteer');

const wait = (ms) => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:5004', { waitUntil: 'networkidle0' });

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
  
  await page.screenshot({ path: `${artifactsDir}/game-screenshot-music5.png` });
  console.log('Saved music modal screenshot 5');

  await browser.close();
})();
