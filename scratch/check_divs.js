const fs = require('fs');
const html = fs.readFileSync('mindwave.html', 'utf8');

const divStarts = (html.match(/<div/g) || []).length;
const divEnds = (html.match(/<\/div>/g) || []).length;

console.log("Div starts:", divStarts);
console.log("Div ends:", divEnds);
