import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/bettingpros.html', 'utf-8');
const $ = cheerio.load(html);

$('script[type="application/json"]').each((i, el) => {
    const text = $(el).html();
    if (text.length > 2000000) {
        fs.writeFileSync('scratch/big_data.json', text);
        console.log('Saved big_data.json');
    }
});
