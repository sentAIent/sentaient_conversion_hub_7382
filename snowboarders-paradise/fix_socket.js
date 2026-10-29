const fs = require('fs');
let code = fs.readFileSync('components/socket.js', 'utf8');

if (!code.includes('autoConnect: false')) {
  code = code.replace(/reconnectionAttempts:/, 'autoConnect: false,\n  reconnectionAttempts:');
  fs.writeFileSync('components/socket.js', code);
}
