const fs = require('fs');
const code = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

const regex = /^    ([a-zA-Z0-9_]+)\([^)]*\)\s*\{/gm;
let match;
const methods = [];
while ((match = regex.exec(code)) !== null) {
    methods.push(match[1]);
}
console.log(methods.filter(m => m.startsWith('update') || m.includes('Collision') || m.includes('Physics') || m.startsWith('check')));
