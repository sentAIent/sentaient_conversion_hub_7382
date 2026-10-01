import fs from 'fs';
const text = fs.readFileSync('scratch/big_data.json', 'utf-8');
const data = JSON.parse(text);

const futures = data.offerCounts['player-futures'];
console.log('participants length:', futures[0].participants.length);
console.log('sample participant:', JSON.stringify(futures[0].participants[0], null, 2));
