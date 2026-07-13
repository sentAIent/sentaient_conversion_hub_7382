import os
import datetime
import requests
import requests_cache
import pandas as pd
from retry_requests import retry
import openmeteo_requests
import nfl_data_py as nfl
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env.local'))

SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    print("Supabase credentials missing.")
    exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Setup the Open-Meteo API client with cache and retry on error
cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)

# We need stadium coordinates mapping
STADIUM_COORDS = {
    "BUF": {"lat": 42.7738, "lon": -78.7870},
    "MIA": {"lat": 25.9580, "lon": -80.2389},
    "GB": {"lat": 44.5013, "lon": -88.0622},
    "NE": {"lat": 42.0909, "lon": -71.2643},
    "NYJ": {"lat": 40.8128, "lon": -74.0745},
    "NYG": {"lat": 40.8128, "lon": -74.0745},
    "PHI": {"lat": 39.9008, "lon": -75.1675},
    "DAL": {"lat": 32.7473, "lon": -97.0945}, # Dome
    "WAS": {"lat": 38.9076, "lon": -76.8645},
    "CHI": {"lat": 41.8623, "lon": -87.6167},
    "DET": {"lat": 42.3400, "lon": -83.0456}, # Dome
    "MIN": {"lat": 44.9735, "lon": -93.2575}, # Dome
    "TB": {"lat": 27.9759, "lon": -82.5033},
    "ATL": {"lat": 33.7550, "lon": -84.4010}, # Dome
    "CAR": {"lat": 35.2251, "lon": -80.8528},
    "NO": {"lat": 29.9511, "lon": -90.0812}, # Dome
    "SF": {"lat": 37.4030, "lon": -121.9700},
    "LAR": {"lat": 33.9534, "lon": -118.3391}, # Dome
    "SEA": {"lat": 47.5952, "lon": -122.3316},
    "ARI": {"lat": 33.5276, "lon": -112.2626}, # Dome
    "BAL": {"lat": 39.2780, "lon": -76.6227},
    "CIN": {"lat": 39.0954, "lon": -84.5160},
    "CLE": {"lat": 41.5061, "lon": -81.6995},
    "PIT": {"lat": 40.4468, "lon": -80.0158},
    "HOU": {"lat": 29.6847, "lon": -95.4107}, # Dome
    "IND": {"lat": 39.7601, "lon": -86.1639}, # Dome
    "JAX": {"lat": 30.3239, "lon": -81.6373},
    "TEN": {"lat": 36.1665, "lon": -86.7713},
    "DEN": {"lat": 39.7439, "lon": -105.0201},
    "KC": {"lat": 39.0489, "lon": -94.4839},
    "LV": {"lat": 36.0909, "lon": -115.1833}, # Dome
    "LAC": {"lat": 33.9534, "lon": -118.3391}, # Dome
}

def get_weather(lat, lon):
    url = "https://api.open-meteo.com/v1/forecast"
    params = {
        "latitude": lat,
        "longitude": lon,
        "current": ["temperature_2m", "wind_speed_10m", "precipitation"],
        "temperature_unit": "fahrenheit",
        "wind_speed_unit": "mph"
    }
    responses = openmeteo.weather_api(url, params=params)
    if not responses:
        return None
    response = responses[0]
    current = response.Current()
    return {
        "temp": current.Variables(0).Value(),
        "wind_speed": current.Variables(1).Value(),
        "precip": current.Variables(2).Value()
    }

def scrape_weather():
    print("--- Scraping Weather Data for NFL Games ---")
    
    # We will get schedules for 2023 for testing, normally you'd use current year
    schedules = nfl.import_schedules([2023])
    
    # Let's say we are targeting week 14 for now to mock current upcoming games
    target_week = 14
    games = schedules[schedules['week'] == target_week]
    
    for idx, row in games.iterrows():
        home_team = row['home_team']
        away_team = row['away_team']
        
        if home_team in STADIUM_COORDS:
            coords = STADIUM_COORDS[home_team]
            weather = get_weather(coords["lat"], coords["lon"])
            if weather:
                # Decide condition based on precip
                condition = "Clear"
                if weather["precip"] > 0:
                    condition = "Snow" if weather["temp"] < 32 else "Rain"
                
                print(f"Weather for {home_team} vs {away_team}: {weather['temp']:.1f}F, {condition}, Wind: {weather['wind_speed']:.1f}mph")
                
                # Depending on how the DB is structured, we'd upsert this.
                # Since we don't have a game_weather table right now in FantasyQuant,
                # we'll skip actual DB insert or just update a placeholder for now.
        else:
            print(f"No coordinates for {home_team}")

if __name__ == "__main__":
    scrape_weather()
