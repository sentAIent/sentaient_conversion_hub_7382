const http = require('http');
const fs = require('fs');
const path = require('path');

const srv = http.createServer((req, res) => {
    let filePath = path.join(__dirname, '../public/interstellar-game', req.url === '/' ? 'index.html' : req.url);
    if (filePath.includes('?')) filePath = filePath.split('?')[0];
    
    fs.readFile(filePath, (err, data) => {
        if (err) { res.writeHead(404); res.end(JSON.stringify(err)); return; }
        res.writeHead(200);
        res.end(data);
    });
});
srv.listen(8081, () => {
    console.log("Server running on 8081");
    setTimeout(() => process.exit(0), 10000);
});
