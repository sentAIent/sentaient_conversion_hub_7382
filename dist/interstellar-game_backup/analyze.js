const fs = require('fs');
const code = fs.readFileSync('script.js', 'utf8').split('\n');

const methods = [];
let currentMethod = null;
let currentStart = 0;
let braceCount = 0;

for (let i = 0; i < code.length; i++) {
    const line = code[i];
    
    // Naively match method start `    methodName() {`
    const match = line.match(/^    ([a-zA-Z0-9_]+)\(.*?\) {/);
    if (!currentMethod && match) {
        currentMethod = match[1];
        currentStart = i;
        braceCount = 1;
        // Check remainder of line
        const rest = line.substring(line.indexOf('{') + 1);
        braceCount += (rest.match(/\{/g) || []).length;
        braceCount -= (rest.match(/\}/g) || []).length;
        if (braceCount === 0) {
            methods.push({name: currentMethod, lines: i - currentStart + 1});
            currentMethod = null;
        }
    } else if (currentMethod) {
        braceCount += (line.match(/\{/g) || []).length;
        braceCount -= (line.match(/\}/g) || []).length;
        if (braceCount === 0) {
            methods.push({name: currentMethod, lines: i - currentStart + 1});
            currentMethod = null;
        }
    }
}

methods.sort((a,b) => b.lines - a.lines);
console.log("Top 20 largest methods remaining:");
methods.slice(0, 20).forEach(m => console.log(`${m.lines} lines: ${m.name}`));
