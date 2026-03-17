const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css'
};

const server = http.createServer((request, response) => {
    let filePath = './public' + request.url.split('?')[0];
    if (filePath == './public/') filePath = './public/mindwave.html';

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            response.writeHead(404);
            response.end('404');
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
});

server.listen(8125, async () => {
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    
    await page.goto('http://127.0.0.1:8125/mindwave.html', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 4000));
    
    await page.screenshot({ path: '/tmp/mindwave-screenshot.png' });

    await browser.close();
    server.close();
    process.exit(0);
});
