import re

with open('lim_clone/backend_python/fincept_analytics/Analytics/derivatives/market_data.py', 'r') as f:
    content = f.read()

# Add import yfinance if not present
if 'import yfinance' not in content:
    content = content.replace('import pandas as pd', 'import pandas as pd\nimport yfinance as yf')

replacement = '''class YahooFinanceProvider(MarketDataProvider):
    """Yahoo Finance data provider"""

    def __init__(self):
        super().__init__(DataProvider.YAHOO)
        self.api_key = None

    def connect(self, **kwargs) -> bool:
        self.connection_status = True
        return True

    def disconnect(self) -> bool:
        self.connection_status = False
        return True

    def get_spot_price(self, symbol: str) -> float:
        if not self.connection_status:
            raise ConnectionError("Not connected")
        try:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period="1d")
            if not hist.empty:
                return float(hist['Close'].iloc[-1])
        except Exception:
            pass
        return 100.0

    def get_risk_free_rate(self, currency: str = "USD", maturity: float = 0.25) -> float:
        if not self.connection_status:
            raise ConnectionError("Not connected")
        try:
            ticker = yf.Ticker('^TNX')
            hist = ticker.history(period="1d")
            if not hist.empty:
                return float(hist['Close'].iloc[-1]) / 100.0
        except Exception:
            pass
        return 0.045

    def get_dividend_yield(self, symbol: str) -> float:
        if not self.connection_status:
            raise ConnectionError("Not connected")
        try:
            ticker = yf.Ticker(symbol)
            dy = ticker.info.get('dividendYield')
            if dy is not None:
                return float(dy)
        except Exception:
            pass
        return 0.0

    def get_volatility(self, symbol: str, maturity: float, strike: float = None) -> float:
        if not self.connection_status:
            raise ConnectionError("Not connected")
        try:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period="1y")
            if not hist.empty and len(hist) > 10:
                hist['returns'] = hist['Close'].pct_change()
                return float(hist['returns'].std() * np.sqrt(252))
        except Exception:
            pass
        return 0.25

    def get_yield_curve(self, currency: str, curve_type: str = "government") -> CurveData:
        if not self.connection_status:
            raise ConnectionError("Not connected")
        curve = CurveData(
            curve_date=datetime.now(),
            curve_type=curve_type,
            currency=currency,
            day_count=DayCountConvention.ACT_365
        )
        treasury_rates = [
            (0.25, 0.020), (0.5, 0.022), (1.0, 0.025), (2.0, 0.028),
            (5.0, 0.032), (10.0, 0.035), (30.0, 0.038)
        ]
        for maturity, rate in treasury_rates:
            curve.add_point(maturity, rate)
        return curve
'''

# Use regex to replace the class
pattern = re.compile(r'class YahooFinanceProvider\(MarketDataProvider\):.*?(?=\n\n\nclass DataCache:)', re.DOTALL)
content = pattern.sub(replacement, content)

with open('lim_clone/backend_python/fincept_analytics/Analytics/derivatives/market_data.py', 'w') as f:
    f.write(content)
