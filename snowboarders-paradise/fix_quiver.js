const fs = require('fs');
let code = fs.readFileSync('components/GearQuiver.js', 'utf8');

code = code.replace(/export function GearQuiver\(\) \{/g, "export function GearQuiver({ onClose }) {");

const oldReturnRegex = /if \(\!isOpen\) \{[\s\S]*?return \([\s\S]*?<\/TouchableOpacity>\n    \);\n  \}/s;
code = code.replace(oldReturnRegex, "");

const oldControlsRegex = /<TouchableOpacity onPress=\{\(\) => setIsOpen\(false\)\} style=\{styles\.iconBtn\}>/g;
const newControls = `<TouchableOpacity onPress={onClose} style={styles.iconBtn}>`;
code = code.replace(oldControlsRegex, newControls);

fs.writeFileSync('components/GearQuiver.js', code);
