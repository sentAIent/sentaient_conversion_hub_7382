const fs = require('fs');
const parser = require('@babel/parser');
['App.js', 'components/TrackManager.js', 'components/DetailedModels.js'].forEach(file => {
  try {
    const code = fs.readFileSync(file, 'utf-8');
    parser.parse(code, { sourceType: 'module', plugins: ['jsx'] });
    console.log(file + ' is syntactically valid!');
  } catch (e) {
    console.error('Syntax error in ' + file + ':', e.message);
  }
});
