const fs = require('fs');
let html = fs.readFileSync('public/interstellar-game/index.html', 'utf8');
let js = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

// 1. Fix upgradePanel close button
html = html.replace(
    `<button class="btn-small" onclick="document.getElementById('upgradePanel').classList.add('hidden')"\n            style="margin-top: 15px;">Close Dock</button>`,
    `<button class="btn-close-modal" onclick="document.getElementById('upgradePanel').classList.add('hidden')">CLOSE DOCK</button>`
);

// 2. Fix Store Button opening (needs to remove hidden and add active)
html = html.replace(
    `onclick="document.getElementById('galacticExchangeModal').style.display='flex'; if(window.hapticFeedback) window.hapticFeedback(10);"`,
    `onclick="const m = document.getElementById('galacticExchangeModal'); m.style.display='flex'; m.classList.remove('hidden'); m.classList.add('active'); if(window.hapticFeedback) window.hapticFeedback(10);"`
);

// Fix store modal close button to remove active
html = html.replace(
    `onclick="document.getElementById('galacticExchangeModal').style.display='none'"`,
    `onclick="const m = document.getElementById('galacticExchangeModal'); m.style.display='none'; m.classList.remove('active'); m.classList.add('hidden');"`
);

// 3. Fix global click listener to include upgradePanel and others
js = js.replace(
    `['authModal', 'accountModal', 'leaderboardModal', 'achievementsModal', 'settingsModal', 'complianceModal'].includes(p.id)`,
    `['authModal', 'accountModal', 'leaderboardModal', 'achievementsModal', 'settingsModal', 'complianceModal', 'upgradePanel', 'gemGuideModal', 'expandedControlsModal', 'baseBuilderModal'].includes(p.id)`
);

// 4. Fix missions modal not showing due to .hidden
js = js.replace(
    `overlay.className = 'modal-overlay hidden';\n        // Add active in next frame for transition\n        setTimeout(() => overlay.classList.add('active'), 10);`,
    `overlay.className = 'modal-overlay';\n        // Add active in next frame for transition\n        setTimeout(() => overlay.classList.add('active'), 10);`
);

// 5. Ensure overlay click closes active overlays properly
js = js.replace(
    `        e.target.style.display = 'none';\n        e.target.classList.add('hidden');\n        if (window.app && typeof window.app.closeModal === 'function') {`,
    `        e.target.style.display = 'none';\n        e.target.classList.add('hidden');\n        e.target.classList.remove('active');\n        if (window.app && typeof window.app.closeModal === 'function') {`
);

fs.writeFileSync('public/interstellar-game/index.html', html, 'utf8');
fs.writeFileSync('public/interstellar-game/script.js', js, 'utf8');
console.log("Updated UI logic");
