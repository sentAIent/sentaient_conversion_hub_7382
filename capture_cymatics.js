const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, 'binaural-assets', 'images', 'cymatics');
if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir, { recursive: true });
}

(async () => {
    console.log("Launching headless browser to capture cymatics...");
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-web-security']
    });
    
    const page = await browser.newPage();
    // Square viewport for perfectly square thumbnails
    await page.setViewport({ width: 800, height: 800 });
    
    // Go to local dev server
    await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2' });
    
    console.log("Page loaded. Hiding UI overlay to capture raw canvas...");
    
    // Hide UI elements to capture raw WebGL output
    await page.evaluate(() => {
        document.querySelectorAll('body > *:not(canvas)').forEach(e => e.style.opacity = '0');
        // Open cymatics mode to initialize engine if not already
        if (window.setVisualMode) window.setVisualMode('cymatics');
    });
    
    // Allow engine to start
    await new Promise(r => setTimeout(r, 2000));
    
    const variations = {
        1: 14,
        2: 12,
        3: 10,
        4: 8,
        5: 10,
        6: 10,
        7: 10,
        8: 10,
        9: 10,
        10: 10,
        11: 10,
        12: 10,
        13: 10,
        14: 10,
        15: 10,
        16: 10,
        17: 10,
        18: 10
    };

    let htmlUpdates = {};

    for (let c = 18; c <= 18; c++) {
        for (let v = 0; v < variations[c]; v++) {
            console.log(`Capturing Class ${c}, Variation ${v}...`);
            
            // Set the pattern
            await page.evaluate((classId, varId) => {
                if (window.setCymaticPattern) {
                    window.setCymaticPattern(classId, varId);
                }
            }, c, v);
            
            // Wait a few frames for shader uniforms to update and render
            await new Promise(r => setTimeout(r, 400));
            
            const filename = `c${c}_${v}_final.png`;
            const filepath = path.join(imgDir, filename);
            
            // Capture the square viewport
            await page.screenshot({ path: filepath });
            
            htmlUpdates[`c${c}_${v}`] = `binaural-assets/images/cymatics/${filename}`;
        }
    }
    
    await browser.close();
    console.log("All thumbnails captured!");
    
    // Now let's update mindwave.html!
    console.log("Updating mindwave.html with new thumbnail paths...");
    const htmlPath = path.join(__dirname, 'mindwave.html');
    let htmlStr = fs.readFileSync(htmlPath, 'utf8');
    
    for (let c = 18; c <= 18; c++) {
        for (let v = 0; v < variations[c]; v++) {
            // Regex to find the <img> tag inside the button with onclick="window.setCymaticPattern(c, v)"
            // Since it's multiline, we find the onclick line, and replace the src on the NEXT line
            const searchPattern = new RegExp(`onclick="window.setCymaticPattern\\(${c}, ${v}\\)"\\>\\s*\\<img src="([^"]+)"`, 'g');
            htmlStr = htmlStr.replace(searchPattern, `onclick="window.setCymaticPattern(${c}, ${v})">\n                    <img src="${htmlUpdates[`c${c}_${v}`]}"`);
        }
    }
    
    fs.writeFileSync(htmlPath, htmlStr);
    console.log("mindwave.html updated successfully!");
    
})();
