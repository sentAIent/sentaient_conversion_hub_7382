import re

with open('lim_clone/frontend/src/components/PortfolioDashboard.jsx', 'r') as f:
    content = f.read()

# Add AreaChart to imports
content = re.sub(r'LineChart, Line,', r'AreaChart, Area,', content)

# Replace LineChart component
chart_replacement = """<AreaChart data={performance} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fill: '#64748b' }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#64748b' }} domain={['auto', 'auto']} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #1e293b', borderRadius: '8px', backdropFilter: 'blur(10px)' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" activeDot={{ r: 8 }} />
                </AreaChart>"""

content = re.sub(r'<LineChart data=\{performance\}.*?</LineChart>', chart_replacement, content, flags=re.DOTALL)

with open('lim_clone/frontend/src/components/PortfolioDashboard.jsx', 'w') as f:
    f.write(content)
