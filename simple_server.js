const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let url = req.url === '/' ? '/mindwave.html' : req.url;
    let filePath = path.join(__dirname, 'public', url);

    fs.readFile(filePath, (error, content) => {
        if (error) {
            res.writeHead(404);
            res.end('Not Found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server running at http://0.0.0.0:3000/');
});
