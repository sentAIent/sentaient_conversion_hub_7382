const fs = require('fs');
const content = fs.readFileSync('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/binaural-assets/js/visuals/CymaticsCore_v4.js', 'utf8');

const regex = /if\s*\(classId\s*===\s*(\d+)\)\s*\{\s*return\s*`([\s\S]+?)`;/g;
let match;
const classes = {};

while ((match = regex.exec(content)) !== null) {
    const classId = match[1];
    const shaderBody = match[2];
    
    // check if uColor1 and uColor2 are actually used in the calculation, not just declared.
    // we strip out "uniform vec3 uColorX;" and check if it appears anywhere else.
    const bodyWithoutDecl1 = shaderBody.replace(/uniform\s+vec3\s+uColor1\s*;/g, '');
    const bodyWithoutDecl2 = shaderBody.replace(/uniform\s+vec3\s+uColor2\s*;/g, '');
    
    const usesColor1 = bodyWithoutDecl1.includes('uColor1');
    const usesColor2 = bodyWithoutDecl2.includes('uColor2');
    
    classes[classId] = { c1: usesColor1, c2: usesColor2 };
}

Object.keys(classes).sort((a, b) => parseInt(a) - parseInt(b)).forEach(id => {
    console.log(`Class ${id} - uColor1: ${classes[id].c1}, uColor2: ${classes[id].c2}`);
});
