const fs = require('fs');
const content = fs.readFileSync('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'utf8');

const match = content.match(/static get CYMATIC_PATTERNS\(\) \{\s*return (\[[\s\S]*?\]);\s*\}/);
if (!match) {
    console.error("Could not find CYMATIC_PATTERNS");
    process.exit(1);
}

const patternsStr = match[1];
// Eval in a safe context
const patterns = eval(patternsStr);

const groups = {};

patterns.forEach((p, idx) => {
    const type = p.type || 0;
    const n = p.n;
    const m = p.m;
    
    // Sort n and m if they are mathematically symmetric, but for now exact match:
    // Wait, chladniBase(p, n, m) = cos(n*PI*x)*cos(m*PI*y) - cos(m*PI*x)*cos(n*PI*y)
    // chladniBase is anti-symmetric in n and m. chladni(n, m) = -chladni(m, n). Since it's displacement, the visual magnitude is the same!
    // But let's strictly group by exact n, m, type first, then symmetric.
    
    // For exact match:
    const key = `type:${type}, n:${n}, m:${m}`;
    const symmetricKey = `type:${type}, n:${Math.min(n, m)}, m:${Math.max(n, m)}`;
    
    if (!groups[symmetricKey]) {
        groups[symmetricKey] = [];
    }
    groups[symmetricKey].push({ idx, name: p.name, exact: `n:${n}, m:${m}` });
});

console.log("IDENTICAL CYMATICS (Symmetric n & m considered identical in Chladni patterns):");
for (const key in groups) {
    if (groups[key].length > 1) {
        console.log(`\nParameters [${key}]:`);
        groups[key].forEach(item => {
            console.log(`  - Index ${item.idx}: "${item.name}" (Original: ${item.exact})`);
        });
    }
}
