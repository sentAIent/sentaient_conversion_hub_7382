#!/bin/bash

# Extract lines from map1_correct.txt (lines 1 to 800)
grep -E "^\s*[0-9]+[:\|]" /Users/infinitealpha/.gemini/antigravity/brain/99241934-e1b9-48ad-9a9f-e172bbe5249d/scratch/map1_correct.txt | sed -E 's/^[[:space:]]*[0-9]+[:\|] ?//' > part1.txt

# Extract lines from map2_correct.txt (lines 801 to 950)
# Skip the first line since it's the duplicate overlap if StartLine: 800
grep -E "^\s*[0-9]+[:\|]" /Users/infinitealpha/.gemini/antigravity/brain/99241934-e1b9-48ad-9a9f-e172bbe5249d/scratch/map2_correct.txt | sed -E 's/^[[:space:]]*[0-9]+[:\|] ?//' | tail -n +2 > part2.txt

# Extract lines from map3_correct.txt (lines 951 to 1154)
# Skip the first line since it's the duplicate overlap if StartLine: 950
grep -E "^\s*[0-9]+[:\|]" /Users/infinitealpha/.gemini/antigravity/brain/99241934-e1b9-48ad-9a9f-e172bbe5249d/scratch/map3_correct.txt | sed -E 's/^[[:space:]]*[0-9]+[:\|] ?//' | tail -n +2 > part3.txt

wc -l part1.txt part2.txt part3.txt

# Combine them
cat part1.txt part2.txt part3.txt > src/components/SphinxMap.tsx
wc -l src/components/SphinxMap.tsx
