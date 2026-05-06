import sys
import re

def check_syntax(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    # Simple regex to remove strings and comments
    # Strings: '...', "...", `...` (primitive, doesn't handle escapes perfectly but good enough for this)
    content = re.sub(r"'[^'\\]*(?:\\.[^'\\]*)*'", "''", content)
    content = re.sub(r'"[^"\\]*(?:\\.[^"\\]*)*"', '""', content)
    content = re.sub(r'`[^`\\]*(?:\\.[^`\\]*)*`', "``", content)
    
    # Comments: // ... and /* ... */
    content = re.sub(r"//.*", "", content)
    content = re.sub(r"/\*[\s\S]*?\*/", "", content)
    
    stack = []
    line_no = 1
    
    for i, char in enumerate(content):
        if char == '\n':
            line_no += 1
            
        if char in '{(':
            stack.append((char, line_no))
        elif char in '})':
            if not stack:
                print(f"Unexpected {char} at line {line_no}")
                return
            opening, l = stack.pop()
            if (opening == '{' and char == '}') or (opening == '(' and char == ')'):
                pass
            else:
                print(f"Mismatched {char} at line {line_no} (opening {opening} from line {l})")
                return

    if stack:
        print(f"Unclosed: {len(stack)}")
        for char, line in stack:
            print(f"  {char} from line {line}")
    else:
        print("OK")

if __name__ == "__main__":
    check_syntax(sys.argv[1])
