import xgboost as xgb
import optuna
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Dummy data generator for Phase 6 skeleton
def generate_dummy_data(n_samples=1000):
    # Features: past_3_game_avg, opponent_fpa, target_share, weather_temp
    X = np.random.rand(n_samples, 4) * 100
    # Target: fantasy_points_ppr
    # Some true relationship + noise
    y = X[:, 0]*0.3 + X[:, 1]*0.1 + X[:, 2]*0.2 + (X[:, 3] > 80)*-2 + np.random.normal(0, 5, n_samples)
    return X, y

def objective(trial):
    X, y = generate_dummy_data()
    X_train, X_valid, y_train, y_valid = train_test_split(X, y, test_size=0.2)

    dtrain = xgb.DMatrix(X_train, label=y_train)
    dvalid = xgb.DMatrix(X_valid, label=y_valid)

    param = {
        "verbosity": 0,
        "objective": "reg:squarederror",
        "eval_metric": "rmse",
        "booster": trial.suggest_categorical("booster", ["gbtree", "gblinear", "dart"]),
        "lambda": trial.suggest_float("lambda", 1e-8, 1.0, log=True),
        "alpha": trial.suggest_float("alpha", 1e-8, 1.0, log=True),
    }

    if param["booster"] == "gbtree" or param["booster"] == "dart":
        param["max_depth"] = trial.suggest_int("max_depth", 1, 9)
        param["eta"] = trial.suggest_float("eta", 1e-8, 1.0, log=True)
        param["gamma"] = trial.suggest_float("gamma", 1e-8, 1.0, log=True)
        param["grow_policy"] = trial.suggest_categorical("grow_policy", ["depthwise", "lossguide"])

    if param["booster"] == "dart":
        param["sample_type"] = trial.suggest_categorical("sample_type", ["uniform", "weighted"])
        param["normalize_type"] = trial.suggest_categorical("normalize_type", ["tree", "forest"])
        param["rate_drop"] = trial.suggest_float("rate_drop", 1e-8, 1.0, log=True)
        param["skip_drop"] = trial.suggest_float("skip_drop", 1e-8, 1.0, log=True)

    bst = xgb.train(param, dtrain)
    preds = bst.predict(dvalid)
    rmse = mean_squared_error(y_valid, preds, squared=False)
    return rmse

if __name__ == "__main__":
    print("Initializing Optuna study for XGBoost Hyperparameter Tuning...")
    study = optuna.create_study(direction="minimize")
    study.optimize(objective, n_trials=5)
    
    print("Number of finished trials: ", len(study.trials))
    print("Best trial:")
    trial = study.best_trial

    print("  Value: {}".format(trial.value))
    print("  Params: ")
    for key, value in trial.params.items():
        print("    {}: {}".format(key, value))
        
    print("\n✅ XGBoost model tuned successfully. Ready for full integration.")
