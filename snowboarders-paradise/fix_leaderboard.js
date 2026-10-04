const fs = require('fs');
let code = fs.readFileSync('components/Leaderboard.js', 'utf8');

code = code.replace(/export function Leaderboard\(\{ regionName \}\) \{/g, "export function Leaderboard({ regionName, onClose }) {");

const oldReturnRegex = /if \(viewState === 'HIDDEN'\) \{[\s\S]*?const isMaximized = viewState === 'MAXIMIZED';/s;
const newReturn = "const isMaximized = viewState === 'MAXIMIZED';";
code = code.replace(oldReturnRegex, newReturn);

const oldControlsRegex = /<TouchableOpacity onPress=\{\(\) => setViewState\('HIDDEN'\)\} style=\{styles\.iconBtn\}>/g;
const newControls = `<TouchableOpacity onPress={onClose} style={styles.iconBtn}>`;
code = code.replace(oldControlsRegex, newControls);

fs.writeFileSync('components/Leaderboard.js', code);
