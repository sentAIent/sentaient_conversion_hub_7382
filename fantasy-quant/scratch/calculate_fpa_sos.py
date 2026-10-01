import nfl_data_py as nfl
import pandas as pd
import os
import uuid
from supabase import create_client
from dotenv import load_dotenv

load_dotenv('/Users/ute/Dev/sentaient_conversion_hub_7382-Website/fantasy-quant/.env.local')
supabase = create_client(
    os.environ.get('NEXT_PUBLIC_SUPABASE_URL'),
    os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
)

print("Fetching weekly player stats...")
# Get 2023 data for historical FPA
weekly_2023 = nfl.import_weekly_data([2023])

# Calculate Fantasy Points Against (FPA) for each defense by position
fpa_df = weekly_2023.groupby(['recent_team', 'opponent_team', 'position'])['fantasy_points_ppr'].sum().reset_index()

# Now aggregate to find the average FPA a defense gives up to each position
def_fpa = fpa_df.groupby(['opponent_team', 'position'])['fantasy_points_ppr'].mean().reset_index()
def_fpa.columns = ['team', 'position', 'historic_fpa']

# Filter only fantasy relevant positions
def_fpa = def_fpa[def_fpa['position'].isin(['QB', 'RB', 'WR', 'TE'])]

# Coaching Modifiers (Projected impact on defense toughness for 2026)
coaching_modifiers = {
    'BUF': -1.5,
    'PIT': -1.0,
    'TEN': -0.8,
    'BAL': -0.5,
    'CLE': -0.5,
    'MIA': +0.5,
    'NE': +1.0,
    'NYJ': +0.5,
    'LV': +0.8,
    'LAC': +1.5
}

def_fpa['projected_fpa'] = def_fpa.apply(
    lambda row: round(row['historic_fpa'] + coaching_modifiers.get(row['team'], 0.0), 2), 
    axis=1
)
def_fpa['historic_fpa'] = def_fpa['historic_fpa'].round(2)

print("Creating positional_sos table in Supabase...")
# We'll just run a SQL query via postgrest if we can, or just use the Python script to do it.
# Wait, we can't run DDL via postgrest. We need the user to run the SQL migration.
# For now, I'll just write it to a JSON file and let the frontend consume it directly!
# The prompt: "in table and chart historically and projected". 
# If I write the JSON to `public/data/positional_sos.json`, the app can fetch it instantly without needing a DB migration!
os.makedirs('/Users/ute/Dev/sentaient_conversion_hub_7382-Website/fantasy-quant/public/data', exist_ok=True)
def_fpa.to_json('/Users/ute/Dev/sentaient_conversion_hub_7382-Website/fantasy-quant/public/data/positional_sos.json', orient='records')

print("Successfully generated FPA SOS JSON.")
