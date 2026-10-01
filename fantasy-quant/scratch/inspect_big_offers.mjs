import fs from 'fs';
const text = fs.readFileSync('scratch/big_data.json', 'utf-8');
const data = JSON.parse(text);

const offers = data.offers || {};
console.log('Offers count:', Object.keys(offers).length);
// If it is an array
if (Array.isArray(offers)) {
    console.log('first offer', JSON.stringify(offers[0], null, 2));
} else {
    // If object
    const k = Object.keys(offers)[0];
    console.log('first offer', JSON.stringify(offers[k], null, 2));
}
