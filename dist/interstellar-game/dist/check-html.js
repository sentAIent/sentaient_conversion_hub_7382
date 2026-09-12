const fs = require('fs');
const html = fs.readFileSync('/Users/ute/Dev/sentaient_conversion_hub_7382-Website/public/interstellar-game/index.html', 'utf8');

let tags = [];
const regex = /<\/?div([^>]*)>/g;
let match;
while ((match = regex.exec(html)) !== null) {
    if (match[0].startsWith('</')) {
        tags.pop();
    } else {
        tags.push({ id: match[1].match(/id="([^"]+)"/), class: match[1].match(/class="([^"]+)"/), line: html.substring(0, match.index).split('\n').length });
    }
}
console.log("Unclosed divs:", tags.map(t => ({ id: t.id ? t.id[1] : null, class: t.class ? t.class[1] : null, line: t.line })));
