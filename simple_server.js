const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Strip query strings (e.g. ?v=V111) for local file resolution
    const [urlPath] = req.url.split('?');
    let url = urlPath === '/' ? '/mindwave.html' : urlPath;
    let filePath = path.join(__dirname, 'public', url);

    fs.readFile(filePath, (error, content) => {
        if (error) {
            // Fallback for root-level files if public check fails
            let rootPath = path.join(__dirname, url);
            fs.readFile(rootPath, (rootError, rootContent) => {
                if (rootError) {
                    res.writeHead(404);
                    res.end('Not Found');
                } else {
                    const ext = path.extname(url);
                    const contentType = ext === '.js' ? 'application/javascript' : (ext === '.css' ? 'text/css' : 'text/html');
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(rootContent, 'utf-8');
                }
            });
        } else {
            const ext = path.extname(url);
            const contentType = ext === '.js' ? 'application/javascript' : (ext === '.css' ? 'text/css' : 'text/html');
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server running at http://0.0.0.0:3000/');
});
