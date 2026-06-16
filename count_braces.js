const fs = require('fs');
const content = fs.readFileSync('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'utf8');

let depth = 0;
let lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
        if (lines[i][j] === '{') depth++;
        if (lines[i][j] === '}') depth--;
    }
    if (depth < 0) {
        console.log('Unmatched closing brace at line ' + (i + 1));
        console.log(lines[i]);
        break;
    }
}
console.log('Final depth:', depth);
