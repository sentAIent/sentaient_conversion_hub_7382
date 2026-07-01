const fs = require('fs');
let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');

css += `
/* PREVENT HANGAR CAMERA FROM HIDING SPECS */
/* The layout logic previously pushed .ship-specs way behind the camera in Z space */
#hangarModal .modal-content {
    perspective: 1000px !important;
    overflow: visible !important;
}

.docking-bay {
    transform: none !important;
    perspective: none !important;
}

.wall-back {
    transform: none !important;
}

/* Hardcode exact pixel positions to prevent flexbox collapse */
.ship-specs {
    position: absolute !important;
    left: 450px !important; /* To the right of the hologram */
    top: 50px !important;
    width: 350px !important;
    height: 400px !important;
    display: block !important;
    background: rgba(0, 20, 40, 0.9) !important; /* Make sure background is solid so we can see it */
}

.ship-hologram {
    position: absolute !important;
    left: 20px !important;
    top: 50px !important;
}

@media (max-width: 900px) {
    .ship-specs {
        left: 20px !important;
        top: 350px !important;
    }
}
`;

fs.writeFileSync('interstellar-game/styles.css', css);
