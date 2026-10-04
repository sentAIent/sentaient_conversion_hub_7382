const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

code = code.replace(/<Environment preset="sunset" \/>\s*/g, '');
code = code.replace(/<Environment preset="park" background=\{false\} \/>/g, '<Environment preset="studio" background={false} />');

fs.writeFileSync('App.js', code);
