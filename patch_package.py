import json

with open('lim_clone/frontend/package.json', 'r') as f:
    pkg = json.load(f)

if '@capacitor/core' not in pkg.get('dependencies', {}):
    pkg['dependencies']['@capacitor/core'] = '^5.7.0'
    pkg['dependencies']['@capacitor/ios'] = '^5.7.0'
    pkg['dependencies']['@capacitor/android'] = '^5.7.0'
    pkg['devDependencies']['@capacitor/cli'] = '^5.7.0'

with open('lim_clone/frontend/package.json', 'w') as f:
    json.dump(pkg, f, indent=2)
