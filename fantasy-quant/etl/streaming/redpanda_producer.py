import json
import time
import random
from kafka import KafkaProducer

# Connect to Redpanda (Kafka compatible)
# In production, replace with your Redpanda Serverless brokers
BROKER = 'localhost:9092'
TOPIC = 'live-nfl-plays'

try:
    producer = KafkaProducer(
        bootstrap_servers=[BROKER],
        value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )
    print(f"✅ Connected to Redpanda at {BROKER}")
except Exception as e:
    print(f"⚠️ Could not connect to Redpanda (is it running?): {e}")
    print("Running in simulation mode...")
    producer = None

def simulate_live_plays():
    players = ["CeeDee Lamb", "Justin Jefferson", "Christian McCaffrey", "Tyreek Hill"]
    play_types = ["RUSH", "PASS", "RECEPTION"]
    
    print(f"Streaming live Sunday plays to topic: {TOPIC}...")
    
    for i in range(100):
        play_event = {
            "game_id": "2026_01_DAL_NYG",
            "player": random.choice(players),
            "play_type": random.choice(play_types),
            "yards": random.randint(-2, 40),
            "touchdown": random.choice([True, False, False, False, False]),
            "timestamp": int(time.time() * 1000)
        }
        
        # Calculate instant fantasy points (PPR)
        pts = play_event["yards"] * 0.1
        if play_event["play_type"] == "RECEPTION":
            pts += 1.0
        if play_event["touchdown"]:
            pts += 6.0
            
        play_event["fantasy_points"] = round(pts, 2)
        
        print(f"Live Play: {play_event['player']} | {play_event['play_type']} | {play_event['yards']} yds | {play_event['fantasy_points']} pts")
        
        if producer:
            producer.send(TOPIC, play_event)
            
        time.sleep(random.uniform(0.5, 2.0))

if __name__ == "__main__":
    try:
        simulate_live_plays()
    except KeyboardInterrupt:
        print("\nStreaming stopped.")
