import sys

def check_brackets(filename):
    with open(filename, 'r') as f:
        content = f.read()
    
    stack = []
    line_no = 1
    col_no = 1
    
    for i, char in enumerate(content):
        if char == '\n':
            line_no += 1
            col_no = 1
        else:
            col_no += 1
            
        if char == '{':
            stack.append(('{', line_no, col_no, i))
        elif char == '}':
            if not stack:
                print(f"Unexpected }} at line {line_no}, col {col_no} (char {i})")
                return
            opening, l, c, pos = stack.pop()
            if opening != '{':
                print(f"Mismatched }} at line {line_no}, col {col_no} (expected {opening} from line {l})")
                return
        elif char == '(':
            stack.append(('(', line_no, col_no, i))
        elif char == ')':
            if not stack:
                print(f"Unexpected ) at line {line_no}, col {col_no} (char {i})")
                return
            opening, l, c, pos = stack.pop()
            if opening != '(':
                print(f"Mismatched ) at line {line_no}, col {col_no} (expected {opening} from line {l})")
                return
        elif char == '[':
            stack.append(('[', line_no, col_no, i))
        elif char == ']':
            if not stack:
                print(f"Unexpected ] at line {line_no}, col {col_no} (char {i})")
                return
            opening, l, c, pos = stack.pop()
            if opening != '[':
                print(f"Mismatched ] at line {line_no}, col {col_no} (expected {opening} from line {l})")
                return

    if stack:
        for opening, l, c, pos in stack:
            print(f"Unclosed {opening} from line {l}, col {c}")
    else:
        print("OK")

if __name__ == "__main__":
    check_brackets(sys.argv[1])
