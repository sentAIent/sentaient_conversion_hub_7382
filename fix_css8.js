const fs = require('fs');

let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');

// The main thing hiding the specs on some resolutions could be Z-index issues, opacity, or the flex layout hiding overflow.
// Let's add a brute force rule at the very bottom of the CSS to ensure ship-specs is visible.

css += `
/* BRUTE FORCE VISIBILITY FIX FOR SHIP SPECS */
.ship-specs {
    display: flex !important;
    opacity: 1 !important;
    visibility: visible !important;
    z-index: 9999 !important;
}

.specs-content-wrapper {
    display: flex !important;
    opacity: 1 !important;
    visibility: visible !important;
}
`;

fs.writeFileSync('interstellar-game/styles.css', css);
