const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'app');

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      if (content.includes('router.back()') && !content.includes('useSafeBack')) {
        console.log(`Processing: ${fullPath}`);
        
        // Calculate relative path to useSafeBack
        const depth = fullPath.split(path.sep).length - path.join(__dirname, 'src', 'app').split(path.sep).length;
        const relativePath = depth === 0 ? '../hooks/useSafeBack' : '../'.repeat(depth) + '../hooks/useSafeBack';
        
        // Add import
        const importStatement = `import { useSafeBack } from '${relativePath}';\n`;
        // Insert after 'expo-router' import if exists, else top
        if (content.includes("from 'expo-router';")) {
          content = content.replace(/(import .* from 'expo-router';)/, `$1\n${importStatement}`);
        } else {
          content = importStatement + content;
        }

        // Add safeBack initialization inside component
        // Match the component declaration
        content = content.replace(/(export default function \w+\(.*\) \{|export default const \w+ = \(.*\) => \{|const \w+ = \(.*\) => \{)/, `$1\n  const safeBack = useSafeBack();\n`);
        
        // Replace router.back()
        content = content.replace(/router\.back\(\)/g, 'safeBack()');
        
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Done replacing router.back()');
