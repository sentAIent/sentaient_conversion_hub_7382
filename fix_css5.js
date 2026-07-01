const fs = require('fs');
let code = fs.readFileSync('interstellar-game/styles.css', 'utf8');

const missingCss = `
        .specs-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid rgba(0, 243, 255, 0.2);
            padding-bottom: 8px;
            margin-bottom: 15px;
        }

        .bay-num {
            font-family: monospace;
            color: var(--accent);
            font-size: 12px;
            letter-spacing: 2px;
        }

        .bay-status {
            font-family: monospace;
            font-size: 10px;
            padding: 3px 8px;
            border-radius: 4px;
            letter-spacing: 1px;
        }

        .status-ready {
            background: rgba(0, 255, 100, 0.1);
            color: #00ff64;
            border: 1px solid rgba(0, 255, 100, 0.3);
        }

        .status-locked {
            background: rgba(255, 50, 50, 0.1);
            color: #ff3232;
            border: 1px solid rgba(255, 50, 50, 0.3);
        }

        .ship-title {
            font-family: 'Exo 2', sans-serif;
            font-size: 28px;
            font-weight: 800;
            color: #fff;
            letter-spacing: 3px;
            margin: 0;
            text-transform: uppercase;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }

        .ship-subtitle {
            font-family: monospace;
            color: var(--text-dim);
            font-size: 11px;
            letter-spacing: 1px;
            margin-bottom: 20px;
        }
`;

if (!code.includes('.specs-header {')) {
    code = code.replace(/\.specs-content-wrapper \{/, missingCss + '\n        .specs-content-wrapper {');
}

fs.writeFileSync('interstellar-game/styles.css', code);
