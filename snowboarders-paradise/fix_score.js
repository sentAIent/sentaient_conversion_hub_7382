const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');
code = code.replace(/<div style=\{\{ fontSize: 18, color: '#00d0ff', letterSpacing: 3 \}\}>SCORE<\/div>/g, "<div style={{ fontSize: 18, color: '#00d0ff', letterSpacing: 3 }}>LIVE SCORE</div>");
fs.writeFileSync('components/Player.js', code);
