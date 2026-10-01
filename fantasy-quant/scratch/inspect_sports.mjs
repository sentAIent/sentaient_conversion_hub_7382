import fs from 'fs';
const text = fs.readFileSync('scratch/big_data.json', 'utf-8');
const data = JSON.parse(text);

const sports = data.sports;
console.log('type:', typeof sports);
if (Array.isArray(sports)) {
    console.log('sports count:', sports.length);
    console.log('sample sport keys:', Object.keys(sports[0]));
    if (sports[0].events) {
       console.log('events count:', sports[0].events.length);
       console.log('event keys:', Object.keys(sports[0].events[0]));
    }
}
