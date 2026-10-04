const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// We need a ref for smooth lookAt interpolation
code = code.replace(/const lastCamToggle = useRef\(0\);/, "const lastCamToggle = useRef(0);\n  const currentLookAt = useRef(new THREE.Vector3(0, 30, 0));");

// In cinematic hover, update currentLookAt
code = code.replace(/camera\.lookAt\(heliRef\.current\.position\);/, "currentLookAt.current.lerp(heliRef.current.position, 0.2); camera.lookAt(currentLookAt.current);");

// In playing/falling mode, lerp the lookAt
code = code.replace(/camera\.lookAt\(lookAt\);/, "currentLookAt.current.lerp(lookAt, 0.1); camera.lookAt(currentLookAt.current);");

fs.writeFileSync('components/Player.js', code);
