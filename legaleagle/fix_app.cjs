const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Restore contractType state
if (!code.includes('const [contractType, setContractType]')) {
    code = code.replace(
        'const [perspective, setPerspective] = useState(\'Buyer\');',
        'const [perspective, setPerspective] = useState(\'Buyer\');\n    const [contractType, setContractType] = useState<any>(\'nda\');\n    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);\n    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);'
    );
}

// Remove the injected onDeleteAnnotation that was incorrectly added everywhere
code = code.replace(/onDeleteAnnotation=\{\(\) => \{\}\}/g, '');

// Clean up any empty newlines left behind by the removal
code = code.replace(/\n\s*\n\s*\/>/g, '\n                    />');
code = code.replace(/\n\s*\/>/g, '\n                    />');

fs.writeFileSync('src/App.tsx', code);
