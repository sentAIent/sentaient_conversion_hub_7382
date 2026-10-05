import nfl_data_py as nfl
import sys
try:
    df = nfl.import_rosters([2026])
    dart = df[df['player_name'].str.contains('Dart', case=False, na=False)]
    shough = df[df['player_name'].str.contains('Shough', case=False, na=False)]
    print("Dart:")
    print(dart[['player_name', 'team', 'position']])
    print("Shough:")
    print(shough[['player_name', 'team', 'position']])
except Exception as e:
    print("Error:", e)
