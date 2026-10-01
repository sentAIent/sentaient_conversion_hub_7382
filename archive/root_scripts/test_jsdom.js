const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('interstellar-game/index.html', 'utf8');
const scriptCode = fs.readFileSync('interstellar-game/script.js', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously", url: "http://localhost:8080/interstellar-game/" });
const window = dom.window;
const document = window.document;

// Mock APIs
window.requestAnimationFrame = () => {};
window.Audio = class { play() {} };
window.fetch = async () => ({
    text: async () => '<html></html>',
    json: async () => ({})
});
window.localStorage = {
    getItem: () => null,
    setItem: () => {}
};

// Mock canvas completely
window.HTMLCanvasElement.prototype.getContext = function() {
    return {
        setTransform: () => {},
        clearRect: () => {},
        beginPath: () => {},
        arc: () => {},
        fill: () => {},
        save: () => {},
        restore: () => {},
        translate: () => {},
        rotate: () => {},
        scale: () => {},
        drawImage: () => {},
        lineTo: () => {},
        moveTo: () => {},
        stroke: () => {},
        fillRect: () => {},
        strokeRect: () => {},
        measureText: () => ({ width: 10 }),
        fillText: () => {},
        createRadialGradient: () => ({ addColorStop: () => {} }),
        createLinearGradient: () => ({ addColorStop: () => {} })
    };
};

try {
    const scriptEl = document.createElement('script');
    scriptEl.textContent = scriptCode.replace('export default Game;', 'window.app = new Game();');
    document.body.appendChild(scriptEl);
    
    setTimeout(() => {
        if (window.app && window.app.showShipModal) {
            window.app.showShipModal();
            
            setTimeout(() => {
                const specsInterceptor = document.getElementById('specs-interceptor');
                if (specsInterceptor) {
                    console.log("HTML OF SPECS CARD:");
                    console.log(specsInterceptor.innerHTML);
                } else {
                    console.log("specs-interceptor NOT FOUND in document.body");
                }
            }, 100);
        } else {
            console.log("app.showShipModal not found.");
        }
    }, 100);
} catch(e) {
    console.log("ERROR:", e);
}
