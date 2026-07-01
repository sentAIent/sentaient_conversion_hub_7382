const puppeteer = require('puppeteer-core');
const { spawn } = require('child_process');

(async () => {
    const server = spawn('npx', ['http-server', '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game', '-p', '8083']);
    await new Promise(r => setTimeout(r, 2000));

    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: "new"
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error') console.log('PAGE ERROR LOG:', msg.text());
    });
    page.on('pageerror', error => console.log('PAGE UNCAUGHT EXCEPTION:', error.message));
    
    await page.goto('http://127.0.0.1:8083/index.html', { waitUntil: 'networkidle0', timeout: 5000 }).catch(() => {});
    
    const errors = await page.evaluate(async () => {
        const errs = [];
        try {
            // Click start game
            const btn = document.getElementById('startGameBtn');
            if(btn) btn.click();
            else errs.push("No start game btn");
            
            // Wait 2 seconds
            await new Promise(r => setTimeout(r, 2000));
            
            // Check if game started
            if(!window.app.flightMode) errs.push("Flight mode did not start");
            if(window.game) {
                // Let the game run for 1 second
                await new Promise(r => setTimeout(r, 1000));
            } else {
                errs.push("window.game is undefined");
            }
        } catch(e) {
            errs.push("EVAL ERROR: " + e.message);
        }
        return errs;
    });
    
    console.log("Gameplay Check Results:");
    console.log(errors);
    
    await browser.close();
    server.kill();
})();
