import fetch from 'node-fetch';

async function testCron() {
    try {
        const rssRes = await fetch('https://www.espn.com/espn/rss/nfl/news', {
          headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        
        if (!rssRes.ok) {
            throw new Error(`Failed to fetch RSS: ${rssRes.statusText}`);
        }
        
        const xml = await rssRes.text();
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        const titleRegex = /<title><!\[CDATA\[(.*?)\]\]><\/title>/;
        const descRegex = /<description><!\[CDATA\[(.*?)\]\]><\/description>/;
        
        let match;
        const signals = [];
        
        while ((match = itemRegex.exec(xml)) !== null) {
          const itemContent = match[1];
          const titleMatch = itemContent.match(titleRegex);
          const descMatch = itemContent.match(descRegex);
          
          if (titleMatch) {
              signals.push({
                 title: titleMatch[1],
                 description: descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : '',
                 timestamp: new Date().toISOString()
              });
          }
        }
        
        console.log(JSON.stringify({ 
            success: true, 
            message: 'Live news sync completed',
            itemCount: signals.length,
            latestNews: signals.slice(0, 3) 
        }, null, 2));
      } catch (error) {
        console.error('Cron Error:', error);
      }
}

testCron();
