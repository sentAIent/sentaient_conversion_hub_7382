import fs from 'fs';

const text = fs.readFileSync('scratch/target_script.js', 'utf-8');
const data = JSON.parse(text);

const offers = data.offers;
console.log('Offers keys:', Object.keys(offers));
console.log('Offers array length if array:', Array.isArray(offers) ? offers.length : 'not array');
if (Array.isArray(offers) && offers.length > 0) {
  console.log(JSON.stringify(offers[0], null, 2));
} else {
  // might be an object mapping
  const keys = Object.keys(offers);
  if (keys.length > 0) {
    console.log(JSON.stringify(offers[keys[0]], null, 2));
  }
}
