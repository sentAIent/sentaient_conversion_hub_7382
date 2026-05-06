import sys

def check_brackets_depth(filename):
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
                if not stack:
                    print(f"Depth 0 reach at line {line_no}")
                elif len(stack) == 1:
                    # print(f"Depth 1 reach at line {line_no}")
                    pass
            else:
                print(f"Mismatched {char} at line {line_no} (opening {opening} from line {l})")
                return

    if stack:
        print(f"Unclosed: {len(stack)}")
    else:
        print("OK")

if __name__ == "__main__":
    check_brackets_depth(sys.argv[1])
