import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import fs from 'fs';

async function testScrape() {
  const url = 'https://www.bettingpros.com/nfl/odds/player-futures/total-receiving-yards/';
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }});
  const html = await res.text();
  fs.writeFileSync('scratch/bettingpros.html', html);
  console.log('Saved to scratch/bettingpros.html');
}
testScrape();
