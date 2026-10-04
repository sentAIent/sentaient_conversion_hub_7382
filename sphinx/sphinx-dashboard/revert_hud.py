import re

with open('src/components/SphinxMap.tsx', 'r') as f:
    content = f.read()

# I want to restore fluid typography and spacing using clamp().
content = content.replace('text-sm md:text-base xl:text-lg', 'text-[clamp(10px,1.2vw,18px)]')
content = content.replace('p-2 md:p-3 xl:p-4', 'p-[clamp(8px,1vw,20px)]')
content = content.replace('mb-2 md:mb-3 xl:mb-4', 'mb-[clamp(4px,0.7vw,16px)]')
content = content.replace('pb-2 md:pb-3 xl:pb-4', 'pb-[clamp(4px,0.5vw,12px)]')
content = content.replace('mt-2 md:mt-3 xl:mt-4', 'mt-[clamp(8px,1vw,20px)]')
content = content.replace('gap-2 md:gap-3 xl:gap-4', 'gap-[clamp(4px,0.7vw,12px)]')
content = content.replace('w-3 md:w-4 xl:w-5', 'w-[clamp(10px,1vw,24px)]')
content = content.replace('h-3 md:h-4 xl:h-5', 'h-[clamp(10px,1vw,24px)]')
content = content.replace('px-2 md:px-3', 'px-[clamp(6px,0.5vw,12px)]')
content = content.replace('py-1 md:py-2', 'py-[clamp(4px,0.3vw,8px)]')

# Make the HUD container width strictly fluid with boundaries
# Currently it is: style={{ width: isLegendCollapsed ? 'clamp(64px, 8vw, 120px)' : 'clamp(240px, 22vw, 400px)', transition: 'width 0.3s ease-in-out' }}
# Let's ensure it exists and is correct.

with open('src/components/SphinxMap.tsx', 'w') as f:
    f.write(content)
