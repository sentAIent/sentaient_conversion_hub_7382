const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. Add state variables for showSessions and showQuiver
code = code.replace(/const \[showStore, setShowStore\] = useState\(false\);/, "const [showStore, setShowStore] = useState(false);\n  const [showSessions, setShowSessions] = useState(false);\n  const [showQuiver, setShowQuiver] = useState(false);");

// 2. Add them to the top header nav.
const headerNavRegex = /<TouchableOpacity onPress=\{\(\) => setShowStore\(true\)\}.*?<\/TouchableOpacity>/;
const newNavLinks = `<TouchableOpacity onPress={() => setShowSessions(true)}><Text style={[styles.navTabText, showSessions&&styles.navTabTextActive]}>SESSIONS</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setShowQuiver(true)}><Text style={[styles.navTabText, showQuiver&&styles.navTabTextActive]}>QUIVER</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setShowStore(true)}><Text style={[styles.navTabText, showStore&&styles.navTabTextActive]}>STORE</Text></TouchableOpacity>`;
code = code.replace(headerNavRegex, newNavLinks);

// 3. Remove Leaderboard and GearQuiver from the EXPLORE tab
code = code.replace(/<Leaderboard regionName="Global" \/>\n\s*<GearQuiver \/>/g, '');

// 4. Render them globally like other modals
const modalRendersRegex = /\{showStore && <Store onClose=\{\(\) => setShowStore\(false\)\} \/>\}/;
const newModalRenders = `{showSessions && <Leaderboard regionName="Global" onClose={() => setShowSessions(false)} />}\n      {showQuiver && <GearQuiver onClose={() => setShowQuiver(false)} />}\n      {showStore && <Store onClose={() => setShowStore(false)} />}`;
code = code.replace(modalRendersRegex, newModalRenders);

fs.writeFileSync('App.js', code);
