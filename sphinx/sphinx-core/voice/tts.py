import os
import sys
import subprocess
import wave
import tempfile

def speak_piper(text):
    print(f"[Sphinx TTS] Synthesizing: {text}")
    
    # Path to Piper executable and voice model (assumes they are in the voice/ directory or PATH)
    # Using a fast, local ONNX model for Piper
    model_path = "en_US-lessac-medium.onnx"
    
    if not os.path.exists(model_path):
        print(f"[Warning] Piper model '{model_path}' not found.")
        print("[Sphinx TTS] Falling back to macOS native TTS (say)...")
        subprocess.run(['say', '-v', 'Alex', text])
        return

    # Generate audio to a temporary WAV file using Piper
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_audio:
        temp_filename = temp_audio.name
        
    try:
        # echo "text" | piper --model voice.onnx --output_file out.wav
        echo_process = subprocess.Popen(['echo', text], stdout=subprocess.PIPE)
        piper_process = subprocess.Popen(
            ['piper', '--model', model_path, '--output_file', temp_filename],
            stdin=echo_process.stdout,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
        echo_process.stdout.close()
        piper_process.communicate()
        
        # Play the generated audio (macOS uses 'afplay', Linux uses 'aplay')
        if sys.platform == "darwin":
            subprocess.run(["afplay", temp_filename])
        else:
            subprocess.run(["aplay", temp_filename])
            
    except Exception as e:
        print(f"[Error] TTS Synthesis failed: {e}")
    finally:
        if os.path.exists(temp_filename):
            os.remove(temp_filename)

if __name__ == "__main__":
    if len(sys.argv) > 1:
        text_to_speak = " ".join(sys.argv[1:])
        speak_piper(text_to_speak)
    else:
        # Listen on stdin for continuous TTS streaming
        for line in sys.stdin:
            if line.strip():
                speak_piper(line.strip())
