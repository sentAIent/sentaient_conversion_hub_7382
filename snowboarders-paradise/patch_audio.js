const fs = require('fs');

let audioContent = fs.readFileSync('components/AudioManager.js', 'utf8');
audioContent = audioContent.replace('export function useGameAudio(playerState) {', 'export function useGameAudio(playerState, gameStarted) {');
audioContent = audioContent.replace('useEffect(() => {', 'useEffect(() => {\n    if (!gameStarted) return;');
// It needs to recreate context if gameStarted changes, so add it to dependency array
audioContent = audioContent.replace('  }, []);', '  }, [gameStarted]);');
fs.writeFileSync('components/AudioManager.js', audioContent);

let appContent = fs.readFileSync('App.js', 'utf8');
appContent = appContent.replace(
  'useGameAudio({ speed: gameStarted ? 30 : 0, isAirborne: false, isCarving: false });',
  'useGameAudio({ speed: gameStarted ? 30 : 0, isAirborne: false, isCarving: false }, gameStarted);'
);
fs.writeFileSync('App.js', appContent);

console.log("Audio patched.");
