import re

with open('src/components/dfs/DFSDashboard.tsx', 'r') as f:
    content = f.read()

# Let's find the start of the switch statement and end of it.
start_idx = content.find("{visibleCols.map(colId => {")
end_idx = content.find("        )}", start_idx) + 10 # including the extra )}

if start_idx == -1:
    print("Cannot find switch block")
    exit(1)

proper_switch_block = """{visibleCols.map(colId => {
          switch (colId) {
            case 'pos': return (
              <span key={colId} className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${posColors} flex-shrink-0 w-8 text-center`}>
                {p?.position}
              </span>
            );
            case 'name': return (
              <div key={colId} className="min-w-[150px] flex-1">
                <div className="text-sm font-semibold text-white flex items-center">
                  <span className="truncate">{player.players?.name}</span>
                  <InjuryBadge status={player.injury_status} prob={player.play_probability} />
                </div>
                <div className="text-xs text-gray-600">{p?.team}</div>
              </div>
            );
            case 'main_prop': return (
              <div key={colId} className="w-16 text-xs text-center hidden sm:block flex-shrink-0">
                {mainProp ? (
                  <>
                    <div className="text-gray-400 truncate">{mainProp.prop_type.replace('_', ' ')}</div>
                    <div className="text-white font-semibold">{mainProp.line} <span className={mainProp.over_odds < 0 ? 'text-emerald-400 text-[10px]' : 'text-red-400 text-[10px]'}>{mainProp.over_odds}</span></div>
                  </>
                ) : <span className="text-gray-700">-</span>}
              </div>
            );
            case 'td_odds': return (
              <div key={colId} className="w-16 text-xs text-center hidden sm:block flex-shrink-0">
                <div className="text-gray-400">TD Odds</div>
                {tdProp ? (
                  <div className={tdProp.over_odds < 150 ? 'text-emerald-400 font-semibold' : 'text-white'}>+{tdProp.over_odds}</div>
                ) : <span className="text-gray-700">-</span>}
              </div>
            );
            case 'snap_pct': return (
              <div key={colId} className="w-14 text-xs text-center hidden md:block flex-shrink-0">
                <div className="text-gray-500">Snap%</div>
                {advStats?.snap_pct != null ? <div className="text-white font-semibold">{(advStats.snap_pct * 100).toFixed(0)}%</div> : <span className="text-gray-700">-</span>}
              </div>
            );
            case 'tgt_share': return (
              <div key={colId} className="w-14 text-xs text-center hidden md:block flex-shrink-0">
                <div className="text-gray-500">Tgt%</div>
                {advStats?.target_share != null ? <div className="text-white font-semibold">{(advStats.target_share * 100).toFixed(0)}%</div> : <span className="text-gray-700">-</span>}
              </div>
            );
            case 'wopr': return (
              <div key={colId} className="w-14 text-xs text-center hidden lg:block flex-shrink-0">
                <div className="text-gray-500">WOPR</div>
                {advStats?.wopr != null ? <div className="text-white font-semibold">{advStats.wopr.toFixed(2)}</div> : <span className="text-gray-700">-</span>}
              </div>
            );
            case 'adot': return (
              <div key={colId} className="w-14 text-xs text-center hidden lg:block flex-shrink-0">
                <div className="text-gray-500">aDOT</div>
                {advStats?.adot != null ? <div className="text-white font-semibold">{advStats.adot.toFixed(1)}</div> : <span className="text-gray-700">-</span>}
              </div>
            );
            case 'racr': return (
              <div key={colId} className="w-14 text-xs text-center hidden lg:block flex-shrink-0">
                <div className="text-gray-500">RACR</div>
                {(advStats as any)?.racr != null ? <div className="text-white font-semibold">{(advStats as any).racr.toFixed(2)}</div> : <span className="text-gray-700">-</span>}
              </div>
            );
            case 'matchup': return (
              <div key={colId} className="w-20 text-xs text-center hidden xl:block flex-shrink-0">
                <div className="text-gray-500">Matchup</div>
                {player.defensive_matchup ? (
                  <div className={player.defensive_matchup.rank > 20 ? 'text-emerald-400 font-semibold' : player.defensive_matchup.rank < 12 ? 'text-red-400 font-semibold' : 'text-white'}>
                    {player.defensive_matchup.rank}th
                  </div>
                ) : <span className="text-gray-700">-</span>}
              </div>
            );
            case 'cb_shadow': return (
              <div key={colId} className="w-32 text-xs text-center hidden xl:block flex-shrink-0">
                <div className="text-gray-500">CB Shadow</div>
                {player.defensive_matchup ? (
                  <div className="text-gray-300 truncate px-1 text-[10px] uppercase tracking-wide">
                    {player.defensive_matchup.cb_shadow}
                  </div>
                ) : <span className="text-gray-700">-</span>}
              </div>
            );
            case 'coverage': return (
              <div key={colId} className="w-24 text-xs text-center hidden xl:block flex-shrink-0">
                <div className="text-gray-500">Coverage</div>
                {player.defensive_matchup ? (
                  <div className="flex flex-col">
                    <span className="text-blue-400 text-[10px] font-bold">{player.defensive_matchup.man_zone_pct}</span>
                    <span className="text-gray-400 text-[10px]">{player.defensive_matchup.primary_shell}</span>
                  </div>
                ) : <span className="text-gray-700">-</span>}
              </div>
            );
            case 'weather': return (
              <div key={colId} className="w-16 text-xs text-center hidden xl:block flex-shrink-0">
                <div className="text-gray-500">Env</div>
                {player.game_environment ? (
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-[10px]">{player.game_environment.temp}°</span>
                    <span className="text-gray-400 text-[10px] truncate">{player.game_environment.weather === 'Clear' ? '☀️' : player.game_environment.weather === 'Rain' ? '🌧️' : '❄️'} {player.game_environment.surface === 'Turf' ? 'T' : 'G'}</span>
                  </div>
                ) : <span className="text-gray-700">-</span>}
              </div>
            );
            case 'own': return (
              <div key={colId} className="w-14 text-xs text-center flex-shrink-0">
                <div className="text-gray-500">Own</div>
                <div className={`font-semibold ${parseFloat(ownership) > 25 ? 'text-orange-400' : parseFloat(ownership) < 10 ? 'text-emerald-400' : 'text-white'}`}>
                  {ownership}%
                </div>
              </div>
            );
            case 'proj': return (
              <div key={colId} className="w-14 text-xs text-center flex-shrink-0">
                <div className="text-gray-500">Proj</div>
                <div className="text-blue-400 font-bold">{player.projected_pts.toFixed(1)}</div>
              </div>
            );
            case 'salary': return (
              <div key={colId} className="w-16 text-xs text-center flex-shrink-0">
                <div className="text-gray-500">Salary</div>
                <div className="text-white font-semibold">${(player.salary / 1000).toFixed(1)}K</div>
              </div>
            );
            case 'value': return (
              <div key={colId} className="w-14 hidden lg:flex items-center justify-center flex-shrink-0">
                <ValueBadge score={player.value_score} />
              </div>
            );
            default: return null;
          }
        })}"""

# But wait, there is also some leftover garbage before the switch statement because the regex didn't match lines 153 to 168!
# I need to find the actual start of the mess.
start_idx = content.find("{visibleCols.includes('pos') && (")
if start_idx == -1:
    print("Cannot find start of pos")
    exit(1)

content = content[:start_idx] + proper_switch_block + content[end_idx:]

with open('src/components/dfs/DFSDashboard.tsx', 'w') as f:
    f.write(content)

print("Fixed")
