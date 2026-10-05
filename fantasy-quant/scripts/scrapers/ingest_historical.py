import requests
import time
import random

# In a production environment, this would integrate with 247Sports/MaxPreps for High School
# and CollegeFootballData API or cfbfastR for College.
# Due to the lack of open, unauthenticated APIs for deep HS/College historicals, 
# this scraper framework outlines the data extraction and transformation logic, 
# falling back to simulated realistic distributions to populate the dashboard UI for testing.

def fetch_and_ingest_historical_stats():
    print("Initializing historical stats scraper (College & High School)...")
    
    # We will simulate for some top players for testing the UI
    target_players = [
        "Bijan Robinson",
        "Ja'Marr Chase",
        "Jahmyr Gibbs",
        "CeeDee Lamb",
        "Justin Jefferson",
        "Breece Hall",
        "Marvin Harrison Jr.",
        "Malik Nabers"
    ]
    
    api_url = "http://localhost:3000/api/ingest/scouting"
    success_count = 0
    fail_count = 0
    
    for player in target_players:
        # Generate High School Stats (Junior/Senior years)
        for hs_year in [2018, 2019]:
            payload_hs = {
                "player_name": player,
                "historical_stats": {
                    "league": "HS",
                    "season": hs_year,
                    "team": "Varsity HS",
                    "games_played": 12,
                    "pass_yards": random.randint(0, 500) if "QB" in player else 0,
                    "rush_yards": random.randint(800, 2500) if "Robinson" in player or "Gibbs" in player or "Hall" in player else random.randint(50, 300),
                    "rec_yards": random.randint(1000, 2000) if "Chase" in player or "Lamb" in player or "Jefferson" in player or "Harrison" in player or "Nabers" in player else random.randint(100, 500),
                    "total_tds": random.randint(10, 35)
                }
            }
            try:
                res = requests.post(api_url, json=payload_hs)
                if res.status_code == 200:
                    success_count += 1
                else:
                    fail_count += 1
            except Exception as e:
                print(f"Error posting HS stats for {player}: {e}")
                fail_count += 1
            time.sleep(0.05)
            
        # Generate College Stats (Freshman to Junior years)
        for cfb_year in [2020, 2021, 2022]:
            payload_cfb = {
                "player_name": player,
                "historical_stats": {
                    "league": "NCAAF",
                    "season": cfb_year,
                    "team": "College University",
                    "games_played": random.randint(10, 14),
                    "pass_yards": 0,
                    "rush_yards": random.randint(600, 1500) if "Robinson" in player or "Gibbs" in player or "Hall" in player else random.randint(10, 150),
                    "rec_yards": random.randint(800, 1600) if "Chase" in player or "Lamb" in player or "Jefferson" in player or "Harrison" in player or "Nabers" in player else random.randint(200, 400),
                    "total_tds": random.randint(5, 20)
                }
            }
            try:
                res = requests.post(api_url, json=payload_cfb)
                if res.status_code == 200:
                    success_count += 1
                else:
                    fail_count += 1
            except Exception as e:
                print(f"Error posting College stats for {player}: {e}")
                fail_count += 1
            time.sleep(0.05)
            
    print(f"Finished ingesting historical stats. Success: {success_count}, Failed: {fail_count}")

if __name__ == "__main__":
    fetch_and_ingest_historical_stats()
