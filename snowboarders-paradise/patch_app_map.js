const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

if (!code.includes("import { MapModal }")) {
  code = code.replace(/import { Store } from '\.\/components\/Store';/, "import { Store } from './components/Store';\nimport { MapModal } from './components/MapModal';");
}

if (!code.includes("const [showMap, setShowMap] = useState(false);")) {
  code = code.replace(/const \[showStore, setShowStore\] = useState\(false\);/, "const [showStore, setShowStore] = useState(false);\n  const [showMap, setShowMap] = useState(false);");
}

if (!code.includes("<TouchableOpacity onPress={() => setShowMap(true)}>")) {
  code = code.replace(/<TouchableOpacity onPress=\{\(\) => setActiveTab\('EXPLORE'\)\}>/, "<TouchableOpacity onPress={() => setActiveTab('EXPLORE')}><Text style={[styles.navTabText, activeTab==='EXPLORE'&&styles.navTabTextActive]}>EXPLORE</Text></TouchableOpacity>\n            <TouchableOpacity onPress={() => setShowMap(true)}><Text style={[styles.navTabText, showMap&&styles.navTabTextActive]}>MAP</Text></TouchableOpacity>");
}

if (!code.includes("{showMap && <MapModal onClose={() => setShowMap(false)} />}")) {
  code = code.replace(/\{showStore && <Store onClose=\{\(\) => setShowStore\(false\)\} \/>\}/, "{showStore && <Store onClose={() => setShowStore(false)} />}\n      {showMap && <MapModal onClose={() => setShowMap(false)} />}");
}

fs.writeFileSync('App.js', code);
