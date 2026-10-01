import re

with open('lim_clone/backend_python/quant_lean_engine.py', 'r') as f:
    content = f.read()

replacement = '''    @classmethod
    def generate_alpha_stream_signals(cls, strategy_name: str, symbols: list):
        """
        Generates algorithmic signals based on historical momentum and moving average crossovers.
        """
        signals = []
        for sym in symbols[:5]:
            try:
                ticker = yf.Ticker(sym)
                hist = ticker.history(period="3mo")
                if len(hist) < 20:
                    continue
                
                sma_20 = hist['Close'].rolling(window=20).mean().iloc[-1]
                current_price = hist['Close'].iloc[-1]
                
                direction = "BUY" if current_price > sma_20 else "SELL"
                momentum = (current_price / hist['Close'].iloc[-20]) - 1
                confidence = min(0.95, max(0.5, 0.5 + abs(momentum) * 2))
                target_alloc = round(min(25.0, max(5.0, abs(momentum) * 100)), 1)
                
                signals.append({
                    "signal_id": f"sig_{sym}_{int(datetime.now().timestamp())}",
                    "timestamp": datetime.utcnow().isoformat() + "Z",
                    "strategy": strategy_name,
                    "symbol": sym,
                    "direction": direction,
                    "target_allocation_pct": target_alloc,
                    "confidence_score": round(confidence, 2),
                    "suggested_stop_loss": f"{round(abs(momentum) * 100 / 2, 1)}%",
                    "time_horizon": "1W - 1M Swing"
                })
            except Exception as e:
                logger.warning(f"Failed to generate alpha signal for {sym}: {e}")
                
        return signals'''

pattern = re.compile(r'    @classmethod\n    def generate_alpha_stream_signals\(cls, strategy_name: str, symbols: list\):.*?return signals', re.DOTALL)
content = pattern.sub(replacement, content)

with open('lim_clone/backend_python/quant_lean_engine.py', 'w') as f:
    f.write(content)
