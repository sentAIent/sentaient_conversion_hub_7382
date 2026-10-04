const fs = require('fs');

function replaceShadow(file, search, replace) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(search, replace);
  fs.writeFileSync(file, content);
}

replaceShadow('App.js', 
  "shadowColor: '#00d0ff', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.5, shadowRadius: 10", 
  "boxShadow: '0px 4px 10px rgba(0, 208, 255, 0.5)'");

replaceShadow('App.js', 
  /shadowColor: '#000',\s*shadowOffset: { width: 0, height: 20 },\s*shadowOpacity: 0,\s*shadowRadius: 30,/g, 
  "boxShadow: '0px 20px 30px rgba(0, 0, 0, 0)',");

replaceShadow('components/ComplianceGate.js',
  /shadowColor: '#ff0077',\s*shadowOffset: { width: 0, height: 0 },\s*shadowOpacity: 0.5,\s*shadowRadius: 20,/g,
  "boxShadow: '0px 0px 20px rgba(255, 0, 119, 0.5)',");

replaceShadow('components/ComplianceGate.js',
  /shadowColor: '#00ffff',\s*shadowOffset: { width: 0, height: 0 },\s*shadowOpacity: 0.8,\s*shadowRadius: 15,/g,
  "boxShadow: '0px 0px 15px rgba(0, 255, 255, 0.8)',");

replaceShadow('components/VideoStudio.js',
  /shadowColor: '#00d0ff',\s*shadowOffset: { width: 0, height: 0 },\s*shadowOpacity: 0.5,\s*shadowRadius: 15,/g,
  "boxShadow: '0px 0px 15px rgba(0, 208, 255, 0.5)',");

console.log("Shadows fixed.");
