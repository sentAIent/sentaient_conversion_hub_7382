const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('BROWSER:', msg.text()));
    page.on('pageerror', err => console.log('ERROR:', err.message));
    
    // assuming local server is running on port 3000 or similar? 
    // Wait, the task says Vite server is running at what URL?
    // In background tasks: "description": "npm run dev", "logUri": "...task-12555.log"
    await page.goto('http://localhost:5173/interstellar-game/index.html');
    await new Promise(r => setTimeout(r, 2000));
    await browser.close();
})();
