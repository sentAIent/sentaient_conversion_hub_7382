const fs = require('fs');

let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');

// Insert .specs-content-wrapper properly
if (!css.includes('rgba(5, 10, 20, 0.6)')) {
    css = css.replace(/\.specs-content-wrapper \{[\s\S]*?\}/, `.specs-content-wrapper {
            background: rgba(5, 10, 20, 0.6);
            border: 1px solid rgba(0, 243, 255, 0.2);
            border-radius: 8px;
            padding: 15px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 12px;
            box-shadow: inset 0 0 20px rgba(0, 243, 255, 0.05);
        }`);
}

fs.writeFileSync('interstellar-game/styles.css', css);
