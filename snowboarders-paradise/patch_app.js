const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

if (!code.includes('<TouchableOpacity style={[styles.arToggleBtn, arMode && styles.arToggleBtnActive]}')) {
  // Pass arMode to TrackManager
  code = code.replace(/<TrackManager gameStarted=\{gameStarted\} \/>/g, '<TrackManager gameStarted={gameStarted} arMode={arMode} />');
  
  // Add the floating toggle button
  const toggleCode = `
      {/* AR Toggle HUD Element */}
      {activeTab === 'EXPLORE' && (
        <View style={{ position: 'absolute', bottom: 40, right: 40, zIndex: 100 }}>
          <TouchableOpacity 
            style={[styles.arToggleBtn, arMode && styles.arToggleBtnActive]} 
            onPress={() => setArMode(!arMode)}
          >
            <Text style={[styles.arToggleText, arMode && styles.arToggleTextActive]}>👁️ AR MAP {arMode ? 'ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>
      )}
  `;
  
  code = code.replace(/\{showMap && <MapModal onClose=\{\(\) => setShowMap\(false\)\} \/>\}/g, '{showMap && <MapModal onClose={() => setShowMap(false)} />}\n' + toggleCode);
  
  fs.writeFileSync('App.js', code);
  console.log("Patched App.js");
}
