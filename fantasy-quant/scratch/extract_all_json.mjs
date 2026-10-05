import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/bettingpros.html', 'utf-8');
const $ = cheerio.load(html);

$('script[type="application/json"]').each((i, el) => {
    console.log('JSON script length:', $(el).html().length);
});

$('script').each((i, el) => {
    const text = $(el).html();
    if (text && text.includes('__NEXT_DATA__')) {
        console.log('Found __NEXT_DATA__ in regular script!');
    }
});
