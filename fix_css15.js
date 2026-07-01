const fs = require('fs');
let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');

// The ultimate fail-safe. If CSS specificity is beating my !important rules somehow
// (maybe an inline style in the JS injected HTML?), or if it's being hidden by an ancestor,
// I need to ensure the ancestor chain isn't hidden.
css += `
/* PREVENT HANGAR CAMERA FROM HIDING SPECS */
.ship-specs * {
    visibility: visible !important;
    opacity: 1 !important;
    display: block !important;
}

/* Except for flex containers that need to be flex */
.specs-grid {
    display: grid !important;
}
.spec-item, .spec-meta, .spec-line {
    display: flex !important;
}
.spec-bar, .spec-bar-fill {
    display: block !important;
}
.spec-actions {
    display: flex !important;
}

/* Remove 3D transform that pushes it behind the camera */
.hangar-viewport {
    perspective: none !important;
}
#hangarModal .modal-content {
    transform: none !important;
}
`;

fs.writeFileSync('interstellar-game/styles.css', css);
