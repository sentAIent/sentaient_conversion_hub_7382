const fs = require('fs');

let code = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

// 1. Replace RenderMixin import
code = code.replace(
    "import { applyRenderMixin } from './js/mixins/RenderMixin.js';",
    "import { Renderer } from './js/engine/Renderer.js';"
);

// 2. Remove applyRenderMixin(InterstellarEngine)
code = code.replace(
    "applyRenderMixin(InterstellarEngine);",
    "// applyRenderMixin(InterstellarEngine);"
);

// 3. Instantiate Renderer
if (!code.includes("this.renderer = new Renderer(this);")) {
    code = code.replace(
        "this.uiManager = new UIManager(this);",
        "this.uiManager = new UIManager(this);\n        this.renderer = new Renderer(this);"
    );
}

// 4. In script.js, Renderer methods called on `this` must now be routed to `this.renderer`.
// Methods we moved:
const methods = [
    'initWebGL', 'init3DObjects', 'renderWebGL', 'generateStaticBackground',
    'drawCyberGrid', 'generateSingleStyle', 'clearStyleData',
    'updateBgUI', 'toggleBgBattles', 'preloadEffects'
];

methods.forEach(method => {
    // Regex to match exact method call (e.g., `this.initWebGL(`)
    const regex = new RegExp(`this\\.${method}\\(`, 'g');
    code = code.replace(regex, `this.renderer.${method}(`);
});

fs.writeFileSync('public/interstellar-game/script.js', code);
console.log('Successfully patched script.js for Renderer!');
