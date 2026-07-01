const puppeteer = require('puppeteer-core');
const { spawn } = require('child_process');

(async () => {
    console.log("Starting server...");
    const server = spawn('npx', ['http-server', '/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game', '-p', '8082']);
    
    await new Promise(r => setTimeout(r, 2000));

    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: "new"
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error') console.log('PAGE ERROR LOG:', msg.text());
    });
    
    console.log("Navigating to index.html...");
    await page.goto('http://127.0.0.1:8082/index.html', { waitUntil: 'networkidle0', timeout: 5000 }).catch(e => console.log("Navigation timeout, but continuing"));
    
    console.log("Evaluating tests...");
    const errors = await page.evaluate(() => {
        const errs = [];
        try {
            if (!window.app) errs.push("window.app is undefined");
            if (!window.gameAudio) errs.push("window.gameAudio is undefined");
            
            // Try manipulating the sliders
            window.app.setMasterVolume(0.5);
            window.app.setMusicVolume(0.5);
            
            errs.push("audio volume: " + window.gameAudio.volume);
            errs.push("audio musicVolume: " + window.gameAudio.musicVolume);
            
            if (window.gameAudio.currentStreamingAudio) {
               errs.push("streaming volume: " + window.gameAudio.currentStreamingAudio.volume);
            } else {
               errs.push("No streaming audio object found");
            }
        } catch(e) {
            errs.push("EVAL ERROR: " + e.message);
        }
        return errs;
    });
    
    console.log("Results:");
    console.log(errors);
    
    await browser.close();
    server.kill();
})();
