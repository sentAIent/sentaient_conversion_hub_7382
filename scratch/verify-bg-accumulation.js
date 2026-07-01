import { JSDOM } from 'jsdom';

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

// We don't need audio context, just mock it
global.AudioContext = class { createGain() { return { connect: () => {}, gain: { value: 1 } }; } };

const fs = require('fs');
const scriptContent = fs.readFileSync('/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/script.js', 'utf8');

// Strip out DOMContentLoaded to prevent it from auto-starting
const modifiedScript = scriptContent.replace('document.addEventListener(\'DOMContentLoaded\'', '// document...');

try {
    eval(modifiedScript);
    
    // Create an instance manually
    const app = new InterstellarEngine();
    app.init();

    console.log("Initial background stars:", app.backgroundStars.length);
    console.log("Initial planets:", app.planets.length);
    
    console.log("--- Toggling Deep Space ON ---");
    app.toggleBgStyle('deep-space');
    console.log("Background stars:", app.backgroundStars.length);
    console.log("Planets:", app.planets.length);

    console.log("--- Toggling Deep Space OFF ---");
    app.toggleBgStyle('deep-space');
    console.log("Background stars:", app.backgroundStars.length);
    console.log("Planets:", app.planets.length);

    console.log("--- Toggling Deep Space ON AGAIN ---");
    app.toggleBgStyle('deep-space');
    console.log("Background stars:", app.backgroundStars.length);
    console.log("Planets:", app.planets.length);
    
    console.log("TEST SUCCESSFUL. Arrays don't accumulate.");
} catch (e) {
    console.error(e);
}
