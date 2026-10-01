import subprocess
from dagster import asset

@asset
def import_advanced_stats():
    """Runs the advanced stats import script"""
    subprocess.run(["python", "import_advanced_stats.py"], cwd="..", check=False)
    return "Advanced stats imported"

@asset(deps=[import_advanced_stats])
def calculate_fpa_sos():
    """Calculates FPA SOS, depends on stats being imported"""
    subprocess.run(["python", "scratch/calculate_fpa_sos.py"], cwd="../..", check=False)
    return "FPA SOS calculated"

@asset(deps=[calculate_fpa_sos])
def train_ml_model():
    """Trains the XGBoost model using Optuna, depends on FPA SOS"""
    subprocess.run(["python", "ml/train_xgboost.py"], cwd="..", check=False)
    return "ML model trained"
