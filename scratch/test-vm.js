const fs = require('fs');
const vm = require('vm');

let code = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

// remove import statements
code = code.replace(/^import .*/gm, '');

// mock missing AudioEngine
let prefix = `
class AudioEngine {
    toggleMute() {}
    stopAllMusic() {}
    setMusicVolume() {}
}
const Utils = {};
window.gameAudio = new AudioEngine();
`;

code = prefix + code + `
try {
    const engine = new InterstellarEngine();
    console.log("Engine initialized. Running animate()...");
    for (let i = 0; i < 100; i++) {
        engine.animate();
    }
    console.log("Animation loop completed without freezing!");
} catch (e) {
    console.error("Execution error:", e);
}
`;

const sandbox = {
    console: console,
    window: {
        addEventListener: () => {},
        innerWidth: 800,
        innerHeight: 600,
        location: { search: '' },
        postMessage: () => {},
        parent: {}
    },
    document: {
        createElement: (tag) => {
            if (tag === 'canvas') return {
                getContext: () => ({
                    fillRect: () => {}, drawImage: () => {}, save: () => {}, restore: () => {}, 
                    beginPath: () => {}, fill: () => {}, arc: () => {}, translate: () => {}, 
                    scale: () => {}, rotate: () => {}, createLinearGradient: () => ({ addColorStop: ()=>{} }),
                    measureText: () => ({ width: 10 }), strokeText: () => {}, fillText: () => {},
                    stroke: () => {}, createRadialGradient: () => ({ addColorStop: ()=>{} }),
                    clearRect: () => {}, closePath: () => {}, moveTo: () => {}, lineTo: () => {},
                    setTransform: () => {}, createPattern: () => {}, transform: () => {}
                }),
                width: 800, height: 600, style: {}, addEventListener: () => {}
            };
            return { style: {}, classList: { add: ()=>{}, remove: ()=>{}, contains: ()=>false }, appendChild: () => {}, append: () => {} };
        },
        body: { appendChild: () => {}, classList: { add: ()=>{}, remove: ()=>{}, contains: ()=>false } },
        getElementById: (id) => ({
            getContext: () => ({
                fillRect: () => {}, drawImage: () => {}, save: () => {}, restore: () => {}, 
                beginPath: () => {}, fill: () => {}, arc: () => {}, translate: () => {}, 
                scale: () => {}, rotate: () => {}, createLinearGradient: () => ({ addColorStop: ()=>{} }),
                measureText: () => ({ width: 10 }), strokeText: () => {}, fillText: () => {},
                stroke: () => {}, createRadialGradient: () => ({ addColorStop: ()=>{} }),
                clearRect: () => {}, closePath: () => {}, moveTo: () => {}, lineTo: () => {},
                setTransform: () => {}, createPattern: () => {}, transform: () => {}
            }),
            style: {},
            classList: { add: ()=>{}, remove: ()=>{}, contains: ()=>false },
            addEventListener: () => {},
            value: '',
            appendChild: () => {},
            querySelector: () => null
        }),
        querySelectorAll: () => []
    },
    localStorage: {
        getItem: () => null,
        setItem: () => {}
    },
    Image: class { constructor() { this.onload = null; } },
    Audio: class { constructor() { this.play = () => {}; } },
    Math: Math,
    Date: Date,
    setTimeout: (fn) => {},
    clearTimeout: () => {},
    setInterval: setInterval,
    clearInterval: clearInterval,
    requestAnimationFrame: () => {},
    cancelAnimationFrame: () => {},
    Object: Object,
    JSON: JSON,
    parseFloat: parseFloat,
    parseInt: parseInt,
    performance: { now: () => Date.now() },
    fetch: async () => ({ json: async () => ({}) })
};
sandbox.window.parent = sandbox.window;
sandbox.window.gameAudio = new class {
    toggleMute() {}
    stopAllMusic() {}
    setMusicVolume() {}
};

vm.createContext(sandbox);

console.log("Running script in VM...");
try {
    vm.runInContext(code, sandbox, { timeout: 10000 });
} catch (e) {
    console.error("VM Timeout or Error:", e);
}
