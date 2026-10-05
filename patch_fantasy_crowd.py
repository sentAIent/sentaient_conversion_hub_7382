import re

with open('src/pages/demo3d/worlds/WorldFantasyQuant.jsx', 'r') as f:
    content = f.read()

# I want to replace my old `<CheeringFans />` or just add a new `StadiumCrowd` if it's missing.
# Wait, I didn't see `CheeringFans` in the `grep` earlier! Let me see what's actually in there.
