import sys
import re

def find_stray_zero(filename):
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
                print(f"STRAY ZERO DEPTH at line {line_no}")
                with open(filename, 'r') as f2:
                    orig_lines = f2.readlines()
                print(f"Original line {line_no}: {orig_lines[line_no-1].strip()}")
                return
            stack.pop()
            if not stack:
                if line_no > 100: # Only print major drops
                     print(f"Reached depth 0 at line {line_no}")
                     with open(filename, 'r') as f2:
                        orig_lines = f2.readlines()
                     print(f"Original line {line_no}: {orig_lines[line_no-1].strip()}")
                     # return

if __name__ == "__main__":
    find_stray_zero(sys.argv[1])
