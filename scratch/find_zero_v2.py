import sys

def find_first_zero(filename):
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
                print(f"UNEXPECTED {char} at line {line_no}")
                return
            stack.pop()
            if not stack:
                if line_no > 5: # Ignore first import line
                    print(f"STRAY ZERO DEPTH at line {line_no}")
                    # Print context
                    lines = content.split('\n')
                    for j in range(max(0, line_no-10), min(len(lines), line_no+5)):
                        print(f"{j+1}: {lines[j]}")
                    return

if __name__ == "__main__":
    find_first_zero(sys.argv[1])
