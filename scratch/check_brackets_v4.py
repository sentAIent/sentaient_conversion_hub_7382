import sys

def check_brackets_full(filename):
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
                print(f"Unexpected {char} at line {line_no}")
                return
            opening, l = stack.pop()
            if (opening == '{' and char == '}') or (opening == '(' and char == ')'):
                if not stack and line_no > 10: # Only print major drops
                    print(f"Depth 0 at line {line_no}")
            else:
                print(f"Mismatched {char} at line {line_no}")
                return
    
    # Print depth at some key lines
    print(f"Final stack size: {len(stack)}")

if __name__ == "__main__":
    check_brackets_full(sys.argv[1])
