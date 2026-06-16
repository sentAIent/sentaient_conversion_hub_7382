const fs = require('fs');

const htmlPath = '/Users/infinitealpha/Dev/BinauralBeats/v7_restore/mindwave.html';
const imagesDir = '/Users/infinitealpha/Dev/BinauralBeats/v7_restore/binaural-assets/images/cymatics/';
let html = fs.readFileSync(htmlPath, 'utf8');

// 1. Fix grid-cols to make buttons bigger
html = html.replace(/grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2/g, 'grid-cols-4 gap-2');

// 2. Fix image sources
// We look for:
// <button ... onclick="window.setCymaticPattern(C, V)" ...>
//    <img src="..." ...>
const regex = /onclick="window\.setCymaticPattern\((\d+),\s*(\d+)\)"[^>]*>\s*<img src="([^"]+)"/g;

let count = 0;
html = html.replace(regex, (match, clsStr, varStr, oldSrc) => {
    count++;
    const cls = parseInt(clsStr, 10);
    const v = parseInt(varStr, 10);
    
    let newImgName = '';
    
    if (cls <= 18) {
        // Standard classes
        const specificName = `c${cls}_${v}_final.png`;
        const baseName = `c${cls}_0_final.png`;
        if (fs.existsSync(imagesDir + specificName)) {
            newImgName = specificName;
        } else if (fs.existsSync(imagesDir + baseName)) {
            newImgName = baseName;
        } else {
            newImgName = 'ai_cymatic_0.png';
        }
    } else if (cls == 22) {
        // Sentient Generation
        const custom = [
            'cymatics_fractal_heart_1779756441610.png',
            'cymatics_fluid_sdf_1779756501734.png',
            'cymatics_particle_swarm_1779756471939.png'
        ];
        newImgName = custom[v % custom.length];
        if (!fs.existsSync(imagesDir + newImgName)) newImgName = 'ai_cymatic_0.png';
    } else if (cls == 25) {
        // Quantum Double Slit
        newImgName = 'cymatic_quantum_crystal_lattice.png';
        if (!fs.existsSync(imagesDir + newImgName)) newImgName = 'ai_cymatic_10.png';
    } else {
        // Other classes (19, 20, 21, 23, 24, 26)
        // Map to ai_cymatic_X
        const aiFiles = [];
        for(let i=0; i<=16; i++) aiFiles.push(`ai_cymatic_${i}.png`);
        
        // Offset by class to make them look different per class
        const offset = (cls * 3 + v);
        let potentialName = aiFiles[offset % aiFiles.length];
        
        // Let's add some hardcoded nice ones for specific classes if they exist
        if (cls == 24) { // Constellations
            newImgName = `ai_cymatic_${(v + 5) % 17}.png`;
        } else if (cls == 23) {
            newImgName = `ai_cymatic_${(v + 10) % 17}.png`;
        } else {
            newImgName = potentialName;
        }
    }
    
    // Safety check just in case
    if (newImgName === 'cymatic_quantum_crystal_lattice.png' && !fs.existsSync(imagesDir + newImgName)) {
        newImgName = 'ai_cymatic_10.png'; 
    }
    
    // Replace the src portion of the match
    const newSrc = `binaural-assets/images/cymatics/${newImgName}`;
    const newMatch = match.replace(`src="${oldSrc}"`, `src="${newSrc}"`);
    return newMatch;
});

console.log(`Replaced images for ${count} buttons.`);
fs.writeFileSync(htmlPath, html, 'utf8');
