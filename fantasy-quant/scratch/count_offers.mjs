import fs from 'fs';
const text = fs.readFileSync('scratch/target_script.js', 'utf-8');
const data = JSON.parse(text);
console.log('Total offers:', data.offers.length);
