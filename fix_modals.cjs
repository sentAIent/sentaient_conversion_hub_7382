const fs = require('fs');
let html = fs.readFileSync('public/interstellar-game/index.html', 'utf8');

// Fix achievementsModal properly closing
html = html.replace(
    `<div id="achievementsList" style="display: flex; flex-direction: column; gap: 8px; max-height: 300px; overflow-y: auto; margin-bottom: 15px;">
            <div style="text-align:center; color:#aaa;">Loading...</div>
                <button class="btn-small" onclick="document.getElementById('achievementsModal').classList.add('hidden')" style="width: 100%;">Close</button>
    </div>`,
    `<div id="achievementsList" style="display: flex; flex-direction: column; gap: 8px; max-height: 300px; overflow-y: auto; margin-bottom: 15px;">
            <div style="text-align:center; color:#aaa;">Loading...</div>
        </div>
        <button class="btn-close-modal" onclick="document.getElementById('achievementsModal').classList.add('hidden')">CLOSE MEDALS</button>
    </div>`
);

// Account modal
html = html.replace(
    `<button class="btn-small" onclick="document.getElementById('accountModal').classList.add('hidden')" style="margin-top: 5px;">Close</button>`,
    `<button class="btn-close-modal" onclick="document.getElementById('accountModal').classList.add('hidden')">CLOSE ACCOUNT</button>`
);

// Leaderboard modal
html = html.replace(
    `<button class="btn-small" onclick="document.getElementById('leaderboardModal').classList.add('hidden')" style="width: 100%;">Close</button>`,
    `<button class="btn-close-modal" onclick="document.getElementById('leaderboardModal').classList.add('hidden')">CLOSE RANKS</button>`
);

// Auth modal
html = html.replace(
    `<button class="btn-small" onclick="document.getElementById('authModal').classList.add('hidden')" style="margin-top: 5px;">Cancel</button>`,
    `<button class="btn-close-modal" onclick="document.getElementById('authModal').classList.add('hidden')">CANCEL</button>`
);

// Ship/Hangar Modal
html = html.replace(
    `<button class="btn-secondary" onclick="window.game.hideShipModal()">EXIT HANGAR</button>`,
    `<button class="btn-close-modal" onclick="window.game.hideShipModal()" style="width: auto;">EXIT HANGAR</button>`
);

// Clear/Confirmation Modal
html = html.replace(
    `<button class="btn-secondary" onclick="app.closeModal()">Cancel</button>`,
    `<button class="btn-close-modal" onclick="app.closeModal()" style="width: auto;">CANCEL</button>`
);

// Gem Guide Modal
html = html.replace(
    `<button class="btn-secondary" onclick="app.closeModal()">Got it!</button>`,
    `<button class="btn-close-modal" onclick="app.closeModal()" style="width: auto; padding: 10px 30px; font-size: 16px;">GOT IT!</button>`
);

// Expanded Controls Modal
html = html.replace(
    `<button class="btn-secondary" onclick="document.getElementById('expandedControlsModal').classList.add('hidden')">Close Guide</button>`,
    `<button class="btn-close-modal" onclick="document.getElementById('expandedControlsModal').classList.add('hidden')" style="width: auto; padding: 10px 30px; font-size: 16px;">CLOSE GUIDE</button>`
);

// Galactic Exchange (Store) Modal
html = html.replace(
    `<button class="menu-btn" onclick="document.getElementById('galacticExchangeModal').style.display='none'" style="padding: 5px 15px; background: rgba(255,50,50,0.2); border-color: #ff4444; color: #ffaaaa;">CLOSE STORE</button>`,
    `<button class="btn-close-modal" onclick="document.getElementById('galacticExchangeModal').style.display='none'" style="width: auto; padding: 10px 20px;">CLOSE STORE</button>`
);

// Base Builder Modal
html = html.replace(
    `<button class="menu-btn" onclick="document.getElementById('baseBuilderModal').classList.add('hidden')" style="padding: 5px 15px; background: rgba(255,50,50,0.2); border-color: #ff4444; color: #ffaaaa;">EXIT BUILDER</button>`,
    `<button class="btn-close-modal" onclick="document.getElementById('baseBuilderModal').classList.add('hidden')" style="width: auto; padding: 10px 20px;">EXIT BUILDER</button>`
);

// Music & Settings Modal
html = html.replace(
    `<button class="menu-btn" onclick="if(window.app){app.closeMusicSettings();} document.getElementById('musicSettingsModal').style.setProperty('display','none','important');" style="padding: 5px 15px;">CLOSE</button>`,
    `<button class="btn-close-modal" onclick="if(window.app){app.closeMusicSettings();} document.getElementById('musicSettingsModal').style.setProperty('display','none','important');" style="width: auto; padding: 10px 20px;">CLOSE</button>`
);

// Settings Panel (Engine Harmonics / Settings)
html = html.replace(
    `<button class="btn-small" onclick="document.getElementById('settingsModal').classList.add('hidden')" style="width: 100%; margin-top: 15px;">Close</button>`,
    `<button class="btn-close-modal" onclick="document.getElementById('settingsModal').classList.add('hidden')">CLOSE SETTINGS</button>`
);

fs.writeFileSync('public/interstellar-game/index.html', html, 'utf8');
console.log("Updated index.html");
