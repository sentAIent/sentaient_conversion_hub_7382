import re

with open('src/components/dfs/DFSDashboard.tsx', 'r') as f:
    content = f.read()

# Replace getPivotsForPlayer
old_pivot = """  const getPivotsForPlayer = (player: DFSPlayer) => {
    return playerPool.filter(p => {
      if (p.player_id === player.player_id) return false;
      if (p.players?.position !== player.players?.position) return false;
      const s = (p.injury_status || '').toLowerCase();
      if (['out', 'ir', 'doubtful'].includes(s)) return false;
      
      if (pivotSalaryPref === '+/-1000') {
        if (Math.abs(p.salary - player.salary) > 1000) return false;
      } else {
        if (p.salary > player.salary) return false;
      }
      
      return p.value_score >= player.value_score * 0.9; // Must be comparable value
    }).sort((a, b) => b.value_score - a.value_score).slice(0, 5);
  };"""

new_pivot = """  const getPivotsForPlayer = (player: DFSPlayer) => {
    const filledSlots = lineup.filter(Boolean).length;
    const isComplete = filledSlots >= slots.length - 1; // If 1 slot left, this player would complete it
    const benchmarkSalary = isComplete ? (player.salary + remaining) : player.salary;

    return playerPool.filter(p => {
      if (p.player_id === player.player_id) return false;
      if (p.players?.position !== player.players?.position) return false;
      const s = (p.injury_status || '').toLowerCase();
      if (['out', 'ir', 'doubtful'].includes(s)) return false;
      
      if (pivotSalaryPref === '+/-1000') {
        if (Math.abs(p.salary - benchmarkSalary) > 1000) return false;
      } else {
        if (p.salary > benchmarkSalary) return false;
      }
      
      return p.value_score >= player.value_score * 0.9; // Must be comparable value
    }).sort((a, b) => b.value_score - a.value_score).slice(0, 5);
  };"""

content = content.replace(old_pivot, new_pivot)

# Also let's find the Settings Modal to add the Custom Views saving UI
# It's inside {showColSettings && ( ... )}

settings_modal_regex = re.compile(r'(\{showColSettings && \(\s*<div.*?)(<h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Column Settings</h3>)(.*?)(\)\}', re.DOTALL)

with open('src/components/dfs/DFSDashboard.tsx', 'w') as f:
    f.write(content)

