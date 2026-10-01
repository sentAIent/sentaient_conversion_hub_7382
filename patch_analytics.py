import re

with open('lim_clone/frontend/src/components/AnalyticsPanel.jsx', 'r') as f:
    content = f.read()

# Replace StatBox
new_statbox = """const StatBox = ({ label, value, color = '#f8fafc' }) => (
  <div style={{ background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.05)', padding: '12px 14px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
    <div style={{ color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    <div style={{ color: color, fontWeight: 700, fontSize: '1.2rem', fontVariantNumeric: 'tabular-nums' }}>{value}</div>
  </div>
);"""
content = re.sub(r'const StatBox = .*?\);', new_statbox, content, flags=re.DOTALL)

# Replace loading state
new_loading = """      {loading || !stats ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '8px', height: '64px', animation: 'pulse 1.5s infinite' }}></div>
          ))}
        </div>
      ) : ("""
content = content.replace("      {loading || !stats ? (\n        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading quantitative metrics...</div>\n      ) : (", new_loading)

with open('lim_clone/frontend/src/components/AnalyticsPanel.jsx', 'w') as f:
    f.write(content)
