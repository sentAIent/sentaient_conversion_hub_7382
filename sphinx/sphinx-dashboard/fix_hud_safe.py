import re

with open('src/components/SphinxMap.tsx', 'r') as f:
    content = f.read()

# Replace [clamp(12px,1.2vw,28px)] with standard Tailwind classes
# Some specific fixes:
content = re.sub(r'text-\[clamp\([^,]+,[^,]+,[^\]]+\)\]', 'text-sm md:text-base xl:text-lg', content)
content = re.sub(r'p-\[clamp\([^,]+,[^,]+,[^\]]+\)\]', 'p-2 md:p-3 xl:p-4', content)
content = re.sub(r'mb-\[clamp\([^,]+,[^,]+,[^\]]+\)\]', 'mb-2 md:mb-3 xl:mb-4', content)
content = re.sub(r'pb-\[clamp\([^,]+,[^,]+,[^\]]+\)\]', 'pb-2 md:pb-3 xl:pb-4', content)
content = re.sub(r'mt-\[clamp\([^,]+,[^,]+,[^\]]+\)\]', 'mt-2 md:mt-3 xl:mt-4', content)
content = re.sub(r'gap-\[clamp\([^,]+,[^,]+,[^\]]+\)\]', 'gap-2 md:gap-3 xl:gap-4', content)
content = re.sub(r'w-\[clamp\([^,]+,[^,]+,[^\]]+\)\]', 'w-3 md:w-4 xl:w-5', content)
content = re.sub(r'h-\[clamp\([^,]+,[^,]+,[^\]]+\)\]', 'h-3 md:h-4 xl:h-5', content)
content = re.sub(r'px-\[clamp\([^,]+,[^,]+,[^\]]+\)\]', 'px-2 md:px-3', content)
content = re.sub(r'py-\[clamp\([^,]+,[^,]+,[^\]]+\)\]', 'py-1 md:py-2', content)

with open('src/components/SphinxMap.tsx', 'w') as f:
    f.write(content)

