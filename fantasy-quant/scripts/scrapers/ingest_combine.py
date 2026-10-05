import pandas as pd
import requests
import time
import math

def parse_height(ht_str):
    try:
        # Expected format like 6-0
        if '-' in str(ht_str):
            parts = str(ht_str).split('-')
            return int(parts[0]) * 12 + int(parts[1])
        return float(ht_str) # if it's already in inches somehow
    except:
        return None

def fetch_and_ingest_combine():
    print("Fetching combine data from nflverse...")
    url = "https://github.com/nflverse/nflverse-data/releases/download/combine/combine.csv"
    df = pd.read_csv(url)
    
    # Filter only recent data (e.g., 2023 and later) to avoid overloading for this test
    df = df[df['draft_year'] >= 2023]
    df = df.dropna(subset=['player_name'])
    
    print(f"Loaded {len(df)} records. Ingesting to local API...")
    
    api_url = "http://localhost:3000/api/ingest/scouting"
    
    success_count = 0
    fail_count = 0
    
    for idx, row in df.iterrows():
        def clean_val(v):
            if pd.isna(v) or math.isnan(v):
                return None
            return v

        combine_payload = {
            "year": clean_val(row.get("draft_year")),
            "height_inches": parse_height(row.get("ht")),
            "weight_lbs": clean_val(row.get("wt")),
            "forty_yard": clean_val(row.get("forty")),
            "ten_yard_split": clean_val(row.get("ten_yard_split")),
            "twenty_yard_shuttle": clean_val(row.get("shuttle")),
            "three_cone": clean_val(row.get("cone")),
            "vertical_jump": clean_val(row.get("vertical")),
            "broad_jump": clean_val(row.get("broad_jump")),
            "bench_press": clean_val(row.get("bench"))
        }
        
        # Remove None values
        combine_payload = {k: v for k, v in combine_payload.items() if v is not None}
        
        if not combine_payload:
            continue
            
        payload = {
            "player_name": row["player_name"],
            "combine_stats": combine_payload
        }
        
        try:
            res = requests.post(api_url, json=payload)
            if res.status_code == 200:
                data = res.json()
                if data.get('success'):
                    success_count += 1
                else:
                    fail_count += 1
            else:
                fail_count += 1
        except Exception as e:
            print(f"Error for {row['player_name']}: {e}")
            fail_count += 1
            
        # Give API a short breather
        time.sleep(0.01)
        
    print(f"Finished ingesting combine stats. Success: {success_count}, Failed: {fail_count}")

if __name__ == "__main__":
    fetch_and_ingest_combine()
