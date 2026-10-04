const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

code = code.replace(/<Vignette eskil=\{false\} offset=\{0\.1\} darkness=\{1\.1\} \/>/g, '<Vignette eskil={false} offset={0.1} darkness={0.4} />');
code = code.replace(/<Noise opacity=\{0\.04\} \/>/g, '<Noise opacity={0.015} />'); // Reduce noise for a cleaner state of the art look

fs.writeFileSync('App.js', code);
console.log("Vignette and Noise patched");
