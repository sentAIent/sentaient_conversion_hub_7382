
import sys

def prune_file(filepath, start_line, end_line):
    with open(filepath, 'r') as f:
        lines = f.readlines()
    
    # start_line and end_line are 1-indexed
    # We want to remove lines from index start_line-1 to end_line-1
    new_lines = lines[:start_line-1] + lines[end_line:]
    
    with open(filepath, 'w') as f:
        f.writelines(new_lines)

if __name__ == "__main__":
    prune_file(sys.argv[1], int(sys.argv[2]), int(sys.argv[3]))
