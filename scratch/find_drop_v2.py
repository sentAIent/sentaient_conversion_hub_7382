import sys

def find_drops_refined(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    stack = []
    line_no = 1
    
    for i, char in enumerate(content):
        if char == '\n':
            line_no += 1
            
        if char in '{(':
            stack.append((char, line_no))
        elif char in '})':
            if not stack: continue
            stack.pop()
            if line_no >= 2476 and line_no <= 3150:
                if len(stack) <= 2:
                     lines = content.split('\n')
                     print(f"Depth {len(stack)} reached at line {line_no}: {lines[line_no-1]}")

if __name__ == "__main__":
    find_drops_refined(sys.argv[1])
