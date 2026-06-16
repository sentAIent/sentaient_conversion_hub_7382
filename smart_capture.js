const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'public', 'binaural-assets', 'images', 'cymatics');
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

(async () => {
    console.log("Parsing mindwave.html to find buttons...");
    const htmlPath = path.join(__dirname, 'public', 'mindwave.html');
    let htmlStr = fs.readFileSync(htmlPath, 'utf8');
    
    // Find all window.setCymaticPattern(c, v)
    const regex = /onclick="window\.setCymaticPattern\((\d+),\s*(\d+)\)"/g;
    let match;
    const targets = [];
    while ((match = regex.exec(htmlStr)) !== null) {
        const c = parseInt(match[1]);
        const v = parseInt(match[2]);
        if (c === 17 && v === 9) { 
            targets.push({c, v});
        }
    }
    
    console.log(`Found ${targets.length} buttons to capture for Classes 1-21.`);
    
    console.log("Launching headless browser...");
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-web-security']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 800 });
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2' });
    
    console.log("Hiding UI overlay...");
    await page.evaluate(() => {
        document.querySelectorAll('body > *:not(canvas)').forEach(e => e.style.opacity = '0');
        if (window.setVisualMode) window.setVisualMode('cymatics');
    });
    
    await new Promise(r => setTimeout(r, 3000)); // wait for init
    
    let htmlUpdates = {};
    
    for (const t of targets) {
        const c = t.c;
        const v = t.v;
        console.log(`Capturing Class ${c}, Variation ${v}...`);
        
        await page.evaluate((classId, varId) => {
            if (window.setCymaticPattern) {
                window.setCymaticPattern(classId, varId);
            }
        }, c, v);
        
        await new Promise(r => setTimeout(r, 600)); // wait for shader compilation and render
        
        const filename = `c${c}_${v}_real.png`;
        const filepath = path.join(imgDir, filename);
        
        await page.screenshot({ path: filepath });
        
        htmlUpdates[`c${c}_${v}`] = `binaural-assets/images/cymatics/${filename}`;
    }
    
    await browser.close();
    
    console.log("Updating mindwave.html...");
    for (const t of targets) {
        const c = t.c;
        const v = t.v;
        const searchPattern = new RegExp(`(onclick="window\\.setCymaticPattern\\(${c},\\s*${v}\\)"\\>\\s*\\<img src=")[^"]+(")`, 'g');
        const replaceString = `$1${htmlUpdates["c" + c + "_" + v]}$2`;
        htmlStr = htmlStr.replace(searchPattern, replaceString);
    }
    
    fs.writeFileSync(htmlPath, htmlStr);
    console.log("DONE!");
    
})();
