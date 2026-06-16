const fs = require('fs');
const content = fs.readFileSync('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/binaural-assets/js/visuals/CymaticsCore_v4.js', 'utf8');

const regex = /if\s*\(classId\s*===\s*22\)\s*\{\s*return\s*`([\s\S]+?)`;/g;
let match = regex.exec(content);
if(match) {
    console.log(match[1].split('\n').filter(line => line.includes('uColor')).join('\n'));
}
