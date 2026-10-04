const fs = require('fs');
const path = require('path');

const modulesToStub = [
  'expo-gl', 
  'expo-asset', 
  'expo-file-system', 
  'expo-status-bar', 
  '@expo/metro-runtime'
];

modulesToStub.forEach(dep => {
  const depPath = path.join(__dirname, 'node_modules', dep);
  fs.mkdirSync(depPath, { recursive: true });
  fs.writeFileSync(path.join(depPath, 'package.json'), JSON.stringify({
    name: dep,
    version: "1.0.0",
    main: "index.js"
  }));
  fs.writeFileSync(path.join(depPath, 'index.js'), 'module.exports = {};');
  console.log(`Stubbed ${dep}`);
});
