const fs = require('fs');
const content = fs.readFileSync('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/binaural-assets/js/visuals/CymaticsCore_v4.js', 'utf8');

const regex = /if\s*\(classId\s*===\s*(\d+)\)\s*\{\s*return\s*`([\s\S]+?)`;/g;
let match;
const classes = {};

while ((match = regex.exec(content)) !== null) {
    const classId = match[1];
    const shaderBody = match[2];
    const uniforms = [...shaderBody.matchAll(/uniform\s+\w+\s+(u\w+);/g)].map(m => m[1]);
    classes[classId] = Array.from(new Set(uniforms));
}

Object.keys(classes).sort((a, b) => parseInt(a) - parseInt(b)).forEach(id => {
    console.log(`Class ${id}: ${classes[id].join(', ')}`);
});
