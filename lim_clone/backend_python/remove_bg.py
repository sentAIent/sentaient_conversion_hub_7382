import sys
from rembg import remove
from PIL import Image

def process():
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    print(f"Processing {input_path} to {output_path}")
    
    with open(input_path, 'rb') as i:
        input_data = i.read()
        output_data = remove(input_data)
        
    with open(output_path, 'wb') as o:
        o.write(output_data)
        
    print("Done!")

if __name__ == '__main__':
    process()
