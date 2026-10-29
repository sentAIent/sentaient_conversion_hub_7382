const fs = require('fs');
let content = fs.readFileSync('index.js', 'utf8');

const replacement = `
app.get('/api/osint/overpass', async (req, res) => {
  const data = await watchtower.fetchAllOverpass(req.query.bbox);
  res.json(data);
});
`;

content = content.replace(/app\.get\('\/api\/osint\/cameras'[\s\S]*?\}\);/g, '');
content = content.replace(/app\.get\('\/api\/osint\/springs'[\s\S]*?\}\);/g, '');
content = content.replace(/app\.get\('\/api\/osint\/power'[\s\S]*?\}\);/g, replacement);
content = content.replace(/app\.get\('\/api\/osint\/aviation'[\s\S]*?\}\);/g, '');
content = content.replace(/app\.get\('\/api\/osint\/emergency'[\s\S]*?\}\);/g, '');

fs.writeFileSync('index.js', content);
