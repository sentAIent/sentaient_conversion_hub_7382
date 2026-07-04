import puppeteer from 'puppeteer';

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    
    const response = await page.goto('http://localhost:5173/', { waitUntil: 'networkidle2' });
    console.log('HTTP STATUS:', response.status());
    
    const html = await page.content();
    if (html.includes('404') || html.includes('Page Not Found')) {
      console.log('Detected 404 text on the page!');
    }
    
    const rootText = await page.evaluate(() => document.body.innerText);
    console.log('BODY TEXT:', rootText.substring(0, 500));
    
    await browser.close();
  } catch (e) {
    console.error('SCRIPT ERROR:', e);
  }
})();
