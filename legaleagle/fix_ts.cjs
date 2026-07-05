const fs = require('fs');

// App.tsx
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/currentTheme\.background/g, 'currentTheme.appBg');
code = code.replace(/currentTheme\.text/g, 'currentTheme.panelText');

// Missing Sidebar props
code = code.replace(
    /onAnalyze=\{handleAnalyze\}\n\s*\/>/g,
    'onAnalyze={handleAnalyze}\n                contractType={contractType}\n                setContractType={setContractType}\n                onOpenPricing={() => setIsPricingModalOpen(true)}\n            />'
);

// Missing EditorView props
code = code.replace(
    /scanProgress=\{scanProgress\}\n\s*\/>/g,
    'scanProgress={scanProgress}\n                        onAddAnnotation={() => {}}\n                    />'
);

// Missing AnalysisView props
code = code.replace(
    /currentTheme=\{currentTheme\}\n\s*\/>/g,
    'currentTheme={currentTheme}\n                        onDeleteAnnotation={() => {}}\n                    />'
);

// Remove isRoastMode from DraftView and ClauseLibraryView
code = code.replace(/isRoastMode=\{isRoastMode\}\n\s*\/>/g, '/>');

// Add onUpgrade to PricingView
code = code.replace(
    /<PricingView\n\s*currentTheme=\{currentTheme\}\n\s*\/>/g,
    '<PricingView\n                        currentTheme={currentTheme}\n                        onUpgrade={() => {}}\n                    />'
);

fs.writeFileSync('src/App.tsx', code);

// PrivacyPolicyView.tsx
let privacyCode = fs.readFileSync('src/views/PrivacyPolicyView.tsx', 'utf8');
privacyCode = privacyCode.replace(/currentTheme\.text/g, 'currentTheme.panelText');
privacyCode = privacyCode.replace(/currentTheme\.border/g, 'currentTheme.docBorder');
fs.writeFileSync('src/views/PrivacyPolicyView.tsx', privacyCode);

// TOSView.tsx
let tosCode = fs.readFileSync('src/views/TOSView.tsx', 'utf8');
tosCode = tosCode.replace(/currentTheme\.text/g, 'currentTheme.panelText');
tosCode = tosCode.replace(/currentTheme\.border/g, 'currentTheme.docBorder');
fs.writeFileSync('src/views/TOSView.tsx', tosCode);

// ErrorBoundary.tsx
let ebCode = fs.readFileSync('src/components/layout/ErrorBoundary.tsx', 'utf8');
ebCode = ebCode.replace(/import React, /g, 'import ');
fs.writeFileSync('src/components/layout/ErrorBoundary.tsx', ebCode);

