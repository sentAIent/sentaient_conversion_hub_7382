const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Inside useFrame:
// We need to find where dt is used for physics
const dtPhysicsRegex = /useFrame\(\(state, dt\) => \{[\s\S]*?\/\/\s*1\.\s*Movement\s*&\s*Physics/;
const newDt = `useFrame((state, dt) => {
    // ART OF FLIGHT: Cinematic Time Dilation
    // When falling very fast (massive air), slow down time!
    const isMassiveAir = introState === 'playing' && position.current[1] > getTerrainHeight(position.current[0], position.current[2]) + 15 && velocity.current[1] < -10;
    const timeScale = isMassiveAir ? 0.3 : 1.0;
    const sDt = dt * timeScale;

    // 1. Movement & Physics`;

code = code.replace(dtPhysicsRegex, newDt);

// Now replace all physics calculations using dt with sDt inside the main physics block.
// But we can just do a regex replace for ` dt ` with ` sDt ` inside the useFrame body?
// It's safer to just let the camera lerp use normal dt (so camera moves smoothly in real-time)
// and physics use sDt.
// Let's replace `dt` with `sDt` in specific lines.
code = code.replace(/velocity\.current\[1\] -= 25 \* dt/g, "velocity.current[1] -= 25 * sDt");
code = code.replace(/velocity\.current\[1\] -= 15 \* dt/g, "velocity.current[1] -= 15 * sDt");
code = code.replace(/velocity\.current\[0\] \+= forwardX \* speed \* dt/g, "velocity.current[0] += forwardX * speed * sDt");
code = code.replace(/velocity\.current\[2\] \+= forwardZ \* speed \* dt/g, "velocity.current[2] += forwardZ * speed * sDt");
code = code.replace(/position\.current\[0\] \+= velocity\.current\[0\] \* dt/g, "position.current[0] += velocity.current[0] * sDt");
code = code.replace(/position\.current\[1\] \+= velocity\.current\[1\] \* dt/g, "position.current[1] += velocity.current[1] * sDt");
code = code.replace(/position\.current\[2\] \+= velocity\.current\[2\] \* dt/g, "position.current[2] += velocity.current[2] * sDt");
code = code.replace(/speed = Math\.min\(120, speed \+ 10 \* dt\)/g, "speed = Math.min(120, speed + 10 * sDt)");
code = code.replace(/speed = Math\.max\(15, speed - 5 \* dt\)/g, "speed = Math.max(15, speed - 5 * sDt)");

fs.writeFileSync('components/Player.js', code);
