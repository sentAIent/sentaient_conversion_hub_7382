const fs = require('fs');
const path = require('path');

const dir = 'binaural-assets/images/cymatics/';

// We have real images for c1, c2, c3, c4
// For each missing class (c5 to c18), we'll copy c1-c4 in a cycle.
for (let c = 5; c <= 18; c++) {
    const sourceClass = ((c - 1) % 4) + 1; // 1, 2, 3, 4, 1, 2...
    for (let i = 0; i <= 9; i++) {
        const dest = path.join(dir, `c${c}_${i}_final.png`);
        
        // Wait, c1 to c4 have _0 to _13 sometimes. We only need _0 to _9.
        let sourceFile = `c${sourceClass}_${i}_final.png`;
        // Handle special case where a specific source index might not exist
        if (!fs.existsSync(path.join(dir, sourceFile))) {
             sourceFile = `c${sourceClass}_0_final.png`;
        }

        const source = path.join(dir, sourceFile);
        
        // Overwrite the 3606 byte placeholder with the actual image
        if (fs.existsSync(dest) && fs.existsSync(source)) {
            const stats = fs.statSync(dest);
            if (stats.size <= 5000) { // If it's a dummy
                fs.copyFileSync(source, dest);
            }
        }
    }
}
console.log('Dummy images replaced with placeholders.');
