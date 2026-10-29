#!/bin/bash

# Extract lines from map1.txt (lines 1 to 800)
grep -E "^\s*[0-9]+[:\|]" /Users/infinitealpha/.gemini/antigravity/brain/99241934-e1b9-48ad-9a9f-e172bbe5249d/scratch/map1.txt | sed -E 's/^[[:space:]]*[0-9]+[:\|] ?//' > part1.txt

# Extract lines from map2.txt (lines 801 to 950)
grep -E "^\s*[0-9]+[:\|]" /Users/infinitealpha/.gemini/antigravity/brain/99241934-e1b9-48ad-9a9f-e172bbe5249d/scratch/map2.txt | sed -E 's/^[[:space:]]*[0-9]+[:\|] ?//' | tail -n +2 > part2.txt

# Extract lines from map3.txt (lines 951 to 1154)
grep -E "^\s*[0-9]+[:\|]" /Users/infinitealpha/.gemini/antigravity/brain/99241934-e1b9-48ad-9a9f-e172bbe5249d/scratch/map3.txt | sed -E 's/^[[:space:]]*[0-9]+[:\|] ?//' | tail -n +2 > part3.txt

# Combine them
cat part1.txt part2.txt part3.txt > src/components/SphinxMap.tsx

wc -l src/components/SphinxMap.tsx
