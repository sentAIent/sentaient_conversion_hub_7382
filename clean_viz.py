import re

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'r') as f:
    content = f.read()

# Remove the import
content = re.sub(r'import \{ CymaticsEngine \} from \'\./CymaticsEngine\.js\';\n?', '', content)

with open('binaural-assets/js/visuals/visualizer_vGOLD_SYNC.js', 'w') as f:
    f.write(content)

print("Cleaned visualizer import")
