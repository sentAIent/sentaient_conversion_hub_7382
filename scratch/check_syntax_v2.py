import sys
import re

def check_syntax(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    def replacer(match):
        return "\n" * match.group(0).count("\n")
    
    # Strings: '...', "...", `...` 
    content = re.sub(r"'[^'\\]*(?:\\.[^'\\]*)*'", "''", content)
    content = re.sub(r'"[^"\\]*(?:\\.[^"\\]*)*"', '""', content)
    content = re.sub(r'`[^`\\]*(?:\\.[^`\\]*)*`', replacer, content) # handle multiline template literals
    
    # Comments: // ... and /* ... */
    content = re.sub(r"//.*", "", content)
    content = re.sub(r"/\*[\s\S]*?\*/", replacer, content)
    
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
                # Print current line for context
                lines = content.split('\n')
                print(f"Context: {lines[line_no-1]}")
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
