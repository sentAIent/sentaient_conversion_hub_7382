const fs = require('fs');
let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');

css += `
/* SUPER OVERRIDE FOR HANGAR */
.wall-back {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
}

.ship-specs {
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    background: rgba(0,0,0,0.8) !important;
    z-index: 999999 !important;
    position: relative !important;
}

#hangarModal {
    z-index: 9999999 !important;
}

.modal-content {
    z-index: 9999999 !important;
}
`;
fs.writeFileSync('interstellar-game/styles.css', css);
