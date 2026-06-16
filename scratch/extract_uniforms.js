const fs = require('fs');
const content = fs.readFileSync('/Users/infinitealpha/Dev/BinauralBeats/v7_restore/binaural-assets/js/visuals/CymaticsCore_v4.js', 'utf8');

const classMatches = content.match(/if\s*\(i\s*===\s*\d+\)\s*\{[\s\S]*?FragmentShader\s*=\s*`[\s\S]*?`;/g);

if (classMatches) {
    classMatches.forEach(match => {
        const idMatch = match.match(/if\s*\(i\s*===\s*(\d+)\)/);
        if (idMatch) {
            const classId = idMatch[1];
            const uniformsMatch = match.match(/uniform\s+\w+\s+(u\w+);/g);
            console.log(`Class ${classId}:`, uniformsMatch ? uniformsMatch.map(u => u.split(/\s+/)[2].replace(';', '')).join(', ') : 'No uniforms found');
        }
    });
} else {
    console.log("No class matches found.");
}
