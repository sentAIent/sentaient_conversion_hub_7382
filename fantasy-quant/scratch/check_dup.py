import nfl_data_py as nfl
df_26 = nfl.import_schedules([2026])
df_24 = nfl.import_schedules([2024])
print("2026 game 1:", df_26.iloc[0]['game_id'])
print("2024 game 1:", df_24.iloc[0]['game_id'])
