import fs from 'fs';
const text = fs.readFileSync('scratch/big_data.json', 'utf-8');
const data = JSON.parse(text);

const futures = data.offerCounts['player-futures'];
console.log('type:', typeof futures[0].offers);
console.log('keys:', Object.keys(futures[0].offers).slice(0, 5));
const firstKey = Object.keys(futures[0].offers)[0];
console.log('value:', JSON.stringify(futures[0].offers[firstKey], null, 2));
