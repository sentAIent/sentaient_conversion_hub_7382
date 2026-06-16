const fs = require('fs');

const mindwavePath = '/Users/infinitealpha/Dev/BinauralBeats/v7_restore/mindwave.html';
const newGridPath = '/Users/infinitealpha/Dev/BinauralBeats/sentaient_conversion_hub_7382/scratch/new_grid.html';

let html = fs.readFileSync(mindwavePath, 'utf8');
const newGrid = fs.readFileSync(newGridPath, 'utf8');

const tabStart = html.indexOf('<div id="tab-cymatics"');
if (tabStart === -1) throw new Error("Could not find tab-cymatics");

// Where does the first class start?
const firstClassStr = '<div class="cymatics-class-container mb-6">';
const firstClassIndex = html.indexOf(firstClassStr, tabStart);
if (firstClassIndex === -1) throw new Error("Could not find first class");

// Where does the studio tab start?
const studioTabStr = '<!-- TAB: STUDIO -->';
const studioTabIndex = html.indexOf(studioTabStr, firstClassIndex);
if (studioTabIndex === -1) throw new Error("Could not find studio tab");

// Find the two `</div>` tags right before TAB: STUDIO
// The HTML looks like this:
//     </div>
// </div>
// \n            <!-- TAB: STUDIO -->
const lastDivIndex = html.lastIndexOf('</div>', studioTabIndex);
const secondToLastDivIndex = html.lastIndexOf('</div>', lastDivIndex - 1);

// We want to replace everything from `firstClassIndex` up to `secondToLastDivIndex` with `newGrid`.
// Wait, `newGrid` contains its own classes.
// The string up to `firstClassIndex` includes `<div class="sidebar-section">`.
// The string from `secondToLastDivIndex` includes `    </div>\n</div>\n\n            <!-- TAB: STUDIO -->`.

const newHtml = html.substring(0, firstClassIndex) + 
                "\n" + newGrid + "\n        " + 
                html.substring(secondToLastDivIndex);

fs.writeFileSync(mindwavePath, newHtml, 'utf8');
console.log("Successfully replaced cymatics classes with new_grid.html");
