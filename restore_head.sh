#!/bin/bash
for f in $(git ls-tree -r --name-only HEAD src/pages/demo3d/worlds/ src/pages/demo3d/wormholes/ src/pages/demo3d/TimelineManager.jsx); do
    git show HEAD:$f > $f
done
