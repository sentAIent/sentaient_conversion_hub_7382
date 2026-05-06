import sys

def check_depth_at(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    stack = []
    line_no = 1
    
    for i, char in enumerate(content):
        if char == '\n':
            line_no += 1
            if line_no in [280, 1000, 2000, 2470, 3000, 3140, 3600]:
                print(f"Depth at line {line_no}: {len(stack)}")
            
        if char in '{(':
            stack.append(char)
        elif char in '})':
            if stack: stack.pop()

if __name__ == "__main__":
    check_depth_at(sys.argv[1])
