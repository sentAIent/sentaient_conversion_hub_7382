import os
import sys
import asyncio
from typing import List, Optional
from pydantic import BaseModel, Field
from supabase import create_client, Client
from dotenv import load_dotenv

# Ensure crawl4ai is installed: pip install "crawl4ai @ git+https://github.com/unclecode/crawl4ai.git" pydantic
try:
    from crawl4ai import AsyncWebCrawler
    from crawl4ai.extraction_strategy import LLMExtractionStrategy
except ImportError:
    print("Please install crawl4ai and pydantic first.")
    print("Run: pip install pydantic \"crawl4ai @ git+https://github.com/unclecode/crawl4ai.git\"")
    sys.exit(1)

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Missing Supabase credentials in .env.local")
    sys.exit(1)
if not OPENAI_API_KEY:
    print("Missing OPENAI_API_KEY in .env.local. The LLM extraction strategy requires it.")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Define the schema for LLM extraction
class PlayerSignal(BaseModel):
    player_name: str = Field(description="The full name of the NFL player mentioned.")
    signal_type: str = Field(description="Must be exactly 'POSITIVE' or 'NEGATIVE'.")
    category: str = Field(description="The category of the news, e.g., 'INJURY', 'OPPORTUNITY', 'COACHSPEAK', 'DEPTH_CHART'.")
    description: str = Field(description="A short 1-sentence summary of the news affecting the player.")

class ExtractedSignals(BaseModel):
    signals: List[PlayerSignal] = Field(description="A list of actionable signals extracted from the article.")

async def extract_signals_from_url(url: str):
    print(f"Crawling {url}...")
    
    # Initialize the LLMExtractionStrategy
    strategy = LLMExtractionStrategy(
        provider="openai/gpt-4o",  # or gpt-4o-mini
        api_token=OPENAI_API_KEY,
        schema=ExtractedSignals.model_json_schema(),
        extraction_type="schema",
        instruction=(
            "You are a professional fantasy football analyst. "
            "Extract actionable signals about NFL players from this article. "
            "Only include significant news (injuries, depth chart changes, coachspeak). "
            "Determine if the news is POSITIVE or NEGATIVE for their fantasy value."
        )
    )
    
    async with AsyncWebCrawler(verbose=True) as crawler:
        result = await crawler.arun(
            url=url,
            extraction_strategy=strategy,
            bypass_cache=True
        )
        
        if not result.success:
            print(f"Failed to crawl {url}: {result.error_message}")
            return []
            
        print("Extraction complete. Parsing results...")
        import json
        
        try:
            # The result.extracted_content should be a JSON string matching our schema
            extracted_data = json.loads(result.extracted_content)
            
            # Depending on how the LLM returned it, it might be a list directly or an object with 'signals'
            if isinstance(extracted_data, dict) and "signals" in extracted_data:
                return extracted_data["signals"]
            elif isinstance(extracted_data, list):
                return extracted_data
            else:
                print("Unexpected extraction format.")
                return []
        except Exception as e:
            print(f"Failed to parse LLM output: {e}")
            print(f"Raw output: {result.extracted_content}")
            return []

def resolve_player_id(player_name: str) -> Optional[str]:
    """Look up a player by name in the Supabase database."""
    res = supabase.table("players").select("id").ilike("name", f"%{player_name}%").limit(1).execute()
    if res.data and len(res.data) > 0:
        return res.data[0]["id"]
    return None

async def main():
    # Example URL: Rotoballer player news (or a specific article)
    target_url = "https://www.rotoballer.com/nfl/nfl-player-news"
    
    signals = await extract_signals_from_url(target_url)
    
    if not signals:
        print("No signals found.")
        return
        
    print(f"Extracted {len(signals)} signals.")
    
    # Process and insert into Supabase
    season = 2023  # Hardcoded for current data context
    week = 14
    
    db_signals = []
    
    for sig in signals:
        player_name = sig.get("player_name")
        player_id = resolve_player_id(player_name)
        
        if player_id:
            db_signals.append({
                "player_id": player_id,
                "season": season,
                "week": week,
                "signal_type": sig.get("signal_type"),
                "category": sig.get("category"),
                "description": sig.get("description")
            })
            print(f"Mapped {player_name} -> {player_id}")
        else:
            print(f"Player not found in DB: {player_name}")
            
    if db_signals:
        print(f"Inserting {len(db_signals)} signals into database...")
        # Upsert or Insert
        res = supabase.table("player_signals").insert(db_signals).execute()
        print("Success!")
    else:
        print("No matchable signals found to insert.")

if __name__ == "__main__":
    asyncio.run(main())
