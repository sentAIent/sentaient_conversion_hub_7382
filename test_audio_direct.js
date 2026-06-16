const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  // Collect console messages
  page.on('console', msg => {
    console.log(`[Browser Console ${msg.type()}] ${msg.text()}`);
  });
  
  await page.goto('http://127.0.0.1:8080/mindwave.html', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);
  
  // Close the intent survey modal if it exists
  await page.evaluate(() => {
     const intentModal = document.getElementById('intentSurveyModal');
     if(intentModal) intentModal.style.display = 'none';
     const disclaimerModal = document.getElementById('disclaimerModal');
     if(disclaimerModal) { disclaimerModal.style.display = 'none'; window.controls.state.disclaimerAccepted = true; }
  });
  
  // Direct test of audio API
  await page.evaluate(async () => {
     console.log("Forcing audio start...");
     if(window.controls && window.controls.handlePlayClick) {
         await window.controls.handlePlayClick();
     } else if (window.handlePlayClick) {
         await window.handlePlayClick();
     } else {
         const playBtn = document.getElementById('playBtn');
         if(playBtn) playBtn.click();
     }
  });
  
  await page.waitForTimeout(3000);
  await browser.close();
})();
