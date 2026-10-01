import fs from 'fs';

const text = fs.readFileSync('scratch/target_script.js', 'utf-8');
const data = JSON.parse(text);

const futures = data.offerCounts['player-futures'];
console.log(JSON.stringify(futures[1].participants.slice(0, 2), null, 2));
