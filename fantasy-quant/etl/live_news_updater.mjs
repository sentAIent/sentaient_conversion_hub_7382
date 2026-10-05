import axios from 'axios';

async function testRSS() {
    console.log("Attempting to hit NFL.com RSS feed...");
    try {
        const res = await axios.get('https://www.nfl.com/rss/rssheadlines', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        console.log("Success! Characters fetched:", res.data.length);
    } catch(e) {
        console.error("RSS failed", e.message);
    }
}
testRSS();
