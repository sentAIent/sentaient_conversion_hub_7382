const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const bad = "<TouchableOpacity onPress={() => setShowMap(true)}><Text style={[styles.navTabText, showMap&&styles.navTabTextActive]}>MAP</Text></TouchableOpacity><Text style={[styles.navTabText, activeTab==='EXPLORE'&&styles.navTabTextActive]}>EXPLORE</Text></TouchableOpacity>";
const good = "<TouchableOpacity onPress={() => setShowMap(true)}><Text style={[styles.navTabText, showMap&&styles.navTabTextActive]}>MAP</Text></TouchableOpacity>";

code = code.replace(bad, good);

fs.writeFileSync('App.js', code);
