const fs = require('fs');
let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');

css += `
/* Nuclear option to ensure hangar visibility. Period. */
#hangarModal {
    z-index: 2147483647 !important;
}

.docking-bay {
    z-index: 2147483647 !important;
    perspective: none !important;
    transform-style: flat !important;
    background: transparent !important;
}

.wall-back {
    z-index: 2147483647 !important;
    transform: none !important;
}

.ship-specs {
    display: flex !important;
    flex-direction: column !important;
    visibility: visible !important;
    opacity: 1 !important;
    z-index: 2147483647 !important;
    pointer-events: all !important;
    position: relative !important;
}

.specs-content-wrapper {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    z-index: 2147483647 !important;
    position: relative !important;
}
`;

fs.writeFileSync('interstellar-game/styles.css', css);
