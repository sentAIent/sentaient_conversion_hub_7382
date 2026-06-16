const fs = require('fs');
const html = fs.readFileSync('mindwave-CYMATICS-RESTORED-GOLD.html', 'utf8');

const divStarts = (html.match(/<div/g) || []).length;
const divEnds = (html.match(/<\/div>/g) || []).length;

console.log("Original Div starts:", divStarts);
console.log("Original Div ends:", divEnds);
