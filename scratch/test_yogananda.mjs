import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Catch all console logs
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', err => console.log('PAGE ERROR:', err.message));
    
    console.log('Navigating to http://localhost:5175/index.html');
    await page.goto('http://localhost:5173/index.html', { waitUntil: 'domcontentloaded' });

    console.log('Injecting auth mock and bypassing directly to pricing...');
    await page.evaluate(() => {
        window.showPricingModal();
    });

    // Wait for modal
    await page.waitForSelector('#pricingModal');

    // Toggle coupon input
    await page.click('#toggleCouponBtn');

    // Type coupon code
    await page.type('#couponCodeInput', 'Yogananda');

    // Click apply
    await page.click('#applyCouponBtn');

    // Wait a second for async execution
    await new Promise(r => setTimeout(r, 1000));

    await browser.close();
})();
