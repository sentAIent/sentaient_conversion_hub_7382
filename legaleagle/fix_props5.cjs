const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Use setIsMobileMenuOpen
code = code.replace(
    'if (isMobileMenuOpen) {}',
    'if (isMobileMenuOpen) { setIsMobileMenuOpen(false); }'
);

fs.writeFileSync('src/App.tsx', code);
