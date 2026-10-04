const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

// 1. Find and remove GLOBAL BOTTOM NAV BAR
code = code.replace(/\{\/\* GLOBAL BOTTOM NAV BAR \*\/\}.*?<\/View>\n/s, '');

// 2. We need to add the TOP HEADER BAR just before the 3D Canvas (or just after it).
// The structure is:
// return (
//   <View style={styles.container}>
//     {show3DCanvas && <View style={styles.canvasContainer}>...
// We can inject the Header right after the Canvas.

const headerCode = `
      {/* GLOBAL TOP HEADER BAR */}
      {!gameStarted && (
        <View style={styles.topHeaderBar}>
          <Image source={require('./assets/game_logo.jpg')} style={styles.headerLogo} resizeMode="contain" />
          <View style={styles.headerNav}>
            <TouchableOpacity onPress={() => setActiveTab('EXPLORE')}><Text style={[styles.navTabText, activeTab==='EXPLORE'&&styles.navTabTextActive]}>EXPLORE</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setShowStore(true)}><Text style={[styles.navTabText, showStore&&styles.navTabTextActive]}>STORE</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('STUDIO')}><Text style={[styles.navTabText, activeTab==='STUDIO'&&styles.navTabTextActive]}>STUDIO</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setShowCustomization(true)}><Text style={[styles.navTabText, showCustomization&&styles.navTabTextActive]}>GEAR</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setShowFilmVault(true)}><Text style={[styles.navTabText, showFilmVault&&styles.navTabTextActive]}>VAULT</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setShowSolventCoaching(true)}><Text style={[styles.navTabText, showSolventCoaching&&styles.navTabTextActive]}>COACH</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setShowSettings(true)}><Text style={[styles.navTabText, showSettings&&styles.navTabTextActive]}>SETTINGS</Text></TouchableOpacity>
          </View>
        </View>
      )}

      {/* Weather and Avalanche in Top Right */}
      {!gameStarted && activeTab === 'EXPLORE' && (
        <View style={styles.topRightInfo}>
          {weather ? (
            <View style={styles.weatherBox}>
              <Text style={styles.weatherText}>{weather.condition} | {formatTemp(weather.temperature)} | {formatSnowfall(weather.snowfall)}</Text>
            </View>
          ) : (
            <Text style={styles.weatherText}>Fetching global weather...</Text>
          )}
          <SafetyHUD regionId={activeRegion} />
        </View>
      )}
`;

code = code.replace(/\{\/\* EXPLORE TAB UI \*\/\}/, headerCode + '\n      {/* EXPLORE TAB UI */}');

// 3. Clean up the Main Bottom UI Overlay (remove Logo, Weather, SafetyHUD from the glassCard, leaving only AR/Graphics toggles and Drop In).
const oldOverlayStart = /<View style=\{styles\.overlay\}>.*?<View style=\{styles\.glassCard\}>/s;
const overlayReplacement = `<View style={styles.centerOverlay}>
                <View style={styles.glassCardClean}>`;
code = code.replace(oldOverlayStart, overlayReplacement);

// Remove the old Header row with Title and Logo inside the glassCard
const oldCardHeader = /\{\/\* Header row with Title and AR Toggle \*\/\}.*?<\/View>\n              <\/View>/s;
code = code.replace(oldCardHeader, '');

// Remove the old weather/safety block from the glassCard
const oldWeatherSafety = /\{weather \? \([\s\S]*?<SafetyHUD regionId=\{activeRegion\} \/>/s;
code = code.replace(oldWeatherSafety, '');

fs.writeFileSync('App.js', code);
