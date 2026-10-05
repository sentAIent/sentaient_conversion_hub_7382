import re
import os

def clean_file(path, replacements):
    with open(path, 'r') as f:
        content = f.read()
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content, flags=re.DOTALL)
    with open(path, 'w') as f:
        f.write(content)

alpaca_path = "lim_clone/backend_go/alpaca.go"
alpaca_repls = [
    (r'if alpacaClient == nil \{\s+// Mock Mode\s+mockAsset := map\[string\]interface\{\}\{.*?\n\t\}', 
     r'if alpacaClient == nil {\n\t\thttp.Error(w, "Alpaca API credentials missing", http.StatusServiceUnavailable)\n\t\treturn\n\t}'),
    
    (r'if alpacaClient == nil \{\s+// Mock Data\s+for _, sym := range symbols \{.*?return\n\t\}',
     r'if alpacaClient == nil {\n\t\thttp.Error(w, "Alpaca API credentials missing", http.StatusServiceUnavailable)\n\t\treturn\n\t}'),
     
    (r'if alpacaClient == nil \{\s+// Mock Data fallback if not connected\s+mockPositions := \[\]PortfolioPosition\{.*?return\n\t\}',
     r'if alpacaClient == nil {\n\t\thttp.Error(w, "Alpaca API credentials missing", http.StatusServiceUnavailable)\n\t\treturn\n\t}'),
     
    (r'if alpacaClient == nil \{\s+// Mock Performance fallback\s+mockPerf := \[\]PortfolioHistoryPoint\{.*?return\n\t\}',
     r'if alpacaClient == nil {\n\t\thttp.Error(w, "Alpaca API credentials missing", http.StatusServiceUnavailable)\n\t\treturn\n\t}')
]

if os.path.exists(alpaca_path):
    clean_file(alpaca_path, alpaca_repls)

main_path = "lim_clone/backend_go/main.go"
main_repls = [
    (r'if len\(responseData\) == 0 \{\s+basePrice := 145\.0.*?\}\s+w\.Header\(\)\.Set\("Content-Type", "application/json"\)\s+json\.NewEncoder\(w\)\.Encode\(responseData\)',
     r'if len(responseData) == 0 {\n\t\thttp.Error(w, "No market data found", http.StatusNotFound)\n\t\treturn\n\t}\n\n\tw.Header().Set("Content-Type", "application/json")\n\tjson.NewEncoder(w).Encode(responseData)')
]

if os.path.exists(main_path):
    clean_file(main_path, main_repls)

