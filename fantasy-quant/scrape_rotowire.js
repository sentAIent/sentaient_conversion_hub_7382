const cheerio = require('cheerio');
async function run() {
  const res = await fetch('https://www.rotowire.com/daily/nfl/optimizer.php?site=DraftKings');
  const text = await res.text();
  if (text.includes('salary')) {
    console.log("Found DFS optimizer page.");
    // check if it has players
    const match = text.match(/playerData\s*=\s*(\[.*?\]);/s);
    if (match) {
        const players = JSON.parse(match[1]);
        console.log("Players count:", players.length);
        if (players.length > 0) {
           console.log("Sample:", players[0].first_name, players[0].last_name, players[0].salary);
        }
    } else {
        console.log("Could not find playerData array.");
    }
  } else {
    console.log("Failed to fetch properly.");
  }
}
run();
