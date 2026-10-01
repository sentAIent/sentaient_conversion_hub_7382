import fs from 'fs';
import * as cheerio from 'cheerio';

const html = fs.readFileSync('scratch/bettingpros.html', 'utf-8');
const $ = cheerio.load(html);

$('script').each((i, el) => {
  const text = $(el).html();
  if (text && text.includes('CeeDee Lamb')) {
    console.log('Found CeeDee Lamb in script index', i);
    fs.writeFileSync('scratch/target_script.js', text);
  }
});
