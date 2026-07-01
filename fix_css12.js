const fs = require('fs');
let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');

css += `
/* DOUBLE DOWN ON VISIBILITY */
#hangarModal {
    display: flex !important;
}

.docking-bay, .bay-walls, .wall-back, .ship-specs, .specs-content-wrapper {
    display: flex !important;
    opacity: 1 !important;
    visibility: visible !important;
}

/* Fix any negative z-index issues from perspective */
.wall-back {
    transform: translateZ(0) !important;
}
`;

fs.writeFileSync('interstellar-game/styles.css', css);
