const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// DraftView
code = code.replace(
    /<DraftView\s+currentTheme=\{currentTheme\}\s*\/>/g,
    '<DraftView\n                        currentTheme={currentTheme}\n                        onGenerate={() => {}}\n                        onSendToEditor={() => {}}\n                        handleExportPdf={() => {}}\n                        handleExportWord={() => {}}\n                    />'
);

// ClauseLibraryView
code = code.replace(
    /<ClauseLibraryView\s+currentTheme=\{currentTheme\}\s*\/>/g,
    '<ClauseLibraryView\n                        currentTheme={currentTheme}\n                        onInsertClause={() => {}}\n                    />'
);

fs.writeFileSync('src/App.tsx', code);
