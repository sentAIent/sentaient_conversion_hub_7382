const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    const filePath = `file://${path.join(__dirname, '../../public/interstellar-game/index.html')}`;
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    await page.evaluate(() => {
        const btn = document.getElementById('btnStartFlight');
        if (btn) btn.click();
    });

    // Wait a moment for transitions
    await new Promise(r => setTimeout(r, 1000));

    const visibilityDetails = await page.evaluate(() => {
        const el = document.getElementById('sectionShipStatus');
        if (!el) return 'Element not found';

        const getStyle = (node) => {
            if (!node || node === document) return null;
            const style = window.getComputedStyle(node);
            return {
                id: node.id,
                className: node.className,
                tagName: node.tagName,
                display: style.display,
                visibility: style.visibility,
                opacity: style.opacity,
                position: style.position,
                zIndex: style.zIndex,
                width: style.width,
                height: style.height,
                parent: getStyle(node.parentNode)
            };
        };

        return getStyle(el);
    });

    console.log(JSON.stringify(visibilityDetails, null, 2));

    await browser.close();
})();
