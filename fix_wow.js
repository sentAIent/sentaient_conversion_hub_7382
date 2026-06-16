const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, 'binaural-assets/js/visuals/CymaticsCore.js');
let code = fs.readFileSync(targetPath, 'utf8');

// For every shader, we can replace:
// "float t = uTime;" with "float t = uTime * (0.5 + uIntensity * 1.5);"
// "float t = uTime * 0.5;" with "float t = uTime * (0.25 + uIntensity * 0.75);"
// "float t = uTime * 2.0;" with "float t = uTime * (1.0 + uIntensity * 3.0);"
// Wait, an easier way is to just inject a modifier right after main() {

const injection = `
        void main() {
            float intMod = max(0.1, uIntensity);
`;

code = code.replace(/        void main\(\) \{/g, injection);

// Replace uses of uTime to multiply by intMod
code = code.replace(/float t = uTime([^;]*);/g, 'float t = uTime$1 * intMod;');
code = code.replace(/float t = uTime;/g, 'float t = uTime * intMod;');

// Make the color multiplier much more dramatic. 
// Old: * uIntensity * 1.5
// New: * pow(intMod, 1.5) * 2.0
code = code.replace(/\* uIntensity \* 1\.5/g, '* pow(intMod, 1.5) * 2.0');
code = code.replace(/\* uIntensity;/g, '* pow(intMod, 1.5) * 1.5;');

fs.writeFileSync(targetPath, code);
console.log("Successfully added wow factor to all Cymatics shaders!");
