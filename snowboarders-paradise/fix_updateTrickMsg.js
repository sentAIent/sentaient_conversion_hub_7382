const fs = require('fs');
let code = fs.readFileSync('components/Player.js', 'utf8');

code = code.replace("const updateTrickMsg = (msg) => { if (trickMsgRef.current !== msg) { trickMsgRef.current = msg; updateTrickMsg(msg); } };", "const updateTrickMsg = (msg) => { if (trickMsgRef.current !== msg) { trickMsgRef.current = msg; setTrickMsg(msg); } };");

fs.writeFileSync('components/Player.js', code);
