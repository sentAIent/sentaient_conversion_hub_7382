const fs = require('fs');
let html = fs.readFileSync('mindwave.html', 'utf8');

let parts = html.split('<div class="cymatics-class-section bg-black/40 border border-cyan-500/20 rounded-xl p-4">');

let class0_index = -1;
let class22_index = -1;
let class24_index = -1;
let class25_index = -1;

for (let i = 1; i < parts.length; i++) {
    if (parts[i].includes('[0]')) class0_index = i;
    else if (parts[i].includes('[22]')) class22_index = i;
    else if (parts[i].includes('[24]')) class24_index = i;
    else if (parts[i].includes('[25]')) class25_index = i;
}

console.log({class0_index, class22_index, class24_index, class25_index});
