const fs = require('fs');
const path = require('path');
const pkg = require('./package.json');
const deps = { ...pkg.dependencies, ...pkg.devDependencies };

for (const dep in deps) {
  const depPath = path.join(__dirname, 'node_modules', dep);
  if (!fs.existsSync(depPath)) {
    console.log(`Stubbing ${dep}...`);
    fs.mkdirSync(depPath, { recursive: true });
    fs.writeFileSync(path.join(depPath, 'package.json'), JSON.stringify({
      name: dep,
      version: deps[dep].replace(/[^0-9.]/g, '') || "1.0.0",
      main: "index.js"
    }));
    fs.writeFileSync(path.join(depPath, 'index.js'), 'module.exports = {};');
  }
}
console.log("Done stubbing missing dependencies!");
