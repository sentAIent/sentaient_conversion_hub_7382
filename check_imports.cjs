const fs = require('fs');
const path = require('path');
const file = fs.readFileSync('src/Routes.jsx', 'utf8');
const imports = [...file.matchAll(/import.*?['"]([^'"]+)['"]/g)];
imports.forEach(match => {
  const impPath = match[1];
  if (impPath.startsWith('.')) {
    const fullPath = path.resolve('src', impPath);
    let exists = fs.existsSync(fullPath) || fs.existsSync(fullPath + '.js') || fs.existsSync(fullPath + '.jsx');
    if (!exists && fullPath.includes('/pages/')) {
       exists = fs.existsSync(fullPath + '/index.js') || fs.existsSync(fullPath + '/index.jsx');
    }
    if (!exists) console.log("Missing:", impPath);
  }
});
