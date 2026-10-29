const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');

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

files.forEach(file => {
  try {
    const code = fs.readFileSync(file, 'utf8');
    babel.transformSync(code, {
      filename: file,
      presets: ['@babel/preset-react']
    });
    console.log(`${file}: OK`);
  } catch (e) {
    console.error(`Error in ${file}:`);
    console.error(e.message);
  }
});
