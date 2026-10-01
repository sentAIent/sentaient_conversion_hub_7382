import puppeteer from 'puppeteer';

async function run() {
    const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.bettingpros.com/nfl/odds/player-futures/total-receiving-yards/', { waitUntil: 'networkidle2' });
    
    // Extract table rows
    const data = await page.evaluate(() => {
        const rows = document.querySelectorAll('tr');
        const results = [];
        rows.forEach(row => {
            results.push(row.innerText);
        });
        return results;
    });
    
    console.log('Got', data.length, 'rows');
    if (data.length > 5) {
        console.log(data.slice(0, 5));
    }
    
    await browser.close();
}

run().catch(console.error);
