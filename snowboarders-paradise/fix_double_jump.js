const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/const lastJump = useRef\(0\);/, "const lastJump = useRef(0);\n  const doubleJumpUsed = useRef(false);");

fs.writeFileSync('components/Player.js', code);
