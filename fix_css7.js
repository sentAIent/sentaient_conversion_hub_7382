const fs = require('fs');

let css = fs.readFileSync('interstellar-game/styles.css', 'utf8');

// Find the bottom wall-back block
const match = css.match(/\.wall-back \{\s*display: flex;\s*align-items: center;\s*justify-content: space-between;[\s\S]*?left: 50%;\s*\}/);

if (match) {
    const block = match[0];
    
    // Remove it from the bottom
    css = css.replace(block, '');
    
    // Find the first definition of .docking-bay to put it near there
    const dockingBayMatch = css.match(/\.docking-bay \{[\s\S]*?\}/);
    if (dockingBayMatch) {
        css = css.replace(dockingBayMatch[0], dockingBayMatch[0] + '\n\n        ' + block);
    } else {
        // Fallback
        css = block + '\n\n' + css;
    }
    
    fs.writeFileSync('interstellar-game/styles.css', css);
    console.log("Fixed CSS cascade order!");
} else {
    console.log("Could not find bottom wall-back block!");
}
