const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: "new"
    });
    const page = await browser.newPage();
    
    page.on('console', msg => {
        if (msg.type() === 'error') console.log('PAGE ERROR LOG:', msg.text());
        else console.log('PAGE LOG:', msg.text());
    });
    page.on('pageerror', error => console.log('PAGE UNCAUGHT EXCEPTION:', error.message));
    
    console.log("Navigating to index.html...");
    await page.goto('file:///Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/index.html', { waitUntil: 'networkidle0', timeout: 5000 }).catch(e => console.log("Navigation timeout, but continuing"));
    
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
})();
