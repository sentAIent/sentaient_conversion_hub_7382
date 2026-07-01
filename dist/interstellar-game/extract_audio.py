import re

with open('script.js', 'r') as f:
    content = f.read()

# Find AudioEngine class definition
audio_engine_start = content.find('class AudioEngine {')
# Find InterstellarEngine class definition
interstellar_start = content.find('class InterstellarEngine {')

# Extract AudioEngine and gameAudio instance code
audio_engine_code = content[audio_engine_start:interstellar_start]

# Write to audio.js
with open('audio.js', 'w') as f:
    f.write('export ' + audio_engine_code.replace('const gameAudio = new AudioEngine();\nwindow.gameAudio = gameAudio;\n', ''))

# Replace in script.js
new_script_js = content[:audio_engine_start] + "import { AudioEngine } from './audio.js';\n\nwindow.gameAudio = new AudioEngine();\n" + content[interstellar_start:]

with open('script.js', 'w') as f:
    f.write(new_script_js)

print("Extraction complete.")
