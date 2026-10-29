const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

// 1. Add trickMsgRef
code = code.replace("const [trickMsg, setTrickMsg] = useState(\"\");", "const [trickMsg, setTrickMsg] = useState(\"\");\n  const trickMsgRef = useRef(\"\");\n  const updateTrickMsg = (msg) => { if (trickMsgRef.current !== msg) { trickMsgRef.current = msg; setTrickMsg(msg); } };");

// 2. Replace setTrickMsg with updateTrickMsg everywhere
code = code.replace(/setTrickMsg\(/g, "updateTrickMsg(");

// 3. Add named tricks logic in useFrame
const trickLogic = `
    if (inAir) {
       if (controls.current.jump && left) updateTrickMsg("RODEO FLIP!");
       else if (controls.current.jump && right) updateTrickMsg("CORKSCREW!");
       else if (controls.current.jump) updateTrickMsg("FRONTFLIP!");
       else if (controls.current.grab) updateTrickMsg("MUTE GRAB!");
    }
`;
code = code.replace("if (inAir) {", trickLogic + "\n    if (inAir) {");

// 4. Perfect landing
code = code.replace("if (wasInAir.current && !inAir) {", "if (wasInAir.current && !inAir) { updateTrickMsg(\"PERFECT LANDING!\"); setTimeout(() => updateTrickMsg(\"\"), 1500);");

fs.writeFileSync('components/Player.js', code);
