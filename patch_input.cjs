const fs = require('fs');

let code = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

// 1. Remove InputMixin import
code = code.replace(
    "import { applyInputMixin } from './js/mixins/InputMixin.js';",
    "// import { applyInputMixin } from './js/mixins/InputMixin.js';"
);

// 2. Add InputManager import
if (!code.includes("import { InputManager } from './js/engine/InputManager.js';")) {
    code = code.replace(
        "import { Multiplayer } from './js/engine/Multiplayer.js';",
        "import { Multiplayer } from './js/engine/Multiplayer.js';\nimport { InputManager } from './js/engine/InputManager.js';"
    );
}

// 3. Remove applyInputMixin(InterstellarEngine)
code = code.replace(
    "applyInputMixin(InterstellarEngine);",
    "// applyInputMixin(InterstellarEngine);"
);

// 4. Instantiate InputManager in constructor
if (!code.includes("this.inputManager = new InputManager(this);")) {
    code = code.replace(
        "// Multiplayer integration",
        "// Input Management\n        this.inputManager = new InputManager(this);\n\n        // Multiplayer integration"
    );
}

// 5. Replace this.keys with this.inputManager.keys
// We only need to replace specific usages of `this.keys` in script.js 
// since we moved `this.keys` initialization out. 
// A safer way is to just let script.js reference this.inputManager.keys, 
// or set `this.keys = this.inputManager.keys` in the constructor!
if (!code.includes("this.keys = this.inputManager.keys;")) {
    code = code.replace(
        "this.inputManager = new InputManager(this);",
        "this.inputManager = new InputManager(this);\n        this.keys = this.inputManager.keys;"
    );
}

fs.writeFileSync('public/interstellar-game/script.js', code);
console.log('Successfully patched script.js for InputManager!');
