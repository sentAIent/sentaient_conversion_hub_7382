const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch({
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
            headless: "new"
        });
        const page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        
        // Listen to console to help debug
        page.on('console', msg => console.log('BROWSER:', msg.text()));

        await page.goto('http://localhost:5173/mindwave.html', { waitUntil: 'networkidle0' });
        
        // Wait for visualizer
        await page.evaluate(() => {
            return new Promise(resolve => {
                if (window.viz3D && window.viz3D.cymaticsCore) return resolve();
                const check = setInterval(() => {
                    if (window.viz3D && window.viz3D.cymaticsCore) {
                        clearInterval(check);
                        resolve();
                    }
                }, 100);
            });
        });

        // Click cymatics tab to make it visible
        await page.evaluate(() => {
            const cymaticsTab = document.querySelector('.tab-pill[title="Cymatics"]');
            if (cymaticsTab) cymaticsTab.click();
            window.setVisualMode('cymatics');
        });
        await new Promise(r => setTimeout(r, 1000));

        // Click Lion Aura button
        await page.evaluate(() => {
            const lionAuraBtn = document.querySelectorAll('.c24-layer3-btn')[1];
            if (lionAuraBtn) lionAuraBtn.click();
        });

        // Wait 2 seconds for texture to load
        await new Promise(r => setTimeout(r, 2000));

        // Get WebGL canvas data directly if possible, or take a page screenshot
        await page.screenshot({ path: '/Users/infinitealpha/.gemini/antigravity/brain/6c8de517-fd99-47cc-9f9c-e3ef0196ab0f/artifacts/puppeteer_screenshot.png' });
        
        // Also dump the texture object info
        const result = await page.evaluate(() => {
            const core = window.viz3D.cymaticsCore;
            if (!core || !core.materials[24]) return 'No class 24 material';
            const mat = core.materials[24];
            return {
                auraId: core.activeAuraId,
                linesId: core.activeLinesId,
                texSrc: mat.uniforms.uTexture.value && mat.uniforms.uTexture.value.image ? mat.uniforms.uTexture.value.image.currentSrc || mat.uniforms.uTexture.value.image.src : null,
                tex3Src: mat.uniforms.uTexture3.value && mat.uniforms.uTexture3.value.image ? mat.uniforms.uTexture3.value.image.currentSrc || mat.uniforms.uTexture3.value.image.src : null
            };
        });
        console.log("Texture state:", JSON.stringify(result, null, 2));

        await browser.close();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();
