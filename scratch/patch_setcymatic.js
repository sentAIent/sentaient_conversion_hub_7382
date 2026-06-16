const fs = require('fs');
const filePath = 'binaural-assets/js/ui/controls_v4.js';
let js = fs.readFileSync(filePath, 'utf8');

// Patch window.setCymaticPattern to auto-activate
const targetSet = 'window.setCymaticPattern = function(classId, variationId) {\n    if (window.viz3D && window.viz3D.cymaticsCore) {';
const replacementSet = `window.setCymaticPattern = function(classId, variationId) {
    if (window.viz3D && window.viz3D.cymaticsCore) {
        if (!window.viz3D.activeModes.has('cymatics')) {
            window.setVisualMode('cymatics', null, true);
        }`;
        
if (js.includes(targetSet)) {
    js = js.replace(targetSet, replacementSet);
}

// Patch window.selectCymaticPattern to auto-activate
const targetSelect = 'window.setCymaticPattern(classId, varId);';
const replacementSelect = `window.setCymaticPattern(classId, varId);
    
    if (window.viz3D && !window.viz3D.activeModes.has('cymatics')) {
        window.setVisualMode('cymatics', null, true);
    }`;
    
if (js.includes(targetSelect)) {
    js = js.replace(targetSelect, replacementSelect);
}

fs.writeFileSync(filePath, js);
console.log("Patched auto-activate for cymatics");
