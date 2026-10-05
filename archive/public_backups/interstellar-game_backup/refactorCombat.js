const fs = require('fs');

const extractAndReplace = () => {
    let code = fs.readFileSync('script.js', 'utf8');

    // Method names to extract for Combat module
    const methodsToExtract = [
        'spawnEnemyShips',
        'updateEnemyShips',
        'updateEnemyBullets',
        'spawnBoss',
        'updateBoss'
    ];

    let extractedMethodsCode = `class CombatManager {
    constructor(game) {
        this.game = game;
    }
\n`;

    methodsToExtract.forEach(method => {
        const methodStartRegex = new RegExp(`^\\s+${method}\\s*\\(.*?\\)\\s*{`, 'm');
        const match = methodStartRegex.exec(code);
        if (match) {
            const startIndex = match.index;
            let braceCount = 0;
            let i = startIndex + match[0].length - 1; 
            do {
                if (code[i] === '{') braceCount++;
                if (code[i] === '}') braceCount--;
                i++;
            } while (braceCount > 0 && i < code.length);

            const endIndex = i;
            let methodCode = code.substring(startIndex, endIndex);
            
            // Rewrite `this.property` to `this.game.property` inside the CombatManager
            let modifiedMethodCode = methodCode.replace(/this\./g, 'this.game.');
            modifiedMethodCode = modifiedMethodCode.replace(/this\.game\.game\./g, 'this.game.');
            
            // Fix calls to itself so it calls this. method instead of this.game. method
            // e.g. this.spawnEnemyShips inside CombatManager should be this.spawnEnemyShips, not this.game.spawnEnemyShips
            methodsToExtract.forEach(innerMethod => {
                const innerCallRegex = new RegExp(`this\\.game\\.${innerMethod}\\(`, 'g');
                modifiedMethodCode = modifiedMethodCode.replace(innerCallRegex, `this.${innerMethod}(`);
            });
            
            extractedMethodsCode += modifiedMethodCode + '\n\n';

            // Remove method from original script.js
            code = code.substring(0, startIndex) + code.substring(endIndex);
        }
    });

    extractedMethodsCode += `}\nwindow.CombatManager = CombatManager;\n`;

    // Ensure directory exists
    if (!fs.existsSync('js/entities')) {
        fs.mkdirSync('js/entities', { recursive: true });
    }

    fs.writeFileSync('js/entities/Combat.js', extractedMethodsCode);

    // Provide a binding in `init`
    code = code.replace(
        'this.inputManager = new window.InputManager(this);',
        'this.inputManager = new window.InputManager(this);\n        this.combatManager = new window.CombatManager(this);'
    );

    // Replace all calls `this.spawnEnemyShips(` with `this.combatManager.spawnEnemyShips(`
    methodsToExtract.forEach(method => {
        const callRegex = new RegExp(`this\\.${method}\\(`, 'g');
        code = code.replace(callRegex, `this.combatManager.${method}(`);
    });

    fs.writeFileSync('script_step5.js', code);
    console.log("Combat Extraction script complete.");
};

extractAndReplace();
