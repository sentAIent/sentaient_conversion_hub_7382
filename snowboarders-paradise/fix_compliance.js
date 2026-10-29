const fs = require('fs');
let cg = fs.readFileSync('components/ComplianceGate.js', 'utf8');
cg = cg.replace("setIsCompliant(true);", "window.localStorage.setItem('sp_compliance_accepted', 'true'); setIsCompliant(true);");
fs.writeFileSync('components/ComplianceGate.js', cg);
