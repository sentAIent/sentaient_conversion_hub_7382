const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ 
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox'] 
        });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

        console.log("Navigating to http://localhost:5173/mindwave.html");
        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle2' });

        console.log("Waiting for viz3D initialization...");
        await page.waitForFunction(() => window.viz3D && window.viz3D.cymaticsCore, { timeout: 10000 });

        console.log("Setting Cymatics Pattern to 24, 0...");
        await page.evaluate(() => {
            if (window.setCymaticPattern) {
                window.setCymaticPattern(24, 0);
            }
        });

        await new Promise(r => setTimeout(r, 1000));

        console.log("Evaluating initial uLayer2Type...");
        const initialVal = await page.evaluate(() => {
            return window.viz3D.cymaticsCore.materials[24].uniforms.uLayer2Type.value;
        });
        console.log(`Initial uLayer2Type: ${initialVal}`);

        console.log("Clicking button 1 (Star Cluster) in DOM...");
        await page.evaluate(() => {
            // Find the button by checking its onclick attribute
            const buttons = Array.from(document.querySelectorAll('button'));
            const btn = buttons.find(b => b.getAttribute('onclick') === 'window.setConstellationLayer2Type(1)');
            if (btn) {
                console.log("Found button, clicking it.");
                btn.click();
            } else {
                console.log("Button not found! Calling function directly.");
                window.setConstellationLayer2Type(1);
            }
        });

        await new Promise(r => setTimeout(r, 500));

        const finalVal = await page.evaluate(() => {
            return window.viz3D.cymaticsCore.materials[24].uniforms.uLayer2Type.value;
        });
        console.log(`Final uLayer2Type: ${finalVal}`);

        if (finalVal === 1.0) {
            console.log("TEST PASSED");
        } else {
            console.log("TEST FAILED");
        }

        await browser.close();
    } catch (err) {
        console.error("TEST FAILED with error:", err);
        process.exit(1);
    }
})();
