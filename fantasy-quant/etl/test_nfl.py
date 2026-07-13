import nfl_data_py as nfl
import pandas as pd

# Fetch schedule for a year, say 2023
schedule = nfl.import_schedules([2023])
print(schedule.head())
print(schedule.columns)
