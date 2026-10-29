const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/const doubleJumpUsed = useRef\(false\);\n  const doubleJumpUsed = useRef\(false\);/, "const doubleJumpUsed = useRef(false);");

fs.writeFileSync('components/Player.js', code);
