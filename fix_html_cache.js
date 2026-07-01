const fs = require('fs');
let html = fs.readFileSync('interstellar-game/index.html', 'utf8');

// I accidentally overwrote the type="module" previously which might break imports if there are any, though it looks like it was just a regular script tag previously.
// Let's ensure the cache buster is correct at the bottom of the body.
html = html.replace(/<script src="\.\/script\.js\?v=hangar_polish_v6"><\/script>/, '<script src="./script.js?v=hangar_polish_v7"></script>');

fs.writeFileSync('interstellar-game/index.html', html);
