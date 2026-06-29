import fs from 'fs';
const file = 'binaural-assets/js/visuals/visualizer_v4.js';
let content = fs.readFileSync(file, 'utf8');

// Safeguard uniforms in render
const search = `this.tsunamiMaterial.uniforms.uTime.value += delta * spd;`;
const replacement = `if(this.tsunamiMaterial.uniforms) { this.tsunamiMaterial.uniforms.uTime.value += delta * spd; this.tsunamiMaterial.uniforms.uNormBass.value = vBeatPulse; }`;

content = content.replace(search, replacement);
content = content.replace(`this.tsunamiMaterial.uniforms.uNormBass.value = vBeatPulse;`, `// removed by patch`);

fs.writeFileSync(file, content);
