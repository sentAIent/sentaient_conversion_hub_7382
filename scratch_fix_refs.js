const fs = require('fs');
const file = 'public/interstellar-game/js/systems/Renderer.js';
let content = fs.readFileSync(file, 'utf8');

// We only want to replace 'this.' with 'this.game.' inside drawBackgroundElements.
// We can just do a global replace of 'this.' to 'this.game.' in the file, 
// and then fix the specific ones we know belong to Renderer.

content = content.replace(/this\./g, 'this.game.');

// Now fix the ones that should actually be 'this.'
content = content.replace(/this\.game\.ctx/g, 'this.ctx');
content = content.replace(/this\.game\.canvas/g, 'this.canvas');
content = content.replace(/this\.game\.game/g, 'this.game'); // Fix double replacement if any

fs.writeFileSync(file, content);
console.log('Replaced references.');
