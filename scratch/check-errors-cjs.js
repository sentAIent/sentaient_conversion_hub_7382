const { JSDOM } = require('jsdom');
const fs = require('fs');

const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
        <canvas id="gameCanvas"></canvas>
        <div id="toastContainer"></div>
        <input id="starColor1" value="#ffffff">
        <input id="starColor2" value="#aaddff">
        <input id="starColor3" value="#ffddaa">
    </body>
    </html>
`, { url: "http://localhost" });

global.window = dom.window;
global.document = dom.window.document;
global.localStorage = { getItem: () => null, setItem: () => null, removeItem: () => null };
global.AudioContext = class { createGain() { return { connect: () => {}, gain: { value: 1 } }; } };
global.performance = { now: () => Date.now() };
global.requestAnimationFrame = (cb) => {}; // disable loop

// Capture console errors
const errors = [];
console.error = (...args) => {
    errors.push(args.join(' '));
};
console.warn = (...args) => {};
console.log = (...args) => {};

const scriptContent = fs.readFileSync('/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/script.js', 'utf8');

// Strip out imports and DOMContentLoaded
let modifiedScript = scriptContent.replace("document.addEventListener('DOMContentLoaded'", "// document...");
modifiedScript = modifiedScript.replace(/import\s.*?;/g, '');

try {
    eval(modifiedScript);
    const app = new InterstellarEngine();
    app.init();
    app.startGame();
    
    // Simulate events
    app.fireBullet();
    app.launchMissile();
    app.toggleFlightMode();
    app.generateSingleStyle('alien');
    app.generateSingleStyle('cyber');
    app.generateSingleStyle('nebula');
    app.generateSingleStyle('deep-space');
    
    // Run update 100 times to catch runtime errors
    for (let i = 0; i < 100; i++) {
        app.update(16);
    }
    
    if (errors.length > 0) {
        console.info("RUNTIME ERRORS FOUND:");
        errors.forEach(e => console.info("-", e));
    } else {
        console.info("NO RUNTIME ERRORS.");
    }
    
} catch (e) {
    console.info("FATAL EXCEPTION:");
    console.info(e.stack);
}
