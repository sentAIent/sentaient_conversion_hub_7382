const fs = require('fs');
const files = [
  'App.js',
  'components/Player.js',
  'components/TrackManager.js',
  'components/GhostRiders.js',
  'components/CarveTrail.js',
  'components/AudioManager.js',
  'components/GraphicsTierManager.js',
  'utils/terrainUtils.js',
  'utils/mockBackend.js'
];
const { parse } = require('@babel/parser');

files.forEach(file => {
  try {
    const code = fs.readFileSync(file, 'utf8');
    parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });
    console.log(`${file}: OK`);
  } catch (e) {
    console.error(`Syntax Error in ${file}:`);
    console.error(e.message);
  }
});
