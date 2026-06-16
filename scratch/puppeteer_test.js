const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const errors = [];
  page.on('console', msg => {
    if(msg.type() === 'error') {
        errors.push(`[CONSOLE ERROR] ${msg.text()}`);
    }
  });
  page.on('pageerror', error => {
    errors.push(`[PAGE ERROR] ${error.message}`);
  });

  // Try to wait a reasonable time instead of domcontentloaded if it hangs
  try {
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2', timeout: 5000 });
  } catch(e) {
    // Ignore timeout, we just want the errors
  }
  
  await new Promise(r => setTimeout(r, 2000));
  
  if (errors.length > 0) {
      console.log("ERRORS FOUND:");
      console.log(errors.join("\n"));
  } else {
      console.log("NO ERRORS FOUND");
  }
  
  await browser.close();
})();
