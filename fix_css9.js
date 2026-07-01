const fs = require('fs');
let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');

// The lock overlay is absolutely positioned and has width/height 100%, z-index 10.
// It might be covering the specs entirely, blocking interaction or visibility.
css += `
/* Ensure lock overlay does not block specs container */
.lock-overlay {
    pointer-events: none !important;
}

/* Ensure child elements can still receive events if needed */
.lock-message {
    pointer-events: auto !important;
}
`;

fs.writeFileSync('interstellar-game/styles.css', css);
