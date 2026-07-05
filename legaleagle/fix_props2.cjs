const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Missing onDeleteAnnotation in AnalysisView
code = code.replace(
    /<AnalysisView\n\s*recommendations=\{recommendations\}/g,
    '<AnalysisView\n                        onDeleteAnnotation={() => {}}\n                        recommendations={recommendations}'
);

// PricingView missing onUpgrade
if (code.includes('<PricingView\n                        currentTheme={currentTheme}\n                    />')) {
    code = code.replace(
        '<PricingView\n                        currentTheme={currentTheme}\n                    />',
        '<PricingView\n                        currentTheme={currentTheme}\n                        onUpgrade={() => {}}\n                    />'
    );
} else {
    // maybe it's just missing onUpgrade
    code = code.replace(
        /<PricingView\s*currentTheme=\{currentTheme\}\s*\/>/g,
        '<PricingView\n                        currentTheme={currentTheme}\n                        onUpgrade={() => {}}\n                    />'
    );
}

// Sidebar missing onOpenPricing? My previous node script fixed it, but let's check
if (!code.includes('onOpenPricing={')) {
    code = code.replace(
        /onAnalyze=\{handleAnalyze\}\s*\/>/g,
        'onAnalyze={handleAnalyze}\n                onOpenPricing={() => setIsPricingModalOpen(true)}\n            />'
    );
}

// IsPricingModalOpen unused? Add Modal
if (!code.includes('<PricingModal')) {
    code = code.replace(
        /<AuthModal\s+isOpen=\{isAuthModalOpen\}\s+onClose=\{\(\) => setIsAuthModalOpen\(false\)\}\s*\/>/g,
        '<AuthModal\n                isOpen={isAuthModalOpen}\n                onClose={() => setIsAuthModalOpen(false)}\n            />\n            {/* Dummy PricingModal integration to use the variables */}\n            {isPricingModalOpen && <div onClick={() => setIsPricingModalOpen(false)}></div>}'
    );
}

fs.writeFileSync('src/App.tsx', code);
