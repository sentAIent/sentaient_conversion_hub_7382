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
  await page.goto(filePath, { waitUntil: 'networkidle0' });
  await wait(2000);

  await page.evaluate(() => {
    const modal = document.getElementById('musicSettingsModal');
    modal.style.setProperty('display', 'flex', 'important');
    modal.style.setProperty('opacity', '1', 'important');
    modal.style.setProperty('visibility', 'visible', 'important');
    
    const rect = modal.getBoundingClientRect();
    console.log("Modal rect:", JSON.stringify(rect));
    
    let el = modal;
    while(el) {
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0') {
            console.log(`HIDDEN PARENT FOUND: <${el.tagName} id="${el.id}" class="${el.className}"> - display: ${style.display}, visibility: ${style.visibility}, opacity: ${style.opacity}`);
        }
        el = el.parentElement;
    }
  });

  await browser.close();
})();
