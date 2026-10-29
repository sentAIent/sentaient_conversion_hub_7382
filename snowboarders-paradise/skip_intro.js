const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Change default intro state to 'cinematic_hover'
code = code.replace(/const \[introState, setIntroState\] = useState\('cinematic_approach'\);/g, "const [introState, setIntroState] = useState('cinematic_hover');");

// Ensure initialization places them immediately at the target position
code = code.replace(/if \(!heliRef\.current\.userData\.initialized\) \{/g, `if (!heliRef.current.userData.initialized) {
          heliRef.current.position.set(0, 30, 0);
          heliRef.current.rotation.set(0, 0, 0);
          heliRef.current.userData.initialized = true;
          pos.current.set(0, 30, 0);
          setAnimState({ carving: 0, inAir: false, grabbing: false, wipeout: true });
        }
        
        if (false) { // Skip the approach entirely
`);

fs.writeFileSync('components/Player.js', code);
