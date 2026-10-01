import nflreadpy as nfl
df = nfl.load_nextgen_stats(seasons=[2023], stat_type='receiving')
print(type(df))
