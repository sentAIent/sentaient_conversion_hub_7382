const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--window-size=1400,900'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900 });
  const errors = [];
  page.on('pageerror', err => errors.push('PAGE ERROR: ' + err.message));
  
  await page.goto('http://localhost:5173/interstellar-game/', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));
  
  // Click hangar button using mouse coordinates
  const hangarBtn = await page.$('[id="hangarBtn"]');
  if (hangarBtn) {
    await hangarBtn.click();
    console.log('Hangar button clicked via mouse coordinates');
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  // Find the select button and click it via mouse coordinates
  const selectBtns = await page.$$('.select-ship-btn');
  if (selectBtns.length > 0) {
    const box = await selectBtns[0].boundingBox();
    if (box) {
      console.log('Select button box:', JSON.stringify(box));
      await page.mouse.click(box.x + box.width/2, box.y + box.height/2);
      console.log('Clicked select button at coordinates');
    } else {
      console.log('Select button has no bounding box (not visible)');
    }
  } else {
    console.log('No select buttons found');
  }
  
  await new Promise(r => setTimeout(r, 1000));
  
  // Check if hangar closed
  const hangarDisplay = await page.evaluate(() => {
    const m = document.getElementById('shipModal');
    return m ? m.style.display : 'not found';
  });
  console.log('Hangar display after click:', hangarDisplay);
  
  // Check for toast
  const toast = await page.evaluate(() => {
    const t = document.getElementById('toast');
    return t ? { text: t.textContent, opacity: getComputedStyle(t).opacity } : 'no toast';
  });
  console.log('Toast:', JSON.stringify(toast));
  
  console.log('Errors:', JSON.stringify(errors.slice(0, 5)));
  await browser.close();
})();
