import sys
import re

def check_syntax(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    def replacer(match):
        return " " * match.group(0).count(" ") + "\n" * match.group(0).count("\n")
    
    # Strings: '...', "...", `...` 
    content = re.sub(r"'[^'\\]*(?:\\.[^'\\]*)*'", replacer, content)
    content = re.sub(r'"[^"\\]*(?:\\.[^"\\]*)*"', replacer, content)
    content = re.sub(r'`[^`\\]*(?:\\.[^`\\]*)*`', replacer, content)
    
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
                # Get the actual line from the original file
                with open(filename, 'r') as f2:
                    orig_lines = f2.readlines()
                print(f"Original line {line_no}: {orig_lines[line_no-1].strip()}")
                return
            opening, l = stack.pop()
            if (opening == '{' and char == '}') or (opening == '(' and char == ')'):
                pass
            else:
                print(f"Mismatched {char} at line {line_no} (opening {opening} from line {l})")
                with open(filename, 'r') as f2:
                    orig_lines = f2.readlines()
                print(f"Original line {line_no}: {orig_lines[line_no-1].strip()}")
                return

    if stack:
        print(f"Unclosed: {len(stack)}")
        with open(filename, 'r') as f2:
            orig_lines = f2.readlines()
        for char, line in stack:
            print(f"  {char} from line {line}: {orig_lines[line-1].strip()}")
    else:
        print("OK")

if __name__ == "__main__":
    check_syntax(sys.argv[1])
