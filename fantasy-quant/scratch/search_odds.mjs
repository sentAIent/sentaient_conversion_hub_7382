import fs from 'fs';
const text = fs.readFileSync('scratch/big_data.json', 'utf-8');
const data = JSON.parse(text);

const futures = data.offerCounts['player-futures'];
console.log('futures count:', futures.length);

futures.slice(0, 3).forEach(f => {
  console.log('---', f.name);
  console.log(Object.keys(f));
});
