import os
import sys
import asyncio
from typing import List, Optional
from pydantic import BaseModel, Field
from supabase import create_client, Client
from dotenv import load_dotenv

# Ensure crawl4ai is installed
try:
    from crawl4ai import AsyncWebCrawler
    from crawl4ai.extraction_strategy import LLMExtractionStrategy
except ImportError:
    print("Please install crawl4ai and pydantic first.")
    sys.exit(1)

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
class PlayerContract(BaseModel):
    player_name: str = Field(description="The full name of the NFL player.")
    total_value: int = Field(description="The total value of the contract in dollars (numeric only).")
    guaranteed_amount: int = Field(description="The guaranteed amount of the contract in dollars (numeric only).")
    years: int = Field(description="The number of years the contract is for.")
    aav: int = Field(description="The average annual value (AAV) in dollars.")
    current_cap_hit: Optional[int] = Field(description="The cap hit for the current/upcoming season in dollars, if available.")

class ExtractedContracts(BaseModel):
    contracts: List[PlayerContract] = Field(description="A list of player contracts extracted from the page.")

async def extract_contracts_from_team_url(url: str):
    print(f"Crawling {url}...")
    
    strategy = LLMExtractionStrategy(
        provider="openai/gpt-4o", 
        api_token=OPENAI_API_KEY,
        schema=ExtractedContracts.model_json_schema(),
        extraction_type="schema",
        instruction=(
            "You are a professional sports financial analyst. "
            "Extract contract details for all NFL players listed on this page. "
            "Convert all currency strings (e.g. $45,000,000) into pure integers (e.g. 45000000). "
            "If a value is missing, return 0 or null. Focus on capturing total value, guaranteed amount, years, AAV, and the current cap hit."
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
            extracted_data = json.loads(result.extracted_content)
            if isinstance(extracted_data, dict) and "contracts" in extracted_data:
                return extracted_data["contracts"]
            elif isinstance(extracted_data, list):
                return extracted_data
            else:
                return []
        except Exception as e:
            print(f"Failed to parse LLM output: {e}")
            return []

def resolve_player_id(player_name: str) -> Optional[str]:
    """Look up a player by name in the Supabase database."""
    # Using ilike for case-insensitive partial match, though exact match is better for contracts
    res = supabase.table("players").select("id").ilike("name", f"%{player_name}%").limit(1).execute()
    if res.data and len(res.data) > 0:
        return res.data[0]["id"]
    return None

async def main():
    # As a proof of concept, we scrape one team's contracts page on Spotrac.
    # In a full run, we would iterate over a list of all 32 NFL team slugs.
    team_slugs = ["kansas-city-chiefs", "minnesota-vikings"]
    
    all_db_contracts = []
    
    for slug in team_slugs:
        target_url = f"https://www.spotrac.com/nfl/{slug}/contracts/"
        
        contracts = await extract_contracts_from_team_url(target_url)
        
        if not contracts:
            print(f"No contracts found for {slug}.")
            continue
            
        print(f"Extracted {len(contracts)} contracts for {slug}.")
        
        for c in contracts:
            player_name = c.get("player_name")
            player_id = resolve_player_id(player_name)
            
            if player_id:
                # We assume these are currently active deals being scraped
                all_db_contracts.append({
                    "player_id": player_id,
                    "signed_date": "2024-01-01", # Placeholder since Spotrac's main table might not have exact sign date
                    "total_value": c.get("total_value"),
                    "guaranteed_amount": c.get("guaranteed_amount"),
                    "years": c.get("years"),
                    "aav": c.get("aav"),
                    "current_cap_hit": c.get("current_cap_hit"),
                    "is_active": True
                })
                print(f"Mapped {player_name} -> {player_id}")
            else:
                print(f"Player not found in DB: {player_name}")
                
    if all_db_contracts:
        print(f"Inserting {len(all_db_contracts)} contracts into database...")
        # Since this is a simple script, we just insert. In production, we'd upsert based on player_id and active status.
        try:
            res = supabase.table("player_contracts").insert(all_db_contracts).execute()
            print("Success!")
        except Exception as e:
            print(f"Database insert failed (is the migration applied?): {e}")
    else:
        print("No matchable contracts found to insert.")

if __name__ == "__main__":
    asyncio.run(main())
