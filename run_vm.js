const fs = require('fs');
const vm = require('vm');

const codeRaw = fs.readFileSync('public/interstellar-game/script.js', 'utf8');
const lines = codeRaw.split('\n').filter(line => !line.includes("import { AudioEngine }") && !line.includes("import * as Utils"));
const code = 'const Utils = {}; const AudioEngine = class { init() {} updateEngineHum() {} setMusicVolume() {} }; window.gameAudio = new AudioEngine();\n' + lines.join('\n').replace(/export\s+/g, '');

const sandbox = {
    window: {
        gameAudio: { init: () => {}, updateEngineHum: () => {}, setMusicVolume: () => {} },
        parent: { postMessage: () => {} },
        addEventListener: () => {},
        requestAnimationFrame: () => {}
    },
    document: {
        getElementById: () => ({ getContext: () => ({ setTransform: () => {}, fillRect: () => {}, clearRect: () => {}, save: () => {}, restore: () => {}, beginPath: () => {}, moveTo: () => {}, lineTo: () => {}, stroke: () => {}, fill: () => {}, closePath: () => {} }), addEventListener: () => {}, style: {}, classList: { add: () => {}, remove: () => {}, contains: () => false }, value: '', querySelector: () => ({ style: {}, classList: { add: () => {}, remove: () => {}, contains: () => false }, innerHTML: '', value: '', addEventListener: () => {} }) }),
        createElement: () => ({ getContext: () => ({ setTransform: () => {}, fillRect: () => {}, clearRect: () => {}, save: () => {}, restore: () => {}, beginPath: () => {}, moveTo: () => {}, lineTo: () => {}, stroke: () => {}, fill: () => {}, closePath: () => {} }), width: 1, height: 1, style: {}, appendChild: () => {}, remove: () => {} }),
        querySelector: () => ({ style: {}, classList: { add: () => {}, remove: () => {}, contains: () => false }, innerHTML: '', value: '', addEventListener: () => {} }),
        querySelectorAll: () => ([]),
        body: { appendChild: () => {}, removeChild: () => {} }
    },
    console: console,
    Math: Math,
    Date: Date,
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    fetch: () => Promise.resolve({ json: () => Promise.resolve([]) }),
    performance: performance,
    localStorage: { getItem: () => null, setItem: () => {} },
    AudioEngine: class { init() {} },
    AudioContext: class {},
    webkitAudioContext: class {},
    Image: class {},
    setInterval: setInterval,
    requestAnimationFrame: () => {},
    location: { hash: '' }
};

sandbox.window.document = sandbox.document;
sandbox.window.localStorage = sandbox.localStorage;

console.log("Compiling script...");
const script = new vm.Script(code);

console.log("Running script in sandbox...");
try {
    script.runInNewContext(sandbox, { timeout: 4000 });
    console.log("Constructor finished successfully. Calling animate...");
    sandbox.window.game.animate(0);
    console.log("Animate finished successfully.");
} catch (e) {
    console.error("Script error/timeout:", e);
}
