const { JSDOM } = require('jsdom');
const fs = require('fs');

const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
    <canvas id="canvas"></canvas>
</body>
</html>
`, { runScripts: "outside-only" });

global.window = dom.window;
global.document = dom.window.document;
global.Image = dom.window.Image;
global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.performance = { now: () => Date.now() };

// Provide a mock context
dom.window.HTMLCanvasElement.prototype.getContext = function() {
    return {
        save: () => {},
        restore: () => {},
        scale: () => {},
        rotate: () => {},
        translate: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        closePath: () => {},
        fill: () => {},
        stroke: () => {},
        arc: () => {},
        drawImage: () => {},
        createRadialGradient: () => ({ addColorStop: () => {} }),
        createLinearGradient: () => ({ addColorStop: () => {} })
    };
};

try {
    const code = fs.readFileSync('script.js', 'utf8');
    dom.window.eval(code);
    console.log("Script loaded and parsed successfully.");
    
    // Attempt to run whatever the init function is
    // Assuming there's a class instantiated at the end or an init call
} catch (e) {
    console.error("ERROR CAUGHT:");
    console.error(e);
}
