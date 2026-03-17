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
    console.log('Server running at http://127.0.0.1:8125/');
    
    const browser = await puppeteer.launch({ headless: "new", args: ['--no-sandbox'] });
    const page = await browser.newPage();
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));
    
    const url = 'http://127.0.0.1:8125/mindwave.html';
    await page.goto(url, { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 3000));
    
    // Evaluate if the UI is visible
    const uiVisible = await page.evaluate(() => {
        const header = document.getElementById('topControlBar');
        return header ? window.getComputedStyle(header).opacity : 'missing';
    });
    console.log('UI Opacity:', uiVisible);

    await browser.close();
    server.close();
    process.exit(0);
});
