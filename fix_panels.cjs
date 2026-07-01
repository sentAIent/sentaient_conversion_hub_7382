const fs = require('fs');
let js = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

js = js.replace(
    `['authModal', 'accountModal', 'leaderboardModal', 'achievementsModal', 'settingsModal', 'complianceModal', 'upgradePanel', 'gemGuideModal', 'expandedControlsModal', 'baseBuilderModal'].includes(panel.id)`,
    `['authModal', 'accountModal', 'leaderboardModal', 'achievementsModal', 'settingsModal', 'complianceModal', 'upgradePanel', 'gemGuideModal', 'expandedControlsModal', 'baseBuilderModal', 'matrixPanel', 'cyberPanel'].includes(panel.id)`
);

fs.writeFileSync('public/interstellar-game/script.js', js, 'utf8');
console.log("Added matrixPanel and cyberPanel to close list");
