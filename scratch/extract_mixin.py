import re
import sys
import os

def extract_methods(filepath, outpath, mixin_name, method_names):
    with open(filepath, 'r') as f:
        content = f.read()

    extracted_methods = []
    
    for method_name in method_names:
        # Regex to find the method definition
        # Matches: method_name(args) {
        pattern = re.compile(rf"^(\s*){method_name}\s*\([^)]*\)\s*{{", re.MULTILINE)
        match = pattern.search(content)
        
        if not match:
            print(f"Method {method_name} not found!")
            continue
            
        start_idx = match.start()
        
        # Brace matching
        brace_count = 0
        in_string = False
        string_char = ''
        escape = False
        
        end_idx = -1
        
        # Find the opening brace
        idx = start_idx
        while idx < len(content):
            char = content[idx]
            
            if escape:
                escape = False
                idx += 1
                continue
                
            if char == '\\':
                escape = True
            elif not in_string and (char == '"' or char == "'" or char == '`'):
                in_string = True
                string_char = char
            elif in_string and char == string_char:
                in_string = False
            elif not in_string:
                if char == '{':
                    brace_count += 1
                elif char == '}':
                    brace_count -= 1
                    if brace_count == 0:
                        end_idx = idx + 1
                        break
            idx += 1
            
        if end_idx != -1:
            method_code = content[start_idx:end_idx]
            extracted_methods.append(method_code.strip())
            
            # Remove from original
            content = content[:start_idx] + content[end_idx:]
            print(f"Extracted {method_name}")
        else:
            print(f"Failed to find end of {method_name}")

    if extracted_methods:
        # Write to mixin file
        os.makedirs(os.path.dirname(outpath), exist_ok=True)
        with open(outpath, 'w') as f:
            f.write(f"export function {mixin_name}(EngineClass) {{\n")
            f.write("    Object.assign(EngineClass.prototype, {\n\n")
            
            for i, method in enumerate(extracted_methods):
                # Indent method
                indented = "\n".join("        " + line if line.strip() else line for line in method.split('\n'))
                # Replace the very first indentation to align properly
                indented = indented.lstrip()
                f.write(f"        {indented}")
                if i < len(extracted_methods) - 1:
                    f.write(",\n\n")
                else:
                    f.write("\n")
                    
            f.write("\n    });\n}\n")
            
        # Write back to script.js
        with open(filepath, 'w') as f:
            f.write(content)
            
        print("Done!")

if __name__ == "__main__":
    extract_methods('public/interstellar-game/script.js', 'public/interstellar-game/js/mixins/RenderMixin.js', 'applyRenderMixin', ['initWebGL', 'init3DObjects', 'renderWebGL'])
