const fs = require('fs');
const filePath = 'binaural-assets/js/ui/controls_v4.js';
let js = fs.readFileSync(filePath, 'utf8');

const mappingFunc = `
window.selectCymaticPattern = function(idx) {
    let classId = 1;
    let varId = 0;
    const sizes = [14, 12, 10, 8, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
    let remaining = idx;
    for (let i = 0; i < sizes.length; i++) {
        if (remaining < sizes[i]) {
            classId = i + 1;
            varId = remaining;
            break;
        }
        remaining -= sizes[i];
    }
    
    // Fallback if somehow out of bounds
    if (classId > 18) { classId = 18; varId = 0; }
    
    console.log(\`[Controls] Mapped old pattern \${idx} to Class \${classId}, Var \${varId}\`);
    window.setCymaticPattern(classId, varId);
    
    // UI Highlighting Sync for old UI
    const btns = document.querySelectorAll('.cymatics-pattern-btn');
    btns.forEach((btn) => {
        const clickAttr = btn.getAttribute('onclick');
        if (clickAttr && clickAttr.includes('selectCymaticPattern(' + idx + ')')) {
            btn.classList.add('active', 'border-purple-400/80', 'bg-purple-400/10');
            btn.style.color = '#ffffff';
        } else if (clickAttr && clickAttr.includes('selectCymaticPattern')) {
            btn.classList.remove('active', 'border-purple-400/80', 'bg-purple-400/10');
            btn.style.color = ''; 
        }
    });
};
`;

if (!js.includes('window.selectCymaticPattern = function')) {
    js += '\n' + mappingFunc;
    fs.writeFileSync(filePath, js);
    console.log("Added mapping function to controls_v4.js");
} else {
    console.log("Function already exists.");
}
