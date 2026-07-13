const fs = require('fs');
const path = require('path');

const fixVisibility = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (!file.endsWith('.jsx')) continue;
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace `if (!visible) return null;` with nothing
    if (content.includes('if (!visible) return null;')) {
      content = content.replace(/if\s*\(!visible\)\s*return\s*null;/g, '');
      
      // Update the main group to pass the visible prop
      // It usually looks like <group position={position} rotation={rotation}>
      content = content.replace(/<group position=\{position\}/g, '<group visible={visible} position={position}');
      
      fs.writeFileSync(filePath, content);
      console.log('Fixed', file);
    } else {
        // Just in case it's formatted slightly differently or missing
        // e.g. WormholeMatrix doesn't have position usually
        if (file === 'WormholeMatrix.jsx') {
            content = content.replace(/if\s*\(!visible\)\s*return\s*null;/g, '');
            content = content.replace(/<group>/g, '<group visible={visible}>');
            fs.writeFileSync(filePath, content);
            console.log('Fixed', file);
        }
    }
  }
};

fixVisibility(path.join(__dirname, 'src/pages/demo3d/worlds'));
fixVisibility(path.join(__dirname, 'src/pages/demo3d/wormholes'));
