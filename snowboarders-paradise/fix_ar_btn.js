const fs = require('fs');
let code = fs.readFileSync('App.js', 'utf8');
code = code.replace("  arToggleBtnActive: {\n    backgroundColor: '#00d0ff',\n    borderColor: '#00d0ff',\n  },", "  arToggleBtnActive: {\n    backgroundColor: '#00ffff',\n    borderColor: '#00ffff',\n    boxShadow: '0px 0px 20px rgba(0, 255, 255, 1)',\n  },");
code = code.replace("  arToggleTextActive: {\n    color: '#000',\n  }", "  arToggleTextActive: {\n    color: '#000',\n    fontWeight: '900',\n  }");
fs.writeFileSync('App.js', code);
console.log("Fixed AR button styling");
