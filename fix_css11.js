const fs = require('fs');
let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');

css += `
/* Ensure mobile devices show it as stacked, but still visible */
@media (max-width: 999px) {
    .wall-back {
        flex-direction: column !important;
        width: 90vw !important;
        height: auto !important;
        min-height: 80vh !important;
    }
    .ship-specs {
        width: 100% !important;
        height: auto !important;
        padding-top: 20px !important;
    }
}
`;

fs.writeFileSync('interstellar-game/styles.css', css);
