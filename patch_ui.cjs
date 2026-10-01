const fs = require('fs');

let code = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

// 1. Replace UIMixin import
code = code.replace(
    "import { applyUIMixin } from './js/mixins/UIMixin.js';",
    "import { UIManager } from './js/engine/UIManager.js';"
);

// 2. Remove applyUIMixin(InterstellarEngine)
code = code.replace(
    "applyUIMixin(InterstellarEngine);",
    "// applyUIMixin(InterstellarEngine);"
);

// 3. Instantiate UIManager
if (!code.includes("this.uiManager = new UIManager(this);")) {
    code = code.replace(
        "this.inputManager = new InputManager(this);",
        "this.inputManager = new InputManager(this);\n        this.uiManager = new UIManager(this);"
    );
}

// 4. In script.js, UI methods called on `this` must now be routed to `this.uiManager`.
// Methods we moved:
const methods = [
    'initWindowSystem', 'saveWindowState', 'setMode', 'setFixedColor',
    'setRainbowMode', 'toggleRotationPanel', 'toggleTemplatePanel',
    'toggleFlightMode', 'setLayout', 'toggleCockpitSection',
    'getWindowName', 'toggleControlsExpanded', 'hideControlsExpanded',
    'minimizeToTaskbar', 'restoreFromTaskbar', 'saveLayout',
    'loadLayout', 'toggleGemValues', 'makeResizable', 'toggleFloatingWindow'
];

methods.forEach(method => {
    // Regex to match exact method call (e.g., `this.setMode(`)
    const regex = new RegExp(`this\\.${method}\\(`, 'g');
    code = code.replace(regex, `this.uiManager.${method}(`);
});

fs.writeFileSync('public/interstellar-game/script.js', code);
console.log('Successfully patched script.js for UIManager!');
