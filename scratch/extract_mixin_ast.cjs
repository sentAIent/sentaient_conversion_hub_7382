const fs = require('fs');
const parser = require('@babel/core').parse;
const traverse = require('@babel/core').traverse;

const filepath = 'public/interstellar-game/script.js';
const mixinName = process.argv[2];
const outpath = process.argv[3];
const methodNames = process.argv.slice(4);

if (methodNames.length === 0) {
    console.error("Usage: node extract_mixin_ast.cjs <MixinName> <outpath> <method1> [method2...]");
    process.exit(1);
}

let content = fs.readFileSync(filepath, 'utf8');

const ast = parser(content, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
});

let methodsToExtract = [];

traverse(ast, {
    ClassMethod(path) {
        if (path.parentPath.parent.id && path.parentPath.parent.id.name === 'InterstellarEngine') {
            const methodName = path.node.key.name;
            if (methodNames.includes(methodName)) {
                // Get exactly the method text from the source
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

// Sort by start descending to remove from content without messing up indices
methodsToExtract.sort((a, b) => b.start - a.start);

for (const m of methodsToExtract) {
    content = content.substring(0, m.start) + content.substring(m.end);
    console.log(`Extracted: ${m.name}`);
}

// Create the Mixin file
let mixinCode = `export function ${mixinName}(EngineClass) {\n    Object.assign(EngineClass.prototype, {\n\n`;

methodsToExtract.reverse(); // put back in original order for mixin file
for (let i = 0; i < methodsToExtract.length; i++) {
    const m = methodsToExtract[i];
    // Replace leading whitespace of the first line to be 8 spaces
    let lines = m.code.split('\n');
    const firstLineMatch = lines[0].match(/^\s*/);
    const leadingWhitespace = firstLineMatch ? firstLineMatch[0].length : 0;
    
    lines = lines.map(line => {
        if (line.startsWith(' '.repeat(leadingWhitespace))) {
            return '        ' + line.substring(leadingWhitespace);
        }
        return '        ' + line;
    });
    
    mixinCode += lines.join('\n');
    if (i < methodsToExtract.length - 1) {
        mixinCode += ',\n\n';
    } else {
        mixinCode += '\n';
    }
}

mixinCode += `    });\n}\n`;

fs.mkdirSync(outpath.substring(0, outpath.lastIndexOf('/')), { recursive: true });
fs.writeFileSync(outpath, mixinCode);
fs.writeFileSync(filepath, content);

console.log(`Successfully extracted ${methodsToExtract.length} methods to ${outpath}`);
