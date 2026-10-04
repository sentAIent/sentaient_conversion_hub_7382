const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace(/const smoothedYRef = React\.useRef\(0\);/, "const smoothedYRef = React.useRef(30);");

// Also, let's make sure that if the player drops in, smoothedY doesn't lag too badly on the initial jump
code = code.replace(/smoothedYRef\.current = THREE\.MathUtils\.lerp\(smoothedY, pos\.current\.y, 10 \* dt\);/, `
    if (introState === 'cinematic_hover') {
      smoothedYRef.current = pos.current.y;
    } else {
      smoothedYRef.current = THREE.MathUtils.lerp(smoothedY, pos.current.y, 10 * dt);
    }
`);

fs.writeFileSync('components/Player.js', code);
