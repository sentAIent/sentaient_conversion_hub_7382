const puppeteer = require('puppeteer');

(async () => {
    console.log("Launching puppeteer...");
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Log console
    page.on('console', msg => console.log(`[PAGE LOG] ${msg.text()}`));

    const client = await page.target().createCDPSession();
    await client.send('Debugger.enable');

    // Listen for pause
    client.on('Debugger.paused', async (params) => {
        console.log("\n\n==== DEBUGGER PAUSED ====");
        const frames = params.callFrames;
        console.log(`Paused at ${frames[0].url}:${frames[0].location.lineNumber}`);
        for (let i = 0; i < Math.min(frames.length, 5); i++) {
            console.log(`  Frame ${i}: ${frames[i].functionName || '<anonymous>'} at line ${frames[i].location.lineNumber}`);
        }
        
        await browser.close();
        process.exit(0);
    });

    console.log("Navigating to page...");
    // Don't wait for load since it freezes
    page.goto('http://localhost:8083/index.html').catch(e => {});

    console.log("Waiting 3 seconds to let it freeze...");
    await new Promise(r => setTimeout(r, 3000));

    console.log("Sending Debugger.pause...");
    await client.send('Debugger.pause');
})();
