const puppeteer = require('puppeteer');
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    await client.send('Network.clearBrowserCache');
    await client.send('Network.clearBrowserCookies');
    
    page.on('console', msg => {
        if (msg.type() === 'error' || msg.type() === 'warning' || msg.text().includes('Boot') || msg.text().includes('SW') || msg.text().includes('cymatic')) {
            console.log(`[CONSOLE ${msg.type().toUpperCase()}] ${msg.text()}`);
        }
    });
    page.on('pageerror', err => {
        console.log(`[PAGE ERROR] ${err.toString()}`);
    });
    console.log("Navigating to http://localhost:8001/mindwave.html");
    await page.goto('http://localhost:8001/mindwave.html', { waitUntil: 'networkidle2', timeout: 30000 });
    
    await page.evaluate(async () => {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for(let registration of registrations) {
            await registration.unregister();
        }
    });

    await page.reload({ waitUntil: 'networkidle2' });

    // Check global state
    await new Promise(r => setTimeout(r, 2000));
    const hasCymatics = await page.evaluate(() => {
        return typeof window.setCymaticPattern === 'function';
    });
    console.log("window.setCymaticPattern exists?", hasCymatics);

    await browser.close();
})();
