const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// Change default intro state to 'playing'
code = code.replace(/const \[introState, setIntroState\] = useState\('cinematic_hover'\);/g, "const [introState, setIntroState] = useState('playing');");
code = code.replace(/const \[introState, setIntroState\] = useState\('cinematic_approach'\);/g, "const [introState, setIntroState] = useState('playing');");

// Ensure initialization places them on the ground
code = code.replace(/const pos = useRef\(new THREE\.Vector3\(0, 50, 0\)\);/g, "const pos = useRef(new THREE.Vector3(0, 0, 0));");

// Hide the helicopter
code = code.replace(/<Helicopter ref=\{heliRef\} \/>/g, "{/* Helicopter Removed */}");
code = code.replace(/<CameraDrone ref=\{droneRef\} \/>/g, "{/* Drone Removed */}");

fs.writeFileSync('components/Player.js', code);
