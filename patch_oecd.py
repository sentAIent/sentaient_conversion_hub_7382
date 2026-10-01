import re

with open('lim_clone/backend_python/fincept_analytics/oecd_data.py', 'r') as f:
    content = f.read()

replacement = '''                # Filter and process data...
                if data is not None and not data.empty:
                    result_data = data.to_dict('records')
                else:
                    result_data = []'''

pattern = re.compile(r'                # Filter and process data\.\.\.\n                result_data = \[\]  # Placeholder for processed data')
content = pattern.sub(replacement, content)

with open('lim_clone/backend_python/fincept_analytics/oecd_data.py', 'w') as f:
    f.write(content)
