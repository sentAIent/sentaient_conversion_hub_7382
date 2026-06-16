const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error') {
            console.log('BROWSER ERROR:', msg.text());
        } else if (msg.type() === 'warning') {
            console.log('BROWSER WARNING:', msg.text());
        }
    });

    page.on('pageerror', error => {
        console.log('PAGE EXCEPTION:', error.message);
    });

    try {
        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2', timeout: 10000 });
        console.log("Page loaded successfully.");
        
        // Wait for a bit
        await new Promise(r => setTimeout(r, 2000));
        
        // Check if accordion exists
        const accordionExists = await page.evaluate(() => {
            const el = document.querySelector('.accordion-header');
            return el ? true : false;
        });
        
        console.log("Accordion exists in DOM:", accordionExists);
        
        // Check visible text of the first one
        if (accordionExists) {
            const text = await page.evaluate(() => document.querySelector('.accordion-header').innerText);
            console.log("First accordion text:", text);
        }
        
    } catch (e) {
        console.log("Error loading page:", e.message);
    }
    
    await browser.close();
})();
