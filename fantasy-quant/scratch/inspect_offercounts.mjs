import fs from 'fs';
const text = fs.readFileSync('scratch/big_data.json', 'utf-8');
const data = JSON.parse(text);

const oc = data.offerCounts;
console.log('offerCounts type:', typeof oc);
console.log('offerCounts keys:', Object.keys(oc));
if (oc['player-futures']) {
    console.log('player-futures count:', oc['player-futures'].length);
    const pf = oc['player-futures'];
    console.log('first player-future keys:', Object.keys(pf[0]));
    console.log('first player-future market_id:', pf[0].market_id);
    if (pf[0].offers) {
        console.log('first player-future offers type:', typeof pf[0].offers);
        if (Array.isArray(pf[0].offers)) {
           console.log('first player-future offers length:', pf[0].offers.length);
        } else {
           console.log('first player-future offers keys length:', Object.keys(pf[0].offers).length);
        }
    }
}
