const { JSDOM } = require('jsdom');
const dom = new JSDOM(`
<!DOCTYPE html>
<html>
<body>
    <div id="hangarTrack"></div>
</body>
</html>
`);
global.document = dom.window.document;

const hangarShips = [
    { id: 'saucer', name: 'saucer', speed: 100, stealth: 50, weapons: 50, power: 'test', desc: 'test' }
];

const track = document.getElementById('hangarTrack');
hangarShips.forEach((ship, index) => {
    const bay = document.createElement('div');
    bay.className = 'docking-bay';
    bay.id = `bay-${ship.id}`;
    bay.innerHTML = `
    <div class="bay-walls">
        <div class="wall wall-back">
            <div class="ship-specs" id="specs-${ship.id}"></div>
        </div>
    </div>`;
    track.appendChild(bay);
});

try {
    const shipPrices = { saucer: 500 };
    let playerShip = { type: 'saucer' };
    let unlockedShips = ['saucer'];
    let playerGems = 1000;

    hangarShips.forEach((ship, index) => {
        const specsCard = document.getElementById(`specs-${ship.id}`);
        if (!specsCard) throw new Error("specsCard not found!");

        const isLocked = ship.premium && !unlockedShips.includes(ship.id);
        const price = shipPrices[ship.id] || 1000;

        let btnText = (playerShip && playerShip.type === ship.id) ? 'SELECTED' : 'SELECT SHIP';
        let btnClass = (playerShip && playerShip.type === ship.id) ? 'select-ship-btn active' : 'select-ship-btn';
        let btnActionType = 'select';

        if (isLocked) {
            if (playerGems >= price) {
                btnText = `UNLOCK (${price} GEMS)`;
                btnClass += ' unlock-btn available';
                btnActionType = 'unlock';
            } else {
                btnText = `${price} GEMS REQUIRED`;
                btnClass += ' unlock-btn locked';
                btnActionType = 'locked';
            }
        }

        const speedPercent = Math.round((ship.speed / 140) * 100);

        specsCard.innerHTML = `
            <div class="specs-header">
                <span class="bay-num">UNIT 0${index + 1}</span>
            </div>
            <h3 class="ship-title">${ship.name}</h3>
            <div class="spec-desc">${ship.description || ship.desc || 'No description available.'}</div>
        `;
    });
    console.log("SUCCESS");
} catch (e) {
    console.error("ERROR", e);
}
