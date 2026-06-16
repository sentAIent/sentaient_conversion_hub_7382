const fs = require('fs');
const file = 'binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js';
let content = fs.readFileSync(file, 'utf8');

// The duplicates to remove:
// Sri Yantra (3,2) -> Remove
// Cellular Grid (5,5) -> Remove
// Vector Equil (2,6) -> Remove
// Star Resonance (6,2) -> Remove
// Recursive (7,3) -> Remove
// Lattice (6,6) -> Remove
// Etheric (11,5) -> Remove
// Hyper Lobe (8,8) -> Remove
// Omega Sphere (9,9) -> Remove
// Cosmic Weaver (14,7) -> Remove
// Triple Axis (1,3) -> Remove
// Solar Grate (4,2) -> Remove
// Neural Web (4,10) -> Remove
// Void Geometry (10,4) -> Remove

const removeNames = [
    'Sri Yantra', 'Cellular Grid', 'Vector Equil', 'Star Resonance',
    'Recursive', 'Lattice', 'Etheric', 'Hyper Lobe', 'Omega Sphere',
    'Cosmic Weaver', 'Triple Axis', 'Solar Grate', 'Neural Web', 'Void Geometry'
];

removeNames.forEach(name => {
    // Regex to match the object definition with that name
    const regex = new RegExp(`\\s*\\{[^}]*name:\\s*['"]${name}['"][^}]*\\},?`, 'g');
    content = content.replace(regex, '');
});

// Append new classes at the end of the array before the bracket
// Let's find the end of the array
// It ends with:
//             { name: "Chronos Weave", n: 23, m: 5, type: 5, cat: 'live_shader' }
//         ];
const newEntries = `
            { name: "Pixel Nebula", n: 13, m: 21, type: 6, cat: 'advanced' },
            { name: "Magnetic Stardust", n: 8, m: 19, type: 6, cat: 'advanced' },
            { name: "Quantum Granules", n: 24, m: 11, type: 6, cat: 'advanced' },
            { name: "Neon Sand", n: 31, m: 14, type: 6, cat: 'advanced' },
            { name: "Chromatic Dust", n: 17, m: 29, type: 6, cat: 'advanced' },
            
            { name: "Royal Gradient", n: 4, m: 9, type: 7, cat: 'advanced' },
            { name: "Sunset Flow", n: 11, m: 16, type: 7, cat: 'advanced' },
            { name: "Oceanic Folds", n: 14, m: 19, type: 7, cat: 'advanced' },
            { name: "Auroral Waves", n: 22, m: 13, type: 7, cat: 'advanced' },
            { name: "Golden Ratio Flow", n: 21, m: 34, type: 7, cat: 'advanced' }`;

content = content.replace(/(\{\s*name:\s*["']Chronos Weave["'][^}]*\}\s*)\n\s*\];/, `$1,${newEntries}\n        ];`);

fs.writeFileSync(file, content);
console.log('Array updated.');
