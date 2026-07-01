const fs = require('fs');

const scriptPath = 'public/interstellar-game/script.js';
const rendererPath = 'public/interstellar-game/js/systems/Renderer.js';

let scriptContent = fs.readFileSync(scriptPath, 'utf8');
let rendererContent = fs.readFileSync(rendererPath, 'utf8');

// The block to extract starts at `// Static Background Stars (Screen Space)` inside `draw()`
// Let's find the start and end of this block.
const startSearch = '// Static Background Stars (Screen Space)';
const startIdx = scriptContent.indexOf(startSearch);

if (startIdx === -1) {
    console.log("Could not find start index");
    process.exit(1);
}

// In the file, the block ends before `// Draw player ship if in flight mode`
// Wait, actually `drawStaticStars` is the huge chunk from line 8419 to ~8852.
const endSearch = '// Draw player ship if in flight mode';
const endIdx = scriptContent.indexOf(endSearch, startIdx);

if (endIdx === -1) {
    console.log("Could not find end index");
    process.exit(1);
}

const blockCode = scriptContent.substring(startIdx, endIdx);

// We want to replace the block in script.js with `this.renderer.drawStaticStars(time);`
// But wait, the AetherEngine doesn't have `this.renderer` yet! I'll add that later.
// Let's replace it with `this.renderStaticStars(time);` and leave the `renderStaticStars` implementation in Renderer.js? 
// No, the user wants me to use Dependency Injection: `this.renderer.renderStaticStars(time);`

scriptContent = scriptContent.substring(0, startIdx) + 
                'this.renderer.renderStaticStars(time);\n        ' + 
                scriptContent.substring(endIdx);

// Now wrap blockCode into a method for Renderer.js
let newMethod = `
    renderStaticStars(time) {
        const ctx = this.ctx;
        const canvas = this.canvas;
        ${blockCode.replace(/this\./g, 'this.game.')}
    }
`;

// Fix contexts inside newMethod
newMethod = newMethod.replace(/this\.game\.ctx/g, 'this.ctx');
newMethod = newMethod.replace(/this\.game\.canvas/g, 'this.canvas');
newMethod = newMethod.replace(/this\.game\.game/g, 'this.game');

// Inject into Renderer.js
const insertPos = rendererContent.lastIndexOf('}');
rendererContent = rendererContent.substring(0, insertPos) + newMethod + '\n' + rendererContent.substring(insertPos);

fs.writeFileSync(scriptPath, scriptContent);
fs.writeFileSync(rendererPath, rendererContent);

console.log("Extracted renderStaticStars successfully.");
