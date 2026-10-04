const fs = require('fs');
let appCode = fs.readFileSync('App.js', 'utf8');
appCode = appCode.replace(/const \[camDistance, setCamDistance\] = useState\(7\);/, 'const [camDistance, setCamDistance] = useState(3.5);');
appCode = appCode.replace(/const \[camHeight, setCamHeight\] = useState\(3\);/, 'const [camHeight, setCamHeight] = useState(1.5);');
fs.writeFileSync('App.js', appCode);

let playerCode = fs.readFileSync('components/Player.js', 'utf8');
playerCode = playerCode.replace(/let idealOffset = _idealOffset\.set\(0, camHeight \+ 3, camDistance \+ 2\);/, 'let idealOffset = _idealOffset.set(0, camHeight, camDistance);');
playerCode = playerCode.replace(/lookOffset\.y \-= 3\.0;/, 'lookOffset.y -= 1.0;');
fs.writeFileSync('components/Player.js', playerCode);

console.log("Patched camera in App.js and Player.js");
