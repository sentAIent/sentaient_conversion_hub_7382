const fs = require('fs');
const parser = require('@babel/parser');
try {
  const code = fs.readFileSync('components/Player.js', 'utf-8');
  parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx']
  });
  console.log('Player.js is syntactically valid!');
} catch (e) {
  console.error('Syntax error in Player.js:', e);
}
