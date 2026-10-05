import nfl_data_py as nfl
import pandas as pd

try:
    sched = nfl.import_schedules([2026])
    print(f"Got 2026 schedule: {len(sched)} games")
except Exception as e:
    print(f"Failed to get 2026 schedule: {e}")

try:
    weekly = nfl.import_weekly_data([2026])
    print(f"Got 2026 weekly data: {len(weekly)} rows")
except Exception as e:
    print(f"Failed to get 2026 weekly data: {e}")
