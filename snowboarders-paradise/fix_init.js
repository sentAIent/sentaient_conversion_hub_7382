const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// The initialization should happen for BOTH approach and hover
const findBlock = `    if (introState === 'cinematic_approach' || introState === 'cinematic_hover') {
      if (!heliRef.current) return;
      
      if (introState === 'cinematic_approach') {
        if (!heliRef.current.userData.initialized) {`;

const replaceBlock = `    if (introState === 'cinematic_approach' || introState === 'cinematic_hover') {
      if (!heliRef.current) return;
      
      if (!heliRef.current.userData.initialized) {
          heliRef.current.position.set(0, 30, 0);
          heliRef.current.rotation.set(0, 0, 0);
          heliRef.current.userData.initialized = true;
          pos.current.set(0, 30, 0);
          setAnimState({ carving: 0, inAir: false, grabbing: false, wipeout: true });
      }

      if (introState === 'cinematic_approach') {
        if (false) {`;

code = code.replace(findBlock, replaceBlock);

// Also let's just make it auto-drop instantly so they don't even have to wait
code = code.replace(/if \(jump \|\| introTimer\.current > 6\) \{/, 'if (jump || introTimer.current > 0.5) {');

fs.writeFileSync('components/Player.js', code);
