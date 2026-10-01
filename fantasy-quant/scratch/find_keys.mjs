import fs from 'fs';

const text = fs.readFileSync('scratch/target_script.js', 'utf-8');
const data = JSON.parse(text);

function findCeeDee(obj, path = '') {
  if (!obj) return;
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => findCeeDee(item, `${path}[${i}]`));
  } else if (typeof obj === 'object') {
    Object.entries(obj).forEach(([key, val]) => {
      if (typeof val === 'string' && val.includes('CeeDee Lamb')) {
        console.log('Found CeeDee at', `${path}.${key}`);
      }
      findCeeDee(val, `${path}.${key}`);
    });
  }
}

findCeeDee(data);
