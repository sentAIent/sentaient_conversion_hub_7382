import sys

def check_brackets_debug(filename):
    with open(filename, 'r') as f:
        lines = f.readlines()
    
    stack = []
    class_level = 0
    
    for i, line in enumerate(lines):
        line_no = i + 1
        for char in line:
            if char == '{':
                stack.append(('{', line_no))
            elif char == '}':
                if not stack:
                    print(f"Unexpected }} at line {line_no}")
                    return
                stack.pop()
        
        # Check balance at the end of each line that looks like a class member end
        if len(stack) == 1 and line.strip() == "}":
            print(f"Potential member end at line {line_no}")
        elif len(stack) == 0 and line.strip() == "}":
            print(f"Class end at line {line_no}")

    if stack:
        print(f"Unclosed blocks: {len(stack)}")
        for b, l in stack:
            print(f"  {b} from line {l}")
    else:
        print("Final Balance: OK")

if __name__ == "__main__":
    check_brackets_debug(sys.argv[1])
