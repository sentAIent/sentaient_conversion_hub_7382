const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');

const weatherJSX = `
              {weather ? (
                <View style={styles.weatherRow}>
                  <Text style={styles.subtitle}>Condition: {weather.condition}</Text>
                  <Text style={styles.stat}>Temp: {formatTemp(weather.temperature)} | Snowfall: {formatSnowfall(weather.snowfall)}</Text>
                </View>
              ) : (
                <Text style={styles.subtitle}>Fetching global weather...</Text>
              )}
              
              <SafetyHUD regionId={activeRegion} />
`;

// Remove it from centerOverlay
code = code.replace(weatherJSX, "");

// Add it to topRightInfo
code = code.replace(/<View style=\{styles\.topRightInfo\}>\n          \n        <\/View>/, `<View style={styles.topRightInfo}>\n${weatherJSX}\n        </View>`);

fs.writeFileSync('App.js', code);
