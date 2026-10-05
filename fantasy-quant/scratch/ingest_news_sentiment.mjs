import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Simplified simulated keyword-based sentiment analyzer
// In production, this would call an LLM (e.g., OpenAI or Anthropic API) or NLP service.
function analyzeSentiment(newsText) {
  const text = newsText.toLowerCase();
  
  if (text.includes('walking boot') || text.includes('torn') || text.includes('out for season') || text.includes('fracture') || text.includes('surgery')) {
    return { type: 'NEGATIVE', score: -0.8, desc: 'Severe injury / Out' };
  }
  if (text.includes('doubtful') || text.includes('not practicing') || text.includes('dnp') || text.includes('limping') || text.includes('concussion protocol')) {
    return { type: 'NEGATIVE', score: -0.5, desc: 'Doubtful / DNP' };
  }
  if (text.includes('questionable') || text.includes('limited') || text.includes('game-time decision')) {
    return { type: 'NEGATIVE', score: -0.2, desc: 'Questionable / Limited' };
  }
  if (text.includes('full practice') || text.includes('cleared') || text.includes('off injury report') || text.includes('ready to go')) {
    return { type: 'POSITIVE', score: 0.5, desc: 'Cleared / Full practice' };
  }
  if (text.includes('breakout') || text.includes('named starter') || text.includes('promoted') || text.includes('expected to shine')) {
    return { type: 'POSITIVE', score: 0.3, desc: 'Positive hype' };
  }
  
  return { type: 'NEUTRAL', score: 0, desc: 'Neutral news' };
}

async function run() {
  console.log("Fetching live player news from ESPN RSS...");
  const { data: players } = await supabase.from('players').select('id, name');
  
  try {
    // We use a real ESPN RSS feed for NFL news instead of simulated dummy data
    const res = await fetch('https://www.espn.com/espn/rss/nfl/news');
    if (!res.ok) throw new Error("Failed to fetch ESPN RSS");
    const xml = await res.text();
    
    // Quick regex to grab titles and descriptions
    const itemMatches = [...xml.matchAll(/<title><!\[CDATA\[(.*?)\]\]><\/title>\s*<description><!\[CDATA\[(.*?)\]\]><\/description>/g)];
    
    let signalsAdded = 0;
    
    for (const match of itemMatches) {
       const title = match[1];
       const desc = match[2];
       const fullText = `${title}. ${desc}`;
       
       // Try to find if any player in our DB is mentioned in this news item
       const mentionedPlayer = players.find(p => fullText.includes(p.name));
       
       if (mentionedPlayer) {
          const sentiment = analyzeSentiment(fullText);
          if (sentiment.type !== 'NEUTRAL') {
             await supabase.from('player_signals').upsert({
                player_id: mentionedPlayer.id,
                signal_type: sentiment.type,
                category: 'news_sentiment',
                description: `News: ${title} (${sentiment.desc})`,
                season: 2026,
             }, { onConflict: 'player_id,signal_type,category' });
             signalsAdded++;
          }
       }
    }
    console.log(`Ingestion complete! Processed ${signalsAdded} actionable news signals from real ESPN data.`);
  } catch (err) {
    console.error("News ingestion failed:", err.message);
  }
}

run();
