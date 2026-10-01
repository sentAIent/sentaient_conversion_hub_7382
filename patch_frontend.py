import re

with open('lim_clone/frontend/src/components/StrategyStudio.jsx', 'r') as f:
    content = f.read()

replacement = '''    } catch (e) {
      console.error('Failed to load universes:', e);
      alert('Error connecting to Python API: ' + e.message);
    }'''

pattern = re.compile(r'    \} catch \(e\) \{\n      console\.warn\(\'Using local universes fallback\', e\);\n      setUniverses\(\[\n        \{ id: \'SP500_MOMENTUM\', name: \'S&P 500 Mega-Cap Momentum\', symbols: \[\'NVDA\', \'AAPL\', \'MSFT\', \'TSLA\'\] \},\n        \{ id: \'CRYPTO_TOP_MAJORS\', name: \'Crypto Core Digital Assets\', symbols: \[\'BTC-USD\', \'ETH-USD\', \'SOL-USD\'\] \},\n        \{ id: \'ENERGY_COMMODITIES\', name: \'Energy & Commodities\', symbols: \[\'GLD\', \'SLV\', \'USO\', \'XOM\'\] \}\n      \]\);\n    \}')
content = pattern.sub(replacement, content)

with open('lim_clone/frontend/src/components/StrategyStudio.jsx', 'w') as f:
    f.write(content)
