import puppeteer from 'puppeteer';

(async () => {
    console.log("Starting Headless Audio Test...");
    const browser = await puppeteer.launch({ 
        headless: true,
        args: [
            '--autoplay-policy=no-user-gesture-required',
            '--disable-web-security'
        ]
    });
    
    const page = await browser.newPage();
    
    let errors = 0;
    
    page.on('console', msg => {
        const type = msg.type();
        if (type === 'error' || type === 'warning' || type === 'log') {
            console.log(`[Browser ${type.toUpperCase()}] ${msg.text()}`);
        }
        if (type === 'error') {
            errors++;
        }
    });
    
    page.on('pageerror', err => {
        console.error('[Browser ERROR]', err.toString());
        errors++;
    });

    console.log("Navigating to http://localhost:8080/mindwave.html...");
    await page.goto("http://localhost:8080/mindwave.html", { waitUntil: 'networkidle2' });
    
    console.log("Waiting for initialization...");
    await page.waitForTimeout(2000);
    
    // Simulate user clicking Start (which triggers startAudio)
    console.log("Clicking 'Start Experience' (or triggering audio)...");
    await page.evaluate(async () => {
        // Try clicking the start button if it exists
        const startBtn = document.getElementById('startExperienceBtn') || document.querySelector('button');
        if (startBtn) startBtn.click();
        
        // Let's directly test if AudioContext exists
        if (window.__debugAudioCtx) {
            console.log("AudioContext Found: State = " + window.__debugAudioCtx.state);
        } else {
            console.log("AudioContext NOT found attached to window.__debugAudioCtx.");
        }
    });
    
    await page.waitForTimeout(2000);
    
    console.log("Testing Intent Change (Focus)...");
    await page.evaluate(async () => {
        // Trigger a frequency change
        if (typeof window.applyAIPreset === 'function') {
            window.applyAIPreset({ preset: 'beta', carrier: 432 });
            console.log("Called applyAIPreset(beta)");
        }
    });
    
    await page.waitForTimeout(2000);
    
    console.log("Checking AudioContext status...");
    const audioState = await page.evaluate(() => {
        return window.__debugAudioCtx ? window.__debugAudioCtx.state : 'undefined';
    });
    
    console.log(`Final Audio State: ${audioState}`);
    
    await browser.close();
    
    if (errors > 0 || audioState !== 'running') {
        console.error(`TEST FAILED. Errors: ${errors}, Audio State: ${audioState}`);
        process.exit(1);
    } else {
        console.log("TEST PASSED. Audio engine is running perfectly with zero errors.");
        process.exit(0);
    }
})();
