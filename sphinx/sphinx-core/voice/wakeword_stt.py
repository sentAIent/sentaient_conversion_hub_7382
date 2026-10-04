import os
import time
import requests
import pyaudio
import numpy as np
import whisper
from openwakeword.model import Model

# Constants
WAKE_WORD = "hey_sphinx" # Assume a trained openwakeword model named hey_sphinx.onnx
SPHINX_API_URL = "http://localhost:3117/api/voice/command"

def listen_and_transcribe():
    print("[Sphinx Voice] Loading Whisper model (base)...")
    stt_model = whisper.load_model("base")
    
    print("[Sphinx Voice] Loading openWakeWord model...")
    # Initialize openWakeWord
    oww_model = Model(wakeword_models=[WAKE_WORD])
    
    # Initialize PyAudio
    audio = pyaudio.PyAudio()
    mic_stream = audio.open(format=pyaudio.paInt16,
                            channels=1,
                            rate=16000,
                            input=True,
                            frames_per_buffer=1280)
    
    print("\n[Sphinx Voice] System active. Listening for 'Hey Sphinx'...")
    
    try:
        while True:
            # Read audio chunk
            audio_chunk = np.frombuffer(mic_stream.read(1280), dtype=np.int16)
            
            # Feed to openWakeWord
            prediction = oww_model.predict(audio_chunk)
            
            # Check if wakeword detected
            if prediction[WAKE_WORD] > 0.5:
                print("\n[Sphinx Voice] Wakeword detected! Listening for command...")
                
                # Record command (simplified for prototype: record 5 seconds of audio)
                frames = []
                for _ in range(0, int(16000 / 1280 * 5)):
                    data = mic_stream.read(1280)
                    frames.append(np.frombuffer(data, dtype=np.int16))
                
                command_audio = np.concatenate(frames).astype(np.float32) / 32768.0
                
                print("[Sphinx Voice] Transcribing...")
                result = stt_model.transcribe(command_audio, fp16=False)
                transcript = result["text"].strip()
                print(f"[Sphinx Voice] You said: '{transcript}'")
                
                if transcript:
                    # Send to Sphinx Brain
                    try:
                        res = requests.post(SPHINX_API_URL, json={"command": transcript})
                        if res.status_code == 200:
                            print(f"[Sphinx Brain] Command accepted.")
                        else:
                            print(f"[Error] Backend returned {res.status_code}")
                    except Exception as e:
                        print(f"[Error] Could not reach Sphinx Core: {e}")
                
                print("\n[Sphinx Voice] Resuming background listening...")
                
    except KeyboardInterrupt:
        print("\n[Sphinx Voice] Shutting down.")
    finally:
        mic_stream.stop_stream()
        mic_stream.close()
        audio.terminate()

if __name__ == "__main__":
    listen_and_transcribe()
