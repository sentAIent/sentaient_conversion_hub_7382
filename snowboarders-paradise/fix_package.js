const fs = require('fs');
const pkg = require('./package.json');
const deps = Object.keys(pkg.dependencies);

deps.forEach(dep => {
  try {
    require.resolve(dep + '/package.json');
  } catch(e) {
    console.log(`Removing missing dependency from package.json: ${dep}`);
    delete pkg.dependencies[dep];
  }
});

fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
console.log("Cleaned package.json!");
