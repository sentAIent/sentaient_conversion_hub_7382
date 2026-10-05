with open('lim_clone/frontend/src/components/AnalyticsPanel.jsx', 'r') as f:
    content = f.read()

pulse_style = """
<style>
{`
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`}
</style>
"""

if '<style>' not in content:
    content = content.replace('<div className="panel" style={{ marginTop: \'16px\', overflowY: \'auto\', maxHeight: \'400px\' }}>',
                              '<div className="panel" style={{ marginTop: \'16px\', overflowY: \'auto\', maxHeight: \'400px\' }}>' + pulse_style)

with open('lim_clone/frontend/src/components/AnalyticsPanel.jsx', 'w') as f:
    f.write(content)
