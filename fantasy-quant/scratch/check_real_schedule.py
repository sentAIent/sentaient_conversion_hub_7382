import nfl_data_py as nfl
import sys
try:
    df = nfl.import_schedules([2026])
    print("Found schedule for 2026! Rows:", len(df))
    print(df.head())
except Exception as e:
    print("Error:", e)
