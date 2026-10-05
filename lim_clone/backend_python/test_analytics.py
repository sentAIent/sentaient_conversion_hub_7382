import unittest
from unittest.mock import patch, MagicMock
import pandas as pd
import numpy as np
from main import calculate_sophisticated_analytics

class TestQuantAnalytics(unittest.TestCase):
    
    @patch('main.yf.Ticker')
    def test_analytics_empty_data(self, mock_ticker):
        # Setup mock ticker returning empty history
        mock_instance = MagicMock()
        mock_instance.history.return_value = pd.DataFrame()
        mock_ticker.return_value = mock_instance
        
        result = calculate_sophisticated_analytics("INVALID_SYMBOL")
        self.assertIsNone(result)

    @patch('main.yf.Ticker')
    def test_analytics_math_precision(self, mock_ticker):
        # Create a mock series of 50 trading days with known mathematical trends
        dates = pd.date_range(start="2026-01-01", periods=100, freq="D")
        
        # Asset price starting at 100, moving steadily up
        asset_prices = np.linspace(100, 150, 100)
        # SPY starting at 400, moving up at a slightly lower rate
        spy_prices = np.linspace(400, 420, 100)
        
        df_asset = pd.DataFrame({"Close": asset_prices}, index=dates)
        df_spy = pd.DataFrame({"Close": spy_prices}, index=dates)
        
        # Setup mock ticker objects
        mock_asset_instance = MagicMock()
        mock_asset_instance.history.return_value = df_asset
        
        mock_spy_instance = MagicMock()
        mock_spy_instance.history.return_value = df_spy
        
        # Side effect to return asset ticker first, then spy ticker
        mock_ticker.side_effect = [mock_asset_instance, mock_spy_instance]
        
        result = calculate_sophisticated_analytics("MOCK")
        
        self.assertIsNotNone(result)
        self.assertIn("volatility", result)
        self.assertIn("sharpe_ratio", result)
        self.assertIn("sortino_ratio", result)
        self.assertIn("beta", result)
        self.assertIn("alpha", result)
        self.assertIn("skewness", result)
        self.assertIn("kurtosis", result)
        self.assertIn("correlation_spy", result)
        self.assertIn("indicators", result)
        
        # Verify specific technical indicators exist
        indicators = result["indicators"]
        self.assertIn("sma_20", indicators)
        self.assertIn("ema_10", indicators)
        self.assertIn("rsi_14", indicators)
        self.assertIn("bb_upper", indicators)
        self.assertIn("bb_lower", indicators)
        
        # Price at the end is 150
        self.assertAlmostEqual(result["current_price"], 150.0)

if __name__ == "__main__":
    unittest.main()
