const fs = require('fs');

// 1. Move audio.js to AudioSystem.js and rename the class
let audioCode = fs.readFileSync('public/interstellar-game/audio.js', 'utf8');
audioCode = audioCode.replace('export class AudioEngine {', 'export class AudioSystem {');
fs.writeFileSync('public/interstellar-game/js/engine/AudioSystem.js', audioCode);

// 2. Patch script.js
let code = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

// Replace imports
code = code.replace(
    /import \{ AudioEngine \} from '\.\/audio\.js.*';/,
    "import { AudioSystem } from './js/engine/AudioSystem.js';"
);

// Remove global instantiation
code = code.replace(
    "window.gameAudio = new AudioEngine();",
    "// window.gameAudio = new AudioEngine();"
);

// Instantiate inside InterstellarEngine constructor
if (!code.includes("this.audio = new AudioSystem();")) {
    code = code.replace(
        "this.inputManager = new InputManager(this);",
        "this.inputManager = new InputManager(this);\n        this.audio = new AudioSystem();"
    );
}

// Replace gameAudio and window.gameAudio calls
// Use regex to catch all variations. Be careful not to replace inside comments if it breaks things, but usually it's fine.
code = code.replace(/window\.gameAudio/g, 'this.audio');
// Replace gameAudio where it's used directly, carefully
// (gameAudio\.) -> (this.audio.)
code = code.replace(/\bgameAudio\./g, 'this.audio.');

// Some places might check `typeof gameAudio !== 'undefined'` or `typeof window.gameAudio !== 'undefined'`
// We can just replace them with `this.audio`
code = code.replace(/typeof this\.audio !== 'undefined'/g, 'this.audio');
code = code.replace(/typeof gameAudio !== 'undefined'/g, 'this.audio');

fs.writeFileSync('public/interstellar-game/script.js', code);
// Remove the old audio.js to complete the move
if (fs.existsSync('public/interstellar-game/audio.js')) {
    fs.unlinkSync('public/interstellar-game/audio.js');
}

console.log('Successfully patched script.js for AudioSystem!');
