import re

with open('lim_clone/backend_python/fincept_analytics/Analytics/skfolio_wrapper.py', 'r') as f:
    content = f.read()

replacement = '''            if symbol_list:
                available = [s for s in symbol_list if s in prices.columns]
                if available:
                    prices = prices[available]
                    
            try:
                returns = prices_to_returns(prices)
                returns = returns.dropna()
                wrapper.load_data(returns)
                model = wrapper.build_model()
                pred = wrapper.backtest_strategy(model, returns)
                
                results = {
                    "annual_return": float(pred.annualized_mean) * 252 if hasattr(pred, 'annualized_mean') else 0.0,
                    "annual_volatility": float(pred.annualized_variance ** 0.5) if hasattr(pred, 'annualized_variance') else 0.0,
                    "sharpe_ratio": float(pred.annualized_sharpe_ratio) if hasattr(pred, 'annualized_sharpe_ratio') else 0.0,
                    "max_drawdown": float(pred.max_drawdown) if hasattr(pred, 'max_drawdown') else 0.0,
                    "calmar_ratio": float(pred.calmar_ratio) if hasattr(pred, 'calmar_ratio') else 0.0,
                    "message": "Backtest complete"
                }
            except Exception as e:
                results = {
                    "error": str(e),
                    "message": "Backtest failed"
                }'''

pattern = re.compile(r'            if symbol_list:\n                available = \[s for s in symbol_list if s in prices\.columns\]\n                if available:\n                    prices = prices\[available\]\n\n            # Simple backtest placeholder \(returns metrics\)\n            results = \{\n                "annual_return": 0\.15,\n                "annual_volatility": 0\.18,\n                "sharpe_ratio": 0\.83,\n                "max_drawdown": 0\.25,\n                "calmar_ratio": 0\.60,\n                "message": "Backtest functionality - full implementation requires walk-forward optimization"\n            \}')
content = pattern.sub(replacement, content)

with open('lim_clone/backend_python/fincept_analytics/Analytics/skfolio_wrapper.py', 'w') as f:
    f.write(content)
