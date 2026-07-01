const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: 'new',
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
        });
        const page = await browser.newPage();
        
        // Pass console logs to Node console
        page.on('console', msg => {
            const text = msg.text();
            if (!text.includes('favicon')) {
                console.log('BROWSER:', text);
            }
        });

        page.on('pageerror', err => {
            console.log('BROWSER ERROR:', err.message);
        });
        
        const filePath = 'file://' + path.resolve('../public/interstellar-game/index.html');
        console.log('Navigating to', filePath);
        
        await page.goto(filePath, { waitUntil: 'domcontentloaded', timeout: 10000 });
        
        // Wait a bit for game init
        await new Promise(r => setTimeout(r, 2000));
        
        // Enter flight mode
        console.log('Clicking splash screen to start...');
        await page.evaluate(() => {
            document.body.click();
        });
        
        await new Promise(r => setTimeout(r, 1000));
        
        console.log('Clicking fly button...');
        await page.evaluate(() => {
            const btn = document.getElementById('btnFlyShip');
            if (btn) btn.click();
        });
        
        await new Promise(r => setTimeout(r, 1500));
        
        const results = await page.evaluate(() => {
            const shipStatus = document.getElementById('sectionShipStatus');
            if (!shipStatus) return { error: 'shipStatus not found' };
            
            const styles = window.getComputedStyle(shipStatus);
            const rect = shipStatus.getBoundingClientRect();
            
            // Check ancestors
            let parent = shipStatus.parentElement;
            const ancestors = [];
            while (parent && parent !== document.body) {
                const pStyles = window.getComputedStyle(parent);
                ancestors.push({
                    id: parent.id,
                    className: parent.className,
                    display: pStyles.display,
                    visibility: pStyles.visibility,
                    opacity: pStyles.opacity,
                    zIndex: pStyles.zIndex,
                    position: pStyles.position
                });
                parent = parent.parentElement;
            }
            
            return {
                id: shipStatus.id,
                className: shipStatus.className,
                inlineDisplay: shipStatus.style.display,
                computedDisplay: styles.display,
                visibility: styles.visibility,
                opacity: styles.opacity,
                zIndex: styles.zIndex,
                position: styles.position,
                rect: {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height,
                    top: rect.top,
                    left: rect.left
                },
                ancestors: ancestors
            };
        });
        
        console.log('HUD INSPECTION:', JSON.stringify(results, null, 2));
        
    } catch (e) {
        console.error('SCRIPT ERROR:', e);
    } finally {
        if (browser) await browser.close();
    }
})();
