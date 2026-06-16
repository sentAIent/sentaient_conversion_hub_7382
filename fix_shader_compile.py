import re

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    js = f.read()

# We need to find the duplicate hash in fragmentShader.
# It looks like:
#                     float hash(vec2 p) {
#                         return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
#                     }

bad_hash_regex = r'                    float hash\(vec2 p\) \{\n                        return fract\(sin\(dot\(p, vec2\(127\.1, 311\.7\)\)\) \* 43758\.5453123\);\n                    \}\n'

if re.search(bad_hash_regex, js):
    js = re.sub(bad_hash_regex, '', js)
    with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w') as f:
        f.write(js)
    print("Fixed duplicate hash function.")
else:
    print("Duplicate hash not found, something else is wrong.")
