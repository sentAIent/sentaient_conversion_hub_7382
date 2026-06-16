const fs = require('fs');
const content = fs.readFileSync('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'utf8');

// Extract the array using simple string matching
const start = content.indexOf('static CYMATIC_PATTERNS = [');
const end = content.indexOf('];', start);
const arrStr = content.substring(start + 'static CYMATIC_PATTERNS = '.length, end + 1);

try {
    const arr = eval(arrStr);
    console.log("Array length in file:", arr.length);
} catch (e) {
    console.log("Could not eval array:", e);
}
