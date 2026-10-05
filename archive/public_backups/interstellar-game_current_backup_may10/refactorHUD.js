const fs = require('fs');

const extractAndReplace = () => {
    let code = fs.readFileSync('script.js', 'utf8');

    // Method names to extract
    const methodsToExtract = [
        'updateWalletUI',
        'updateInventoryUI',
        'updateShipStatus',
        'updateMissionHUD',
        'updateFactionHUD',
        'showToast'
    ];

    let extractedMethodsCode = `class HUDManager {
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
            
            // Rewrite `this.property` to `this.game.property` inside the HUDManager
            // BUT beware of `this.game` becoming `this.game.game`.
            // A safer approach: replace `this.` with `this.game.` globally in the text, 
            // then fix `this.game.game` back to `this.game`.
            // Also preserve method signature ` methodName() { ` -> no `this.` needed there.
            let modifiedMethodCode = methodCode.replace(/this\./g, 'this.game.');
            modifiedMethodCode = modifiedMethodCode.replace(/this\.game\.game\./g, 'this.game.');
            
            // Ensure first line doesn't have a mangled name if 'this.' was somewhere (unlikely in method declaration)
            
            extractedMethodsCode += modifiedMethodCode + '\n';

            // Remove method from original script.js
            code = code.substring(0, startIndex) + code.substring(endIndex);
        }
    });

    extractedMethodsCode += `}\nwindow.HUDManager = HUDManager;\n`;

    // Ensure directory exists
    if (!fs.existsSync('js/ui')) {
        fs.mkdirSync('js/ui', { recursive: true });
    }

    fs.writeFileSync('js/ui/HUD.js', extractedMethodsCode);

    // Provide a binding in `init`
    // "this.hudManager = new window.HUDManager(this);"
    code = code.replace(
        'this.inputManager = new window.InputManager(this);',
        'this.inputManager = new window.InputManager(this);\n        this.hudManager = new window.HUDManager(this);'
    );

    // Replace all calls `this.updateWalletUI(` with `this.hudManager.updateWalletUI(`
    methodsToExtract.forEach(method => {
        const callRegex = new RegExp(`this\\.${method}\\(`, 'g');
        code = code.replace(callRegex, `this.hudManager.${method}(`);
    });

    fs.writeFileSync('script_step4.js', code);
    console.log("HUD Extraction script complete.");
};

extractAndReplace();
