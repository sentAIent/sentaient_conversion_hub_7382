import fs from 'fs';

const text = fs.readFileSync('scratch/target_script.js', 'utf-8');
const data = JSON.parse(text);

// Traverse the JSON object to find the odds data
let foundProps = [];
function findOffers(obj) {
  if (!obj) return;
  if (Array.isArray(obj)) {
    obj.forEach(findOffers);
  } else if (typeof obj === 'object') {
    if (obj.market_id && obj.participant_name) {
      foundProps.push(obj);
    }
    Object.values(obj).forEach(findOffers);
  }
}

findOffers(data);
console.log('Found', foundProps.length, 'props/offers');
if (foundProps.length > 0) {
  console.log(JSON.stringify(foundProps.slice(0, 2), null, 2));
}

// Write all to file
fs.writeFileSync('scratch/all_props.json', JSON.stringify(foundProps, null, 2));
