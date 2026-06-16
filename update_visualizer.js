const fs = require('fs');
const file = 'binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js';
let content = fs.readFileSync(file, 'utf8');

// 1. Add 'image' to CYMATIC_PATTERNS
content = content.replace(/static get CYMATIC_PATTERNS\(\) \{[\s\S]*?return \[([\s\S]*?)\];\n    \}/, (match, arrayContent) => {
    // We will inject the image field directly by parsing and stringifying, or regex
    let idx = 0;
    const newArrayContent = arrayContent.replace(/\{([^}]+)\}/g, (m, inner) => {
        let imgIdx = idx % 14;
        let res = '{' + inner + `, image: 'binaural-assets/images/cymatics/ai_cymatic_${imgIdx}.png' }`;
        idx++;
        return res;
    });
    return `static get CYMATIC_PATTERNS() {\n        return [\n${newArrayContent}\n        ];\n    }`;
});

// 2. Add texture uniform
content = content.replace(/uMedium: \{ value: state\.cymaticMedium \|\| 0\.0 \},/, "uMedium: { value: state.cymaticMedium || 0.0 },\n                    uTexture: { value: null },\n                    uHasTexture: { value: 0.0 },");

// 3. Add to vertex shader? No, just fragment shader.
content = content.replace(/uniform vec2 uMouse;/, "uniform vec2 uMouse;\n                    uniform sampler2D uTexture;\n                    uniform float uHasTexture;");

// 4. Update fragment shader main logic
content = content.replace(/vec3 col = baseCol \* \(0\.25 \+ 0\.75 \* diff\);/, `vec3 col = baseCol * (0.25 + 0.75 * diff);
                        
                        if (uHasTexture > 0.5) {
                            vec2 texUv = vUv + grad * shift * 3.5;
                            vec4 texColor = texture2D(uTexture, texUv);
                            if (texColor.a > 0.0) {
                                col = mix(col, texColor.rgb * (1.0 + diff * 0.5) * edge * 2.0, 0.75);
                            }
                        }
`);

// 5. Update applyCymatic to load texture
content = content.replace(/u\.uEnergy\.value = data\.energy \|\| 0\.5;/, `u.uEnergy.value = data.energy || 0.5;
        
        if (data.image) {
            new THREE.TextureLoader().load(data.image, (tex) => {
                u.uTexture.value = tex;
                u.uHasTexture.value = 1.0;
            });
        } else {
            u.uHasTexture.value = 0.0;
        }
`);

fs.writeFileSync(file, content);
console.log("Updated visualizer_vGOLD_SYNC.js");
