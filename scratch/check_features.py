with open('public/binaural-assets/js/content/audio-library.js', 'r', errors='ignore') as f:
    content = f.read()

bindings = [
    'customAudioVolume',
    'audioUploadInput',
    'classicalUploadInput',
    'classicalVolumeSlider',
    'classicalProgress',
    'initAudioLibrary',
    'myAudioContainer'
]

print("=== Checking public/binaural-assets/js/content/audio-library.js ===")
for b in bindings:
    found = b in content
    count = content.count(b)
    print(f"  {b}: {'FOUND' if found else 'NOT FOUND'} ({count} occurrences)")
