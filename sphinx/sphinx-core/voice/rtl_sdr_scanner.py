import time
import requests
import random

def scan_frequencies():
    print("[Sphinx SIGINT] Initializing RTL-SDR scanner...")
    print("[Sphinx SIGINT] Sweeping local emergency and police bands (150MHz - 160MHz)...")
    
    # Placeholder for actual rtl-sdr and rtl_fm integration
    # Typically, you would use rtl_fm to capture audio, and feed it into Whisper for transcription.
    
    try:
        while True:
            time.sleep(15) # Scan interval
            
            # Simulate intercepting a transmission
            if random.random() > 0.8:
                frequency = round(random.uniform(150.0, 160.0), 2)
                print(f"\n[Sphinx SIGINT] Signal locked at {frequency} MHz.")
                
                # Simulate passing the audio buffer to Whisper.cpp
                simulated_transcript = "Units respond to a 10-31 in progress at the north sector."
                print(f"[Sphinx SIGINT] Transcribed: '{simulated_transcript}'")
                
                # Post to Sphinx core
                payload = {
                    "frequency": frequency,
                    "type": "Emergency Dispatch",
                    "audio_transcript": simulated_transcript
                }
                
                try:
                    requests.post("http://localhost:3117/api/perimeter/sigint", json=payload)
                except Exception as e:
                    print(f"[Error] Could not reach Sphinx Core: {e}")
                    
    except KeyboardInterrupt:
        print("\n[Sphinx SIGINT] Scanner offline.")

if __name__ == "__main__":
    scan_frequencies()
