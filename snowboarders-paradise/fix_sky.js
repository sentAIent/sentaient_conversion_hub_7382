const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

code = code.replace(/<Sky sunPosition=\{\[100, 20, 100\]\} \/>/g, '<Environment preset="park" background />');
fs.writeFileSync('App.js', code);
