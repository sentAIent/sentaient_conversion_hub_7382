const fs = require('fs');
let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');

css += `
/* HARD OVERRIDE FOR HANGAR LAYOUT */
.docking-bay {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 100vw !important;
    height: 100vh !important;
}

.wall-back {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    width: 850px !important;
    height: 520px !important;
    transform: none !important;
    position: relative !important;
    top: auto !important;
    left: auto !important;
    background: 
        radial-gradient(circle at 75% 50%, rgba(0, 243, 255, 0.18) 0%, transparent 55%),
        linear-gradient(135deg, rgba(2, 5, 10, 0.95) 0%, rgba(5, 15, 30, 0.85) 100%) !important;
    padding: 30px !important;
    opacity: 1 !important;
    visibility: visible !important;
    z-index: 100 !important;
}

.ship-hologram {
    width: 400px !important;
    height: 400px !important;
    position: relative !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
}

.ship-specs {
    width: 400px !important;
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    opacity: 1 !important;
    visibility: visible !important;
    position: relative !important;
    z-index: 200 !important;
    background: none !important;
    pointer-events: auto !important;
}

.specs-content-wrapper {
    display: flex !important;
    flex-direction: column !important;
    gap: 12px !important;
    opacity: 1 !important;
    visibility: visible !important;
    background: rgba(5, 10, 20, 0.8) !important;
    border: 1px solid rgba(0, 243, 255, 0.3) !important;
    border-radius: 8px !important;
    padding: 20px !important;
    z-index: 300 !important;
}

/* Prevent Media Queries from destroying the layout on desktop */
@media (min-width: 1000px) {
    .wall-back {
        flex-direction: row !important;
    }
}
`;

fs.writeFileSync('interstellar-game/styles.css', css);
