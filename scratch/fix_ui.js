const fs = require('fs');
const file = 'mindwave.html';
let content = fs.readFileSync(file, 'utf8');

// Replace ml-1 with ml-3 for the slider value spans
content = content.replace(/<span class="text-\[8px\] text-gray-500 ml-1">/g, '<span class="text-[8px] text-gray-500 ml-3">');

// Fix bright blob: adjust the visualizer logo glow
// I'll leave the gradient but maybe tone it down?
// But wait, the radial gradient for the mandala is NOT the logo!

fs.writeFileSync(file, content);
console.log('Fixed slider spacing.');
