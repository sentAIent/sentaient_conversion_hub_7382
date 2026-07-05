const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix ClauseLibraryView onInsertClause or whatever expects a Promise<string>
// Ah wait, DraftView's onGenerate requires a Promise<string>!
code = code.replace(
    /onGenerate=\{\(\) => \{\}\}/g,
    'onGenerate={async (prompt: string) => { return ""; }}'
);
code = code.replace(
    /onInsertClause=\{\(\) => \{\}\}/g,
    'onInsertClause={async (clause: any) => {}}'
);

fs.writeFileSync('src/App.tsx', code);
