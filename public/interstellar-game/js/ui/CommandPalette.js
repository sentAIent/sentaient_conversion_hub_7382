/**
 * CommandPalette.js
 * Injects a fast Orama-powered Cmd+K HUD into the Interstellar game.
 */

// We use dynamic imports for Orama to ensure it works via CDN in static vanilla JS
async function initCommandPalette() {
    try {
        const orama = await import('https://unpkg.com/@orama/orama@latest/dist/index.js');
        
        // Game Commands to index
        const gameCommands = [
            { id: '1', action: 'upgrade_shields', label: 'Upgrade Shields', category: 'Ship Systems', icon: '🛡️' },
            { id: '2', action: 'upgrade_weapons', label: 'Upgrade Weapons', category: 'Ship Systems', icon: '⚔️' },
            { id: '3', action: 'repair_hull', label: 'Repair Hull', category: 'Maintenance', icon: '🔧' },
            { id: '4', action: 'toggle_music', label: 'Mute/Unmute Music', category: 'Settings', icon: '🎵' },
            { id: '5', action: 'hyperdrive', label: 'Engage Hyperdrive', category: 'Navigation', icon: '🚀' },
            { id: '6', action: 'lore_earth', label: 'Read Lore: Earth', category: 'Codex', icon: '🌍' },
            { id: '7', action: 'lore_blackhole', label: 'Read Lore: Black Holes', category: 'Codex', icon: '⚫' }
        ];

        // Create Orama DB
        const db = await orama.create({
            schema: {
                id: 'string',
                action: 'string',
                label: 'string',
                category: 'string',
                icon: 'string'
            }
        });

        await orama.insertMultiple(db, gameCommands);
        console.log("[Orama] Interstellar Command Palette Indexed.");

        // Inject UI
        const style = document.createElement('style');
        style.innerHTML = `
            #cmd-palette-overlay {
                display: none;
                position: fixed;
                top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0,0,0,0.7);
                backdrop-filter: blur(5px);
                z-index: 10000;
                justify-content: center;
                align-items: flex-start;
                padding-top: 15vh;
                font-family: monospace;
            }
            #cmd-palette {
                width: 500px;
                background: #0f172a;
                border: 1px solid #1e293b;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                overflow: hidden;
            }
            #cmd-input {
                width: 100%;
                background: transparent;
                border: none;
                padding: 20px;
                font-size: 18px;
                color: #f8fafc;
                outline: none;
                border-bottom: 1px solid #1e293b;
            }
            .cmd-result {
                padding: 12px 20px;
                color: #94a3b8;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 12px;
            }
            .cmd-result:hover, .cmd-result.active {
                background: #1e293b;
                color: #f8fafc;
            }
            .cmd-category {
                font-size: 10px;
                text-transform: uppercase;
                color: #64748b;
                margin-left: auto;
            }
        `;
        document.head.appendChild(style);

        const overlay = document.createElement('div');
        overlay.id = 'cmd-palette-overlay';
        overlay.innerHTML = `
            <div id="cmd-palette">
                <input type="text" id="cmd-input" placeholder="Ship AI Command... (Type to search)" autocomplete="off">
                <div id="cmd-results"></div>
            </div>
        `;
        document.body.appendChild(overlay);

        const input = document.getElementById('cmd-input');
        const resultsContainer = document.getElementById('cmd-results');
        let selectedIndex = 0;
        let currentResults = [];

        // Render function
        const renderResults = (results) => {
            currentResults = results;
            resultsContainer.innerHTML = '';
            results.forEach((res, idx) => {
                const div = document.createElement('div');
                div.className = 'cmd-result' + (idx === selectedIndex ? ' active' : '');
                div.innerHTML = `<span>${res.icon}</span> <span>${res.label}</span> <span class="cmd-category">${res.category}</span>`;
                
                div.onclick = () => executeCommand(res.action);
                div.onmouseover = () => {
                    selectedIndex = idx;
                    renderResults(currentResults);
                };
                
                resultsContainer.appendChild(div);
            });
        };

        // Execution logic
        const executeCommand = (action) => {
            console.log(`[Ship AI] Executing: ${action}`);
            overlay.style.display = 'none';
            // Trigger game events based on action
            if (window.game) {
                switch(action) {
                    case 'toggle_music':
                        if (window.game.audio) window.game.audio.toggleMute();
                        break;
                    case 'upgrade_weapons':
                        if (window.game.player) window.game.player.weaponLevel = Math.min(3, (window.game.player.weaponLevel || 1) + 1);
                        break;
                }
            }
            input.value = '';
        };

        // Input listener
        input.addEventListener('input', async (e) => {
            const term = e.target.value;
            if (!term) {
                renderResults([]);
                return;
            }
            const results = await orama.search(db, { term, tolerance: 1 });
            selectedIndex = 0;
            renderResults(results.hits.map(h => h.document));
        });

        // Keyboard navigation
        input.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                selectedIndex = Math.min(selectedIndex + 1, currentResults.length - 1);
                renderResults(currentResults);
            } else if (e.key === 'ArrowUp') {
                selectedIndex = Math.max(selectedIndex - 1, 0);
                renderResults(currentResults);
            } else if (e.key === 'Enter' && currentResults[selectedIndex]) {
                executeCommand(currentResults[selectedIndex].action);
            }
        });

        // Global Hotkey (Cmd+K or Ctrl+K)
        window.addEventListener('keydown', (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
                if (overlay.style.display === 'flex') {
                    input.focus();
                }
            } else if (e.key === 'Escape' && overlay.style.display === 'flex') {
                overlay.style.display = 'none';
            }
        });

    } catch (err) {
        console.error("Failed to initialize Orama Command Palette:", err);
    }
}

// Init when script loads
initCommandPalette();
