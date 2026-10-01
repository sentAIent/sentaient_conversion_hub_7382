import fs from 'fs';

const text = fs.readFileSync('scratch/target_script.js', 'utf-8');
const data = JSON.parse(text);

console.log('Top level keys:', Object.keys(data));

function findKeys(obj, path = '') {
  if (path.length > 50) return;
  if (!obj) return;
  if (Array.isArray(obj)) {
    // skip arrays to avoid noise, just look at object keys
  } else if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (key.toLowerCase().includes('odds') || key.toLowerCase().includes('line')) {
        console.log('Found key', key, 'at', path);
      }
      if (!Array.isArray(obj[key])) {
        findKeys(obj[key], `${path}.${key}`);
      }
    });
  }
}
findKeys(data);
