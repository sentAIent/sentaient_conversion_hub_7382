const fs = require('fs');
let js = fs.readFileSync('interstellar-game/script.js', 'utf8');

// I am going to inject an absolute inline style onto the specsCard when it's created,
// just in case CSS specificity or some other script is overriding it.

js = js.replace(/specsCard\.innerHTML = \`/g, `
            // ABSOLUTE NUCLEAR INLINE STYLE
            specsCard.style.cssText = "display: flex !important; flex-direction: column !important; visibility: visible !important; opacity: 1 !important; z-index: 2147483647 !important; pointer-events: all !important; position: absolute !important; left: 450px !important; top: 50px !important; width: 350px !important; height: 400px !important; background: rgba(0, 20, 40, 0.9) !important; color: white !important;";
            
            specsCard.innerHTML = \``);

fs.writeFileSync('interstellar-game/script.js', js);
