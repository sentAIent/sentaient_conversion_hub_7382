const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const html = fs.readFileSync('public/interstellar-game/index.html', 'utf8');

const dom = new JSDOM(html, {
    url: "http://127.0.0.1:8081/index.html",
    runScripts: "dangerously",
    resources: "usable",
    pretendToBeVisual: true
});
dom.window.console = console;

console.log("JSDOM running...");

// Force timeout to avoid running forever
setTimeout(() => {
    console.log("Test finished.");
    process.exit(0);
}, 5000);
