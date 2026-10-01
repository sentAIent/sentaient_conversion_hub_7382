const fs = require('fs');

let code = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

// 1. Add Import
if (!code.includes("import { Multiplayer } from './js/engine/Multiplayer.js';")) {
    code = code.replace(
        "import { applyInputMixin } from './js/mixins/InputMixin.js';",
        "import { applyInputMixin } from './js/mixins/InputMixin.js';\nimport { Multiplayer } from './js/engine/Multiplayer.js';"
    );
}

// 2. Instantiate Multiplayer
if (!code.includes("this.multiplayer = new Multiplayer(this);")) {
    code = code.replace(
        "this.cyberRainbowMode = false;",
        "this.cyberRainbowMode = false;\n\n        // Multiplayer integration\n        this.multiplayer = new Multiplayer(this);"
    );
}

// 3. Sync Physics
if (!code.includes("this.multiplayer.update(deltaTime, time);")) {
    code = code.replace(
        "this.updateSupernovaEffect(deltaTime);\n\n            // --- ASTEROIDS ---",
        "this.updateSupernovaEffect(deltaTime);\n            \n            // Sync multiplayer position\n            if (this.multiplayer) {\n                this.multiplayer.update(deltaTime, time);\n            }\n\n            // --- ASTEROIDS ---"
    );
}

// 4. Render Remote Ships
if (!code.includes("this.multiplayer.render(ctx, this.camera);")) {
    code = code.replace(
        "this.drawEnemies(ctx, time);\n\n            // Draw player ship",
        "this.drawEnemies(ctx, time);\n            \n            // Render multiplayer ships\n            if (this.multiplayer) {\n                this.multiplayer.render(ctx, this.camera);\n            }\n\n            // Draw player ship"
    );
}

fs.writeFileSync('public/interstellar-game/script.js', code);
console.log('Successfully patched script.js!');
