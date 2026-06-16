const puppeteer = require('puppeteer-core');
const cp = require('child_process');

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            headless: "new"
        });
        const page = await browser.newPage();
        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle0' });
        
        await page.evaluate(() => {
            return new Promise(resolve => {
                if (window.viz3D) return resolve();
                const check = setInterval(() => {
                    if (window.viz3D) {
                        clearInterval(check);
                        resolve();
                    }
                }, 100);
            });
        });

        // Click the LION button
        await page.evaluate(() => {
            const lionBtn = document.querySelectorAll('.c24-layer3-btn')[1];
            lionBtn.click();
        });

        // Wait a moment for texture load
        await new Promise(r => setTimeout(r, 1000));

        // Check activeAuraId and the current uniform texture src
        const result = await page.evaluate(() => {
            const core = window.viz3D.cymaticsCore;
            const mat = core.materials[24];
            return {
                activeClassId: core.activeClassId,
                activeAuraId: core.activeAuraId,
                textureSrc: mat.uniforms.uTexture.value ? mat.uniforms.uTexture.value.image.src : null,
                texture3Src: mat.uniforms.uTexture3.value ? mat.uniforms.uTexture3.value.image.src : null
            };
        });

        console.log(JSON.stringify(result, null, 2));
        await browser.close();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
