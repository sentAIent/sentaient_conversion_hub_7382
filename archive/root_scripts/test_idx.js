const fs = require('fs');
const js = fs.readFileSync('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'utf8');
const match = js.match(/static get CYMATIC_PATTERNS\(\) \{[\s\S]*?return \[(.*?)\];/);
if(match) {
    console.log("Found array");
} else {
    console.log("Not found array");
}
