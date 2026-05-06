import sys

def find_unexpected_drop(filename):
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
            if not stack:
                continue # or handle error
            stack.pop()
            if line_no >= 2470 and line_no <= 3150:
                if len(stack) == 1: # We are back to class level
                     # Check if this is a function end
                     lines = content.split('\n')
                     print(f"Reached depth 1 at line {line_no}: {lines[line_no-1]}")

if __name__ == "__main__":
    find_unexpected_drop(sys.argv[1])
