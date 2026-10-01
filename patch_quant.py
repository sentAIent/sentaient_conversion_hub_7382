import re

with open('lim_clone/backend_python/quant_lean_engine.py', 'r') as f:
    content = f.read()

replacement = '''        if not price_dict:
            raise ValueError(f"Failed to fetch market data for {symbols}. Network restricted or API limits exceeded.")
'''
pattern = re.compile(r'        # Fallback synthetic generator if network is restricted\n        if not price_dict:.*?if not price_dict:\n            raise ValueError\("No historical price data could be loaded for universe\."\)', re.DOTALL)
content = pattern.sub(replacement, content)

with open('lim_clone/backend_python/quant_lean_engine.py', 'w') as f:
    f.write(content)
