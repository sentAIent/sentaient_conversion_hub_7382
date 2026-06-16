const fs = require('fs');

const file = 'mindwave.html';
let html = fs.readFileSync(file, 'utf8');

// 1. Fix 404 images for cymatics 14, 15, 16
// They are likely in blocks of 10.
html = html.replace(/ai_cymatic_14_\d+\.png/g, (match, offset) => {
    // Find index of this occurrence among the 10
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

// 2. Fix tab-visuals to be active instead of hidden
html = html.replace('<div id="tab-visuals" class="tab-panel hidden space-y-6">', '<div id="tab-visuals" class="tab-panel active space-y-6">');

// 3. Move visualDock into tab-visuals
const dockStart = html.indexOf('<div id="visualDock"');
if (dockStart !== -1) {
    let divCount = 0;
    let dockEnd = -1;
    let inTag = false;
    let currentTag = '';

    for (let i = dockStart; i < html.length; i++) {
        if (html[i] === '<') {
            inTag = true;
            currentTag = '';
        } else if (html[i] === '>') {
            inTag = false;
            if (currentTag.startsWith('div ') || currentTag === 'div') {
                divCount++;
            } else if (currentTag === '/div') {
                divCount--;
                if (divCount === 0) {
                    dockEnd = i + 1;
                    break;
                }
            }
        } else if (inTag) {
            currentTag += html[i];
        }
    }

    if (dockEnd !== -1) {
        let dockHtml = html.substring(dockStart, dockEnd);
        // Clean up any weird classes
        dockHtml = dockHtml.replace(/class="order-3[^"]+"/, 'class="flex flex-wrap justify-center items-center gap-3 mt-0 px-2 py-4 glass-lux rounded-2xl border !border-[var(--accent)]/30 shadow-xl overflow-visible w-full z-50 relative tooltip-container ui-fade-target pointer-events-auto"');
        
        // Remove dock from its original place
        html = html.substring(0, dockStart) + html.substring(dockEnd);

        // Find tab-visuals
        const tabVisualsStr = '<div id="tab-visuals" class="tab-panel active space-y-6">';
        const tabIdx = html.indexOf(tabVisualsStr);
        if (tabIdx !== -1) {
            const insertionPoint = tabIdx + tabVisualsStr.length;
            const wrappedDock = `\n                <!-- MOVED VISUAL DOCK -->\n                <div class="sidebar-section">\n                    <h3 class="section-label">Interactive Modes</h3>\n                    ` + dockHtml + `\n                </div>\n`;
            html = html.substring(0, insertionPoint) + wrappedDock + html.substring(insertionPoint);
        }
    }
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

fs.writeFileSync(file, html);
console.log('Successfully fixed v7_restore mindwave.html');
