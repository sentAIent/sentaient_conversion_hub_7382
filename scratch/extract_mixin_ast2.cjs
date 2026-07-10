const fs = require('fs');
const parser = require('@babel/core').parse;
const traverse = require('@babel/core').traverse;

const filepath = 'public/interstellar-game/script.js';
const mixinName = process.argv[2];
const outpath = process.argv[3];
const methodNames = process.argv.slice(4);

if (methodNames.length === 0) {
    console.error("Usage: node extract_mixin_ast2.cjs <MixinName> <outpath> <method1> [method2...]");
    process.exit(1);
}

let content = fs.readFileSync(filepath, 'utf8');

const ast = parser(content, { sourceType: 'module' });
let methodsToExtract = [];

traverse(ast, {
    ClassMethod(path) {
        if (path.parentPath.parent.id && path.parentPath.parent.id.name === 'InterstellarEngine') {
            const methodName = path.node.key.name;
            if (methodNames.includes(methodName)) {
                const start = path.node.start;
                const end = path.node.end;
                const methodCode = content.substring(start, end);
                methodsToExtract.push({ name: methodName, start, end, code: methodCode });
            }
        }
    }
});

if (methodsToExtract.length === 0) {
    console.log("No methods found to extract.");
    process.exit(0);
}

methodsToExtract.sort((a, b) => b.start - a.start);

for (const m of methodsToExtract) {
    content = content.substring(0, m.start) + content.substring(m.end);
    console.log(`Extracted: ${m.name}`);
}

// Write the script back FIRST so we don't lose it if something throws
fs.writeFileSync(filepath, content);

// Read existing mixin to append
let mixinCode = '';
if (fs.existsSync(outpath)) {
    mixinCode = fs.readFileSync(outpath, 'utf8');
} else {
    mixinCode = `export function ${mixinName}(EngineClass) {\n    Object.assign(EngineClass.prototype, {\n\n    });\n}\n`;
}

// Find insertion point (right before "    });")
const insertPoint = mixinCode.lastIndexOf('    });');
if (insertPoint === -1) {
    console.error("Could not find insertion point in existing mixin file.");
    process.exit(1);
}

let newMethodsCode = '';
// Add comma to previous method if it exists and there's no comma
let preText = mixinCode.substring(0, insertPoint).trimRight();
if (preText.length > 0 && !preText.endsWith(',') && !preText.endsWith('{')) {
    newMethodsCode += ',\n\n';
}

methodsToExtract.reverse(); 
for (let i = 0; i < methodsToExtract.length; i++) {
    const m = methodsToExtract[i];
    let lines = m.code.split('\n');
    const firstLineMatch = lines[0].match(/^\s*/);
    const leadingWhitespace = firstLineMatch ? firstLineMatch[0].length : 0;
    
    lines = lines.map(line => {
        if (line.trim().length === 0) return '';
        if (line.startsWith(' '.repeat(leadingWhitespace))) {
            return '        ' + line.substring(leadingWhitespace);
        }
        return '        ' + line;
    });
    
    newMethodsCode += lines.join('\n');
    if (i < methodsToExtract.length - 1) {
        newMethodsCode += ',\n\n';
    } else {
        newMethodsCode += '\n';
    }
}

mixinCode = preText + (preText.endsWith(',') || preText.endsWith('{') ? '\n\n' : '') + newMethodsCode + mixinCode.substring(insertPoint);

fs.writeFileSync(outpath, mixinCode);
console.log(`Successfully extracted ${methodsToExtract.length} methods to ${outpath}`);
