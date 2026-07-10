import re
import os

SCRIPT_PATH = 'public/interstellar-game/script.js'
CONSTANTS_PATH = 'public/interstellar-game/js/core/constants.js'

def extract_object_by_brace_counting(text, start_pattern):
    match = re.search(start_pattern, text)
    if not match:
        return None, text
    
    start_idx = match.start()
    brace_start = text.find('{', start_idx)
    if brace_start == -1:
        brace_start = text.find('[', start_idx)
    
    if brace_start == -1:
        return None, text

    open_char = text[brace_start]
    close_char = '}' if open_char == '{' else ']'
    
    brace_count = 0
    end_idx = -1
    
    for i in range(brace_start, len(text)):
        if text[i] == open_char:
            brace_count += 1
        elif text[i] == close_char:
            brace_count -= 1
            if brace_count == 0:
                end_idx = i
                break
                
    if end_idx != -1:
        # Find the end of the statement (semicolon)
        semicolon_idx = text.find(';', end_idx)
        if semicolon_idx != -1 and semicolon_idx - end_idx < 10:
            end_idx = semicolon_idx
            
        extracted = text[start_idx:end_idx+1]
        
        # We need to preserve 'this' assignments in script.js by replacing them with something else or just pulling the right side
        
        # Remove it from original text
        new_text = text[:start_idx] + "\n        // [EXTRACTED to constants.js]\n" + text[end_idx+1:]
        
        return extracted, new_text
        
    return None, text

def main():
    os.makedirs(os.path.dirname(CONSTANTS_PATH), exist_ok=True)
    
    with open(SCRIPT_PATH, 'r', encoding='utf-8') as f:
        text = f.read()

    patterns_to_extract = [
        r'this\.equipmentDB\s*=\s*\{',
        r'this\.baseModules\s*=\s*\{',
        r'this\.mineralTypes\s*=\s*\{',
        r'this\.galaxyZones\s*=\s*\{',
        r'this\.hangarShips\s*=\s*\['
    ]
    
    extracted_blocks = []
    
    for pattern in patterns_to_extract:
        block, text = extract_object_by_brace_counting(text, pattern)
        if block:
            # Convert 'this.something = ' to 'export const something = '
            # First find the variable name
            name_match = re.search(r'this\.([a-zA-Z0-9_]+)\s*=', block)
            if name_match:
                var_name = name_match.group(1)
                block = re.sub(r'this\.[a-zA-Z0-9_]+\s*=', f'export const {var_name} =', block, count=1)
            extracted_blocks.append(block)

    if extracted_blocks:
        with open(CONSTANTS_PATH, 'w', encoding='utf-8') as f:
            f.write("// Extracted Constants\n\n")
            f.write("\n\n".join(extracted_blocks))
            
        with open(SCRIPT_PATH, 'w', encoding='utf-8') as f:
            f.write(text)
            
        print(f"Successfully extracted {len(extracted_blocks)} constant blocks.")
    else:
        print("No blocks found.")

if __name__ == '__main__':
    main()
