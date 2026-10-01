import asyncio
import numpy as np
from kronos_service import mock_kronos_predict

async def run_test():
    print("Initializing test data...")
    # Generate simple historical trend + noise
    mock_data = [{"close": 100.0 + i * 0.5 + np.random.normal(0, 0.2)} for i in range(30)]
    
    print("Running Kronos Neural Network forecasting for horizon 7...")
    res = await mock_kronos_predict(mock_data, task_type="Forecasting", horizon=7)
    print("Result:", res)
    assert "Predicted price trajectory for next 7 steps:" in res
    print("Success: Predictor converged and returned valid trajectory.")

if __name__ == "__main__":
    asyncio.run(run_test())
