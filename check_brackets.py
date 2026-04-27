
def check_brackets(file_path):
    try:
        with open(file_path, 'r') as f:
            content = f.read()
            stack = []
            in_string = False
            string_char = None
            in_comment = False
            comment_type = None # 'single' or 'multi'
            
            i = 0
            while i < len(content):
                char = content[i]
                
                if in_comment:
                    if comment_type == 'single' and char == '\n':
                        in_comment = False
                    elif comment_type == 'multi' and char == '*' and i+1 < len(content) and content[i+1] == '/':
                        in_comment = False
                        i += 1
                    i += 1
                    continue
                
                if in_string:
                    if char == string_char and (content[i-1] != '\\' or (i > 1 and content[i-2] == '\\')):
                        in_string = False
                    i += 1
                    continue
                
                # Comments
                if char == '/' and i+1 < len(content):
                    if content[i+1] == '/':
                        in_comment = True
                        comment_type = 'single'
                        i += 2
                        continue
                    elif content[i+1] == '*':
                        in_comment = True
                        comment_type = 'multi'
                        i += 2
                        continue
                
                # Strings
                if char in "'\"`":
                    in_string = True
                    string_char = char
                    i += 1
                    continue
                    
                if char in '([{':
                    stack.append((char, i))
                elif char in ')]}':
                    if not stack:
                        print(f'ERROR: Unexpected {char} at char {i}')
                        # line number
                        line = content.count('\n', 0, i) + 1
                        print(f'Line: {line}')
                        return False
                    last, pos = stack.pop()
                    pairs = {'(': ')', '[': ']', '{': '}'}
                    if pairs[last] != char:
                        print(f'ERROR: Mismatched {char} at {i} (expected {pairs[last]} for {last} at {pos})')
                        line = content.count('\n', 0, i) + 1
                        print(f'Line: {line}')
                        return False
                i += 1
                
            if stack:
                last, pos = stack.pop()
                print(f'ERROR: Unclosed {last} from char {pos}')
                line = content.count('\n', 0, pos) + 1
                print(f'Line: {line}')
                return False
            print('OK')
            return True
    except Exception as e:
        print(f'ERROR: {e}')
        return False

import sys
file_to_check = sys.argv[1]
print(f'Checking {file_to_check}:')
check_brackets(file_to_check)
