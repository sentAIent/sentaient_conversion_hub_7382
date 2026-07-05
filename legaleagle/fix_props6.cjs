const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Fix unused variables prompt and clause
code = code.replace(
    /onGenerate=\{async \(prompt: string\) => \{ return ""; \}\}/g,
    'onGenerate={async (_prompt: string) => { return ""; }}'
);
code = code.replace(
    /onInsertClause=\{async \(clause: any\) => \{\}\}/g,
    'onInsertClause={async (_clause: any) => {}}'
);

fs.writeFileSync('src/App.tsx', code);
