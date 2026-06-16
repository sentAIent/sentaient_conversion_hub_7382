const fs = require('fs');

const goldFile = 'mindwave-CYMATICS-RESTORED-GOLD.html';
const targetFile = 'mindwave.html';

const goldContent = fs.readFileSync(goldFile, 'utf8');
let targetContent = fs.readFileSync(targetFile, 'utf8');

// The cymatics section in GOLD
const goldStartStr = '<!-- SECTION: Cymatic Geometry (Fractal Resonance) -->';
const goldEndStr = '<!-- SECTION: Neural Journeys -->';
const goldStart = goldContent.indexOf(goldStartStr);
const goldEnd = goldContent.indexOf(goldEndStr);

if (goldStart !== -1 && goldEnd !== -1) {
    const cymaticsBlock = goldContent.substring(goldStart, goldEnd);
    
    // In target, we want to replace the whole #tab-cymatics
    const targetStartStr = '<!-- TAB: CYMATICS -->';
    const targetEndStr = '<!-- TAB: STUDIO -->';
    const targetStart = targetContent.indexOf(targetStartStr);
    const targetEnd = targetContent.indexOf(targetEndStr);
    
    if (targetStart !== -1 && targetEnd !== -1) {
        // We will replace the TAB content with the CYMATICS block from GOLD, wrapped in the tab-panel div
        const newTabContent = targetStartStr + '\n            <div id="tab-cymatics" class="tab-panel hidden space-y-8">\n' + cymaticsBlock + '\n            </div>\n\n            ' + targetEndStr;
        
        targetContent = targetContent.substring(0, targetStart) + newTabContent + targetContent.substring(targetEnd + targetEndStr.length);
        
        fs.writeFileSync(targetFile, targetContent);
        console.log("Successfully restored cymatics tab from GOLD.");
    } else {
        console.log("Could not find target strings in mindwave.html");
    }
} else {
    console.log("Could not find gold strings in mindwave-CYMATICS-RESTORED-GOLD.html");
}
