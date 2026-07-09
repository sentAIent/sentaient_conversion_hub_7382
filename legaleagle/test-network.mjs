import puppeteer from 'puppeteer';
(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  page.on('requestfailed', request => {
    console.log('FAILED REQUEST:', request.url(), request.failure().errorText);
  });
  
  await page.goto('http://localhost:4176/legaleagle/');
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
