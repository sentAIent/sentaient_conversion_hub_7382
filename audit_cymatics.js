const fs = require('fs');

const html = fs.readFileSync('mindwave.html', 'utf8');
const js = fs.readFileSync('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'utf8');

// Parse JS Patterns
const patternRegex = /name:\s*['"]([^'"]+)['"],\s*type:\s*([\d.]+)/g;
const patterns = [];
let m;
while ((m = patternRegex.exec(js)) !== null) {
    patterns.push({ name: m[1], type: parseFloat(m[2]) });
}

// Parse HTML Categories and Buttons
// In mindwave.html, there are sections like <!-- SECTION: ... -->
// and buttons have data-pattern-index="XX"
const htmlLines = html.split('\n');
let currentSection = 'Unknown';
const htmlButtons = [];

for (const line of htmlLines) {
    const sectionMatch = line.match(/<!--\s*SECTION:\s*(.+?)\s*-->/);
    if (sectionMatch) {
        currentSection = sectionMatch[1].trim();
    }
    const btnMatch = line.match(/data-pattern-index="(\d+)"/);
    if (btnMatch) {
        const index = parseInt(btnMatch[1], 10);
        // Look for the span text in the next few lines for the name
        htmlButtons.push({ index, section: currentSection, namePlaceholder: '...' });
    }
}

// Map HTML buttons back to names
for (let i = 0; i < htmlLines.length; i++) {
    const btnMatch = htmlLines[i].match(/data-pattern-index="(\d+)"/);
    if (btnMatch) {
        const idx = parseInt(btnMatch[1], 10);
        // Find span text
        let name = "Unknown";
        for (let j = i; j < i + 10; j++) {
            if (htmlLines[j]) {
                const spanMatch = htmlLines[j].match(/<span[^>]*>(.+?)<\/span>/);
                if (spanMatch) {
                    name = spanMatch[1].trim();
                    break;
                }
            }
        }
        
        // Update the last added button with this index
        for (let k = htmlButtons.length - 1; k >= 0; k--) {
            if (htmlButtons[k].index === idx && htmlButtons[k].namePlaceholder === '...') {
                htmlButtons[k].namePlaceholder = name;
                break;
            }
        }
    }
}

console.log("=== JS PATTERNS (Total: " + patterns.length + ") ===");
// Just log out the types mapping
const typeMap = {};
patterns.forEach((p, idx) => {
    let t = "Simple (Chladni)";
    if (p.type > 6.5) t = "Harmonic Gradient";
    else if (p.type > 5.5) t = "Pixel Stardust";
    else if (p.type > 4.5) t = "Resonance (Chaos)";
    else t = "Other (" + p.type + ")";
    
    if (!typeMap[t]) typeMap[t] = [];
    typeMap[t].push(`[${idx}] ${p.name}`);
});
for (const [k, v] of Object.entries(typeMap)) {
    console.log(`\n-- ${k} --\n` + v.join('\n'));
}

console.log("\n=== HTML BUTTONS (Total: " + htmlButtons.length + ") ===");
const sectionMap = {};
htmlButtons.forEach(b => {
    if (!sectionMap[b.section]) sectionMap[b.section] = [];
    const jsPat = patterns[b.index];
    const jsName = jsPat ? jsPat.name : "INVALID INDEX";
    const jsType = jsPat ? jsPat.type : "N/A";
    sectionMap[b.section].push(`[${b.index}] HTML: "${b.namePlaceholder}" -> JS: "${jsName}" (Type: ${jsType})`);
});

for (const [k, v] of Object.entries(sectionMap)) {
    console.log(`\n-- SECTION: ${k} --\n` + v.join('\n'));
}

// Find discrepancies
console.log("\n=== DISCREPANCIES ===");
htmlButtons.forEach(b => {
    const p = patterns[b.index];
    if (!p) {
        console.log(`Missing pattern in JS for index ${b.index} (${b.namePlaceholder})`);
    } else {
        if (b.namePlaceholder.toLowerCase() !== p.name.toLowerCase()) {
            console.log(`Name mismatch at index ${b.index}: HTML wants "${b.namePlaceholder}", JS has "${p.name}"`);
        }
    }
});

