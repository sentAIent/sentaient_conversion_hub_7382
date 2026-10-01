import fetch from 'node-fetch';

async function test() {
  const rssRes = await fetch('https://www.rotoballer.com/nfl/nfl-player-news/feed', {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const xml = await rssRes.text();
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/;
  
  let match;
  let count = 0;
  while ((match = itemRegex.exec(xml)) !== null) {
      if (match[1].match(titleRegex)) count++;
  }
  console.log(`Found ${count} news items!`);
}
test();
