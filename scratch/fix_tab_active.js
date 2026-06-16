const fs = require('fs');
const filePath = 'mindwave.html';
let html = fs.readFileSync(filePath, 'utf8');

const targetStr = '<div id="tab-active" class="tab-panel active space-y-6">\n';
const idx = html.indexOf(targetStr);
if (idx !== -1) {
    html = html.replace(targetStr, '');
    
    // We also need to remove ONE closing </div> before TAB: STUDIO
    // The previous append script put the new UI, and then:
    // </div>
    // </div>
    // <!-- TAB: STUDIO -->
    
    // Let's replace:
    const closeStr = '</div>\n            </div>\n            \n            <!-- TAB: STUDIO -->';
    const replaceStr = '</div>\n            \n            <!-- TAB: STUDIO -->';
    if (html.includes(closeStr)) {
        html = html.replace(closeStr, replaceStr);
    }
    
    fs.writeFileSync(filePath, html);
    console.log("Fixed tab-active div successfully.");
} else {
    console.log("target string not found.");
}
