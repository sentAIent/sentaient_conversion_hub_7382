
const fs = require('fs');
const file = process.argv[2];
const content = fs.readFileSync(file, 'utf8');

const regex = /(const|let|var|function)\s+(\w+)\b/g;
let match;
const scopes = [new Set()];
let currentScope = scopes[0];

// This is a VERY crude scope tracker, but might work for simple cases
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check for open/close braces to roughly guess scope
    if (line.includes('{')) scopes.push(new Set());
    if (line.includes('}')) scopes.pop();
    currentScope = scopes[scopes.length - 1];

    let m;
    const lineRegex = /(const|let|var|function)\s+(\w+)\b/g;
    while ((m = lineRegex.exec(line)) !== null) {
        const name = m[2];
        if (currentScope.has(name)) {
            console.log(`DUPLICATE FOUND: '${name}' on line ${i + 1}`);
        }
        currentScope.add(name);
    }
}
