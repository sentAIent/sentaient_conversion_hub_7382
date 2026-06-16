import fs from 'fs';
const code = fs.readFileSync('binaural-assets/js/visuals/CymaticsCore.js', 'utf8');
const match = code.match(/if \(i === 24\) \{([\s\S]*?)return shader;/);
if (match) {
    console.log("Found shader generator for 24");
    // Evaluate it?
} else {
    console.log("NOT FOUND");
}
