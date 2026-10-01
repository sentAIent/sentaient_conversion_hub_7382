import re

with open('lim_clone/backend_python/fincept_analytics/ai_quant_lab/qlib_advanced_backtest.py', 'r') as f:
    content = f.read()

replacement = '''def optimize_portfolio(params: Dict[str, Any]) -> Dict[str, Any]:
    """Basic portfolio optimisation (Inverse Volatility)"""
    try:
        import yfinance as yf
        import pandas as pd
        import numpy as np
        
        tickers_str = params.get("instruments", "AAPL,MSFT,GOOG")
        tickers = [t.strip().upper() for t in tickers_str.split(",") if t.strip()]
        start_date = params.get("start_date", "2023-01-01")
        
        raw = yf.download(tickers, start=start_date, auto_adjust=True, progress=False)
        if raw.empty:
            return {"success": False, "error": "No data"}
            
        if isinstance(raw.columns, pd.MultiIndex):
            close = raw["Close"].dropna(how="all")
        else:
            close = raw[["Close"]].rename(columns={"Close": tickers[0]}).dropna()
            
        returns = close.pct_change().dropna()
        vols = returns.std() * np.sqrt(252)
        
        inv_vol = 1.0 / vols
        weights = inv_vol / inv_vol.sum()
        
        return {
            "success": True,
            "weights": weights.to_dict(),
            "optimization_method": "Inverse Volatility"
        }
    except Exception as e:
        return {"success": False, "error": str(e)}'''

pattern = re.compile(r'def optimize_portfolio\(params: Dict\[str, Any\]\) -> Dict\[str, Any\]:\n    """Placeholder for portfolio optimisation — returns not-yet-implemented\."""\n    return \{"success": False, "error": "optimize_portfolio not yet implemented"\}')
content = pattern.sub(replacement, content)

with open('lim_clone/backend_python/fincept_analytics/ai_quant_lab/qlib_advanced_backtest.py', 'w') as f:
    f.write(content)
