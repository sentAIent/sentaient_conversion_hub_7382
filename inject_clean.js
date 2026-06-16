const fs = require('fs');

const targetFile = 'mindwave.html';
let html = fs.readFileSync(targetFile, 'utf8');

// 1. Fix 404 images for cymatics 14, 15, 16
html = html.replace(/ai_cymatic_14_\d+\.png/g, (match, offset) => {
    const strBefore = html.substring(0, offset);
    const count = (strBefore.match(/ai_cymatic_14_\d+\.png/g) || []).length;
    return `c14_${count % 10}_final.png`;
});

html = html.replace(/ai_cymatic_15_\d+\.png/g, (match, offset) => {
    const strBefore = html.substring(0, offset);
    const count = (strBefore.match(/ai_cymatic_15_\d+\.png/g) || []).length;
    return `c15_${count % 10}_final.png`;
});

html = html.replace(/ai_cymatic_16_\d+\.png/g, (match, offset) => {
    const strBefore = html.substring(0, offset);
    const count = (strBefore.match(/ai_cymatic_16_\d+\.png/g) || []).length;
    return `c16_${count % 10}_final.png`;
});

// 2. Fix tab-visuals to be active instead of block
html = html.replace('<div id="tab-visuals" class="tab-panel block space-y-6">', '<div id="tab-visuals" class="tab-panel active space-y-6">');

// 3. Inject visualDock properly
const visualDockContent = fs.readFileSync('visual_dock.html', 'utf8');
const tabVisualsStr = '<div id="tab-visuals" class="tab-panel active space-y-6">';
const tabIdx = html.indexOf(tabVisualsStr);

if (tabIdx !== -1 && !html.includes('<!-- MOVED VISUAL DOCK -->')) {
    const insertionPoint = tabIdx + tabVisualsStr.length;
    const wrappedDock = '\n                <!-- MOVED VISUAL DOCK -->\n                <div class="sidebar-section">\n                    <h3 class="section-label">Interactive Modes</h3>\n                    ' + visualDockContent + '\n                </div>\n';
    html = html.substring(0, insertionPoint) + wrappedDock + html.substring(insertionPoint);
}

// 4. Inject Failsafe at the bottom to force switchRightTab
const failsafe = `
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            setTimeout(() => {
                if (window.switchRightTab) {
                    const visBtn = document.getElementById('tour-visuals-tab');
                    if (visBtn) window.switchRightTab('visuals', visBtn);
                    console.log('[Failsafe] Forced right panel state to Visuals on load.');
                }
            }, 300); // Wait for controls_v3 to initialize
        });
    </script>
</body>`;
if (!html.includes('[Failsafe] Forced right panel')) {
    html = html.replace('</body>', failsafe);
}

fs.writeFileSync(targetFile, html);
console.log('Successfully and cleanly fixed v7_restore mindwave.html');
