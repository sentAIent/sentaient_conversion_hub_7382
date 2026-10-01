const fs = require('fs');

let scriptCode = fs.readFileSync('public/interstellar-game/script.js', 'utf8');

const physicsMethods = [
    'updatePlayerShip',
    'updateProjectiles',
    'updateEnemyShips',
    'updateEnemyBullets',
    'updateBoss',
    'updateMinerals',
    'updatePowerUps',
    'updateMaulerDebris',
    'updateHazards',
    'updateHazardEffect',
    'updateDamageParticles',
    'updateSpaceBase'
];

let physicsClassCode = `export class Physics {
    constructor(engine) {
        this.engine = engine;
    }

    update() {
        this.engine.checkAndGenerateSectors();
        this.updatePlayerShip();
        this.updateProjectiles();
        this.updateDamageParticles();
        this.updateMinerals();
        this.updatePowerUps();
        this.updateHazards();
        this.updateSpaceBase();
        this.updateEnemyShips();
        this.updateEnemyBullets();
        this.updateBoss();
    }
`;

let extractedMethods = [];

physicsMethods.forEach(methodName => {
    // Regex to find the method start and its body by matching braces
    // This is a naive bracket matcher, it works if the method is at indentation 4 spaces
    const methodStartRegex = new RegExp(`^    ${methodName}\\([\\s\\S]*?\\)\\s*\\{`, 'm');
    const match = scriptCode.match(methodStartRegex);
    if (!match) {
        console.warn(`Method ${methodName} not found!`);
        return;
    }

    const startIndex = match.index;
    let braceCount = 0;
    let inString = false;
    let stringChar = '';
    let endIndex = -1;

    for (let i = startIndex + match[0].length - 1; i < scriptCode.length; i++) {
        const char = scriptCode[i];
        const prevChar = scriptCode[i - 1];

        if ((char === '"' || char === "'" || char === '\`') && prevChar !== '\\') {
            if (!inString) {
                inString = true;
                stringChar = char;
            } else if (char === stringChar) {
                inString = false;
            }
        }

        if (!inString) {
            if (char === '{') braceCount++;
            else if (char === '}') braceCount--;
        }

        if (braceCount === 0) {
            endIndex = i;
            break;
        }
    }

    if (endIndex !== -1) {
        const fullMethod = scriptCode.substring(startIndex, endIndex + 1);
        
        // Remove it from script.js
        scriptCode = scriptCode.replace(fullMethod, `    // Moved ${methodName} to Physics.js`);

        // Replace `this.` with `this.engine.` in the extracted method
        // Careful with existing `this.engine` or `this.physics` (though there shouldn't be any in old code)
        let modifiedMethod = fullMethod.replace(/this\.(?!engine\b)/g, 'this.engine.');
        
        // However, if the method calls OTHER extracted physics methods, it should use `this.` instead of `this.engine.`
        physicsMethods.forEach(m => {
            const regex = new RegExp(`this\\.engine\\.${m}\\(`, 'g');
            modifiedMethod = modifiedMethod.replace(regex, `this.${m}(`);
        });

        // Add to class code
        physicsClassCode += '\n' + modifiedMethod + '\n';
        extractedMethods.push(methodName);
    }
});

physicsClassCode += `}\n`;

fs.writeFileSync('public/interstellar-game/js/engine/Physics.js', physicsClassCode);

// Inject import and instantiation into script.js
if (!scriptCode.includes("import { Physics }")) {
    scriptCode = scriptCode.replace(
        "import { Renderer } from './js/engine/Renderer.js';",
        "import { Renderer } from './js/engine/Renderer.js';\nimport { Physics } from './js/engine/Physics.js';"
    );
}

if (!scriptCode.includes("this.physics = new Physics(this);")) {
    scriptCode = scriptCode.replace(
        "this.renderer = new Renderer(this);",
        "this.renderer = new Renderer(this);\n        this.physics = new Physics(this);"
    );
}

// Replace the physics update calls in `animate()` with a single `this.physics.update()`
// We know animate() has a block where it calls them.
scriptCode = scriptCode.replace(
    /this\.checkAndGenerateSectors\(\);\s*this\.updatePlayerShip\(\);\s*this\.updateProjectiles\(\);\s*this\.updateDamageParticles\(\);\s*this\.updateMinerals\(\);\s*this\.updatePowerUps\(\);\s*this\.updateHazards\(\);\s*this\.updateSpaceBase\(\);\s*this\.updateEnemyShips\(\);\s*this\.updateEnemyBullets\(\);\s*this\.updateBoss\(\);/m,
    "this.physics.update();"
);

// Any scattered calls to these methods in script.js (e.g., in other functions) should be routed to this.physics
extractedMethods.forEach(m => {
    const regex = new RegExp(`this\\.${m}\\(`, 'g');
    scriptCode = scriptCode.replace(regex, `this.physics.${m}(`);
});

fs.writeFileSync('public/interstellar-game/script.js', scriptCode);
console.log('Successfully patched script.js for Physics! Extracted methods:', extractedMethods.length);
