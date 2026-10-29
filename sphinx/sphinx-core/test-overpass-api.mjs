import { WatchtowerService } from './lib/watchtower.mjs';
const wt = new WatchtowerService();
// Provide a small bbox to test
wt.fetchAllOverpass('38.8,-77.1,39.0,-76.9').then(d => console.log(JSON.stringify(d, null, 2))).catch(console.error);
