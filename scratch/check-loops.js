const fs = require('fs');
const puppeteer = require('puppeteer-core');
const path = require('path');

let code = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

// Inject loop protection
code = code.replace(/while\s*\((.*?)\)\s*\{/g, 'while ($1) { if(!window.__ls) window.__ls = Date.now(); if(Date.now() - window.__ls > 2000) { console.log("HUNG AT WHILE LOOP:", "$1"); throw new Error("LOOP"); }');
code = code.replace(/for\s*\((.*?)\)\s*\{/g, 'for ($1) { if(!window.__ls) window.__ls = Date.now(); if(Date.now() - window.__ls > 2000) { console.log("HUNG AT FOR LOOP:", "$1"); throw new Error("LOOP"); }');

fs.writeFileSync('public/interstellar-game/script-debug.js', code);

let html = fs.readFileSync('public/interstellar-game/index.html', 'utf8');
html = html.replace(/<script type="module" src="script\.js\?.*"><\/script>/, '<script type="module" src="script-debug.js"></script>');
fs.writeFileSync('public/interstellar-game/index-debug.html', html);

(async () => {
    const browser = await puppeteer.launch({
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        headless: "new"
    });
    const page = await browser.newPage();
    
    page.on('console', msg => console.log(`[CONSOLE] ${msg.text()}`));
    page.on('pageerror', err => console.log(`[ERROR] ${err.message}`));
    
    try {
        await page.goto('http://localhost:8083/index-debug.html', { waitUntil: 'load', timeout: 5000 });
    } catch (e) {
        console.log("Goto timeout:", e.message);
    }
    
    await new Promise(r => setTimeout(r, 2000));
    await browser.close();
    process.exit(0);
})();
