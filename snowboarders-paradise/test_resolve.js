const fs = require('fs');
const pkg = require('./package.json');
const deps = Object.keys(pkg.dependencies);

// Remove the local node_modules completely so we see what resolves naturally
fs.rmSync('./node_modules', { recursive: true, force: true });

deps.forEach(dep => {
  try {
    const path = require.resolve(dep + '/package.json');
    console.log(`RESOLVED: ${dep} at ${path}`);
  } catch(e) {
    console.log(`MISSING: ${dep}`);
  }
});
