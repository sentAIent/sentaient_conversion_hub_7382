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
            stack.append(char)
        elif char in '})':
            if not stack:
                print(f"UNEXPECTED {char} at line {line_no}")
                return
            stack.pop()
            if not stack and line_no > 10:
                print(f"Reached depth 0 at line {line_no}, char at that line: {char}")
                # Print the line
                content_lines = content.split('\n')
                print(f"Line content: {content_lines[line_no-1]}")
                # return # Stop at first one

if __name__ == "__main__":
    find_first_zero(sys.argv[1])
