const fs = require('fs');
let html = fs.readFileSync('interstellar-game/index.html', 'utf8');

// There's a static .ship-specs still inside index.html that might be conflicting.
// Look at line 673 in index.html (from earlier greps). We need to remove the static one to prevent duplicate IDs or layout confusion.

html = html.replace(/<div class="ship-specs">\s*<h3>MODEL: INTERCEPTOR<\/h3>[\s\S]*?<\/div>\s*<\/div>\s*<div class="ship-hologram">/, '<div class="ship-specs" id="static-specs-fallback" style="display:none;"></div></div><div class="ship-hologram">');

fs.writeFileSync('interstellar-game/index.html', html);
