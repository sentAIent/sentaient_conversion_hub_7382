import numpy as np
import pandas as pd
import math
from datetime import datetime, timedelta
import yfinance as yf
from scipy.stats import norm
import logging
import ccxt
import concurrent.futures

class RayMock:
    executor = concurrent.futures.ThreadPoolExecutor(max_workers=8)
    
    @staticmethod
    def remote(func):
        class RemoteWrapper:
            @staticmethod
            def remote(*args, **kwargs):
                return RayMock.executor.submit(func, *args, **kwargs)
        return RemoteWrapper

    @staticmethod
    def get(future):
        if isinstance(future, list):
            return [f.result() for f in future]
        return future.result()
        
ray = RayMock()

logger = logging.getLogger(__name__)

# =====================================================================
# 1. Native Black-Scholes Analytical Options Greeks Engine
# =====================================================================
class BlackScholesEngine:
    @staticmethod
    def calculate_greeks(option_type: str, S: float, K: float, T: float, r: float, sigma: float):
        """
        Calculates exact analytical price and Greeks for European options.
        S: Spot price, K: Strike, T: Time to expiry in years, r: Risk-free rate, sigma: Implied Vol
        """
        if T <= 0 or sigma <= 0 or S <= 0 or K <= 0:
            return {"price": 0.0, "delta": 0.0, "gamma": 0.0, "theta": 0.0, "vega": 0.0, "rho": 0.0}

        d1 = (math.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * math.sqrt(T))
        d2 = d1 - sigma * math.sqrt(T)

        is_call = option_type.lower() == "call"

        if is_call:
            price = S * norm.cdf(d1) - K * math.exp(-r * T) * norm.cdf(d2)
            delta = norm.cdf(d1)
            rho = K * T * math.exp(-r * T) * norm.cdf(d2) / 100.0
            theta = (- (S * norm.pdf(d1) * sigma) / (2 * math.sqrt(T)) - r * K * math.exp(-r * T) * norm.cdf(d2)) / 365.0
        else:
            price = K * math.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)
            delta = norm.cdf(d1) - 1.0
            rho = -K * T * math.exp(-r * T) * norm.cdf(-d2) / 100.0
            theta = (- (S * norm.pdf(d1) * sigma) / (2 * math.sqrt(T)) + r * K * math.exp(-r * T) * norm.cdf(-d2)) / 365.0

        gamma = norm.pdf(d1) / (S * sigma * math.sqrt(T))
        vega = S * norm.pdf(d1) * math.sqrt(T) / 100.0  # per 1% vol change

        return {
            "price": round(float(price), 2),
            "delta": round(float(delta), 4),
            "gamma": round(float(gamma), 4),
            "theta": round(float(theta), 4),
            "vega": round(float(vega), 4),
            "rho": round(float(rho), 4)
        }


# =====================================================================
# 2. Institutional Modular Quant Strategy Engine (LEAN Architecture)
# =====================================================================
class QuantLeanEngine:
    PREDEFINED_UNIVERSES = {
        "SP500_MOMENTUM": ["NVDA", "AAPL", "MSFT", "AMZN", "META", "GOOGL", "TSLA", "AMD"],
        "CRYPTO_TOP_MAJORS": ["BTC-USD", "ETH-USD", "SOL-USD", "BNB-USD", "AVAX-USD"],
        "ENERGY_COMMODITIES": ["XOM", "CVX", "GLD", "SLV", "USO", "UNG"],
        "DEFENSIVE_DIVIDEND": ["JNJ", "PG", "KO", "PEP", "ABBV", "MCD", "WMT"],
        "HIGH_BETA_GROWTH": ["PLTR", "COIN", "MSTR", "SOFI", "ARM", "SMCI"]
    }

    @classmethod
    def get_available_universes(cls):
        return [
            {"id": "SP500_MOMENTUM", "name": "S&P 500 Mega-Cap Momentum", "symbols": cls.PREDEFINED_UNIVERSES["SP500_MOMENTUM"]},
            {"id": "CRYPTO_TOP_MAJORS", "name": "Crypto Core Digital Assets", "symbols": cls.PREDEFINED_UNIVERSES["CRYPTO_TOP_MAJORS"]},
            {"id": "ENERGY_COMMODITIES", "name": "Energy & Macro Commodities", "symbols": cls.PREDEFINED_UNIVERSES["ENERGY_COMMODITIES"]},
            {"id": "DEFENSIVE_DIVIDEND", "name": "Low-Beta Dividend Aristocrats", "symbols": cls.PREDEFINED_UNIVERSES["DEFENSIVE_DIVIDEND"]},
            {"id": "HIGH_BETA_GROWTH", "name": "High-Beta Tech & Disruption", "symbols": cls.PREDEFINED_UNIVERSES["HIGH_BETA_GROWTH"]}
        ]

    @classmethod
    def run_backtest(cls, config: dict):
        return cls._run_backtest_sync(config)
        
    @staticmethod
    @ray.remote
    def run_backtest_distributed(config: dict):
        return QuantLeanEngine._run_backtest_sync(config)

    @classmethod
    def _run_backtest_sync(cls, config: dict):
        """
        Executes a 5-stage institutional backtest simulation:
        Stage 1: Universe Selection
        Stage 2: Alpha Generation (Technical, Momentum, Mean Reversion)
        Stage 3: Portfolio Construction & Optimization
        Stage 4: Institutional Execution (Slippage + Spread + Commission)
        Stage 5: Risk Management (Trailing Stop + Drawdown Guardrail)
        """
        symbols = config.get("symbols", ["AAPL", "MSFT", "NVDA", "TSLA"])
        if isinstance(symbols, str):
            symbols = [s.strip().upper() for s in symbols.split(",")]

        alpha_model = config.get("alpha_model", "EMA_CROSSOVER") # EMA_CROSSOVER, RSI_REVERSION, BOLLINGER_BREAKOUT, MOMENTUM
        portfolio_optimizer = config.get("optimizer", "INVERSE_VOLATILITY") # EQUAL_WEIGHT, INVERSE_VOLATILITY, MOMENTUM_WEIGHTED
        risk_stop_loss = float(config.get("stop_loss_pct", 4.0)) / 100.0
        max_drawdown_limit = float(config.get("max_drawdown_pct", 10.0)) / 100.0
        initial_capital = float(config.get("initial_capital", 100000.0))
        slippage_bps = float(config.get("slippage_bps", 5.0)) / 10000.0 # 5 bps = 0.05%
        fee_per_trade = float(config.get("fee_per_trade", 1.0)) # $1.00 fixed fee

        period = config.get("period", "2y")

        # Fetch market historical data
        price_dict = {}
        dates = None
        for sym in symbols:
            try:
                t = yf.Ticker(sym)
                hist = t.history(period=period)
                if not hist.empty and len(hist) > 50:
                    price_dict[sym] = hist
                    if dates is None or len(hist.index) < len(dates):
                        dates = hist.index
            except Exception as e:
                logger.warning(f"Error fetching {sym}: {e}")

        if not price_dict:
            raise ValueError(f"Failed to fetch market data for {symbols}. Network restricted or API limits exceeded.")


        # Common date index
        common_dates = dates[30:] # Skip warmup period
        n_days = len(common_dates)

        equity_curve = [initial_capital]
        current_cash = initial_capital
        positions = {sym: 0.0 for sym in price_dict}
        position_entry_prices = {sym: 0.0 for sym in price_dict}
        trade_logs = []
        trades_count = 0
        winning_trades = 0

        peak_equity = initial_capital
        circuit_breaker_active = False

        # Simulation loop over daily time steps
        for i in range(1, n_days):
            current_date = common_dates[i]
            prev_date = common_dates[i - 1]
            
            # Calculate Current Portfolio Value
            portfolio_val = current_cash
            for sym in price_dict:
                if sym in price_dict and current_date in price_dict[sym].index:
                    curr_price = float(price_dict[sym].loc[current_date, 'Close'])
                    portfolio_val += positions[sym] * curr_price

            if portfolio_val > peak_equity:
                peak_equity = portfolio_val

            drawdown = (peak_equity - portfolio_val) / peak_equity if peak_equity > 0 else 0

            # Stage 5: Risk Guardrail - Max Drawdown Circuit Breaker
            if drawdown >= max_drawdown_limit and not circuit_breaker_active:
                circuit_breaker_active = True
                # Liquidate all positions to cash
                for sym in list(positions.keys()):
                    if positions[sym] > 0 and current_date in price_dict[sym].index:
                        exit_price = float(price_dict[sym].loc[current_date, 'Close']) * (1 - slippage_bps)
                        current_cash += positions[sym] * exit_price - fee_per_trade
                        trade_logs.append({
                            "date": str(current_date.date()),
                            "symbol": sym,
                            "action": "CIRCUIT_BREAKER_SELL",
                            "price": round(exit_price, 2),
                            "shares": round(positions[sym], 2),
                            "reason": f"Max Drawdown ({round(drawdown*100, 1)}%) Reached"
                        })
                        positions[sym] = 0.0
                equity_curve.append(round(current_cash, 2))
                continue

            # Stage 2: Alpha Generation Signals
            signals = {}
            for sym, df in price_dict.items():
                if current_date not in df.index:
                    continue

                sub_df = df.loc[:current_date]
                closes = sub_df['Close'].values
                curr_price = float(closes[-1])

                # Stop-Loss Check on active positions
                if positions[sym] > 0 and position_entry_prices[sym] > 0:
                    pnl_pct = (curr_price - position_entry_prices[sym]) / position_entry_prices[sym]
                    if pnl_pct <= -risk_stop_loss:
                        # Liquidate position
                        exit_price = curr_price * (1 - slippage_bps)
                        current_cash += positions[sym] * exit_price - fee_per_trade
                        trade_logs.append({
                            "date": str(current_date.date()),
                            "symbol": sym,
                            "action": "STOP_LOSS_SELL",
                            "price": round(exit_price, 2),
                            "shares": round(positions[sym], 2),
                            "pnl_pct": round(pnl_pct * 100, 2)
                        })
                        trades_count += 1
                        positions[sym] = 0.0
                        position_entry_prices[sym] = 0.0
                        continue

                # Alpha Models
                if alpha_model == "EMA_CROSSOVER":
                    ema_fast = pd.Series(closes).ewm(span=10).mean().iloc[-1]
                    ema_slow = pd.Series(closes).ewm(span=30).mean().iloc[-1]
                    signals[sym] = 1 if ema_fast > ema_slow else 0
                elif alpha_model == "RSI_REVERSION":
                    deltas = np.diff(closes[-15:])
                    seed = deltas[:14]
                    up = seed[seed >= 0].sum() / 14 if len(seed[seed >= 0]) > 0 else 0.001
                    down = -seed[seed < 0].sum() / 14 if len(seed[seed < 0]) > 0 else 0.001
                    rs = up / down
                    rsi = 100.0 - (100.0 / (1.0 + rs))
                    signals[sym] = 1 if rsi < 35 else (0 if rsi > 65 else -1)
                elif alpha_model == "BOLLINGER_BREAKOUT":
                    sma20 = np.mean(closes[-20:])
                    std20 = np.std(closes[-20:])
                    upper = sma20 + 2 * std20
                    lower = sma20 - 2 * std20
                    signals[sym] = 1 if curr_price > upper else (0 if curr_price < lower else -1)
                else: # Momentum
                    mom = (closes[-1] - closes[-20]) / closes[-20] if len(closes) >= 20 else 0
                    signals[sym] = 1 if mom > 0.02 else 0

            # Stage 3: Portfolio Optimizer Weightings
            active_symbols = [s for s, sig in signals.items() if sig == 1]
            weights = {}
            if active_symbols:
                if portfolio_optimizer == "INVERSE_VOLATILITY":
                    inv_vols = {}
                    for s in active_symbols:
                        v = np.std(price_dict[s].loc[:current_date, 'Close'].pct_change().dropna().tail(20))
                        inv_vols[s] = 1.0 / (v + 1e-5)
                    total_inv = sum(inv_vols.values())
                    weights = {s: inv_vols[s] / total_inv for s in active_symbols}
                else:
                    # Equal Weight
                    eq_w = 1.0 / len(active_symbols)
                    weights = {s: eq_w for s in active_symbols}

            # Stage 4: Execution with Institutional Slippage & Fees
            for sym in list(positions.keys()):
                if sym in price_dict and current_date in price_dict[sym].index:
                    curr_price = float(price_dict[sym].loc[current_date, 'Close'])
                    target_pct = weights.get(sym, 0.0)
                    target_alloc = portfolio_val * target_pct
                    current_alloc = positions[sym] * curr_price

                    diff = target_alloc - current_alloc

                    # Minimum rebalance threshold $500
                    if abs(diff) > 500:
                        if diff > 0 and current_cash >= diff:
                            # BUY Order
                            exec_price = curr_price * (1 + slippage_bps)
                            shares_to_buy = diff / exec_price
                            cost = shares_to_buy * exec_price + fee_per_trade
                            if current_cash >= cost:
                                current_cash -= cost
                                positions[sym] += shares_to_buy
                                position_entry_prices[sym] = exec_price
                                trades_count += 1
                                trade_logs.append({
                                    "date": str(current_date.date()),
                                    "symbol": sym,
                                    "action": "BUY",
                                    "price": round(exec_price, 2),
                                    "shares": round(shares_to_buy, 2),
                                    "slippage": f"{round(slippage_bps*10000, 1)} bps"
                                })
                        elif diff < 0 and positions[sym] > 0:
                            # SELL Order
                            shares_to_sell = min(positions[sym], abs(diff) / curr_price)
                            exec_price = curr_price * (1 - slippage_bps)
                            proceeds = shares_to_sell * exec_price - fee_per_trade
                            current_cash += proceeds
                            
                            # Record if winning trade
                            if exec_price > position_entry_prices[sym]:
                                winning_trades += 1

                            positions[sym] -= shares_to_sell
                            trades_count += 1
                            trade_logs.append({
                                "date": str(current_date.date()),
                                "symbol": sym,
                                "action": "SELL",
                                "price": round(exec_price, 2),
                                "shares": round(shares_to_sell, 2),
                                "slippage": f"{round(slippage_bps*10000, 1)} bps"
                            })

            # End of Day Equity Record
            eod_equity = current_cash
            for sym in price_dict:
                if current_date in price_dict[sym].index:
                    eod_equity += positions[sym] * float(price_dict[sym].loc[current_date, 'Close'])
            equity_curve.append(round(eod_equity, 2))

        # Metrics Compilation
        final_equity = equity_curve[-1]
        total_return_pct = ((final_equity - initial_capital) / initial_capital) * 100.0
        
        eq_series = pd.Series(equity_curve)
        daily_returns = eq_series.pct_change().dropna()
        
        volatility = float(daily_returns.std() * np.sqrt(252) * 100.0) if len(daily_returns) > 0 else 0.0
        sharpe = float((daily_returns.mean() * 252) / (daily_returns.std() * np.sqrt(252))) if volatility > 0 else 0.0
        
        neg_returns = daily_returns[daily_returns < 0]
        sortino = float((daily_returns.mean() * 252) / (neg_returns.std() * np.sqrt(252))) if len(neg_returns) > 0 and neg_returns.std() > 0 else sharpe

        roll_max = eq_series.cummax()
        drawdowns = (eq_series - roll_max) / roll_max
        max_dd = float(abs(drawdowns.min()) * 100.0)

        win_rate = float((winning_trades / max(1, trades_count)) * 100.0)

        # Institutional Reality Score (0 to 100)
        # Rewards high Sharpe, low Max DD, reasonable trade frequency, and strong Sortino
        reality_score = min(99.0, max(40.0, (sharpe * 25.0) + (100.0 - max_dd * 1.5) * 0.4 + (win_rate * 0.3)))

        return {
            "summary": {
                "initial_capital": initial_capital,
                "final_equity": round(final_equity, 2),
                "total_return_pct": round(total_return_pct, 2),
                "sharpe_ratio": round(sharpe, 2),
                "sortino_ratio": round(sortino, 2),
                "annualized_volatility_pct": round(volatility, 2),
                "max_drawdown_pct": round(max_dd, 2),
                "win_rate_pct": round(win_rate, 1),
                "total_trades": trades_count,
                "reality_score": round(reality_score, 1),
                "universe": symbols,
                "alpha_model": alpha_model,
                "optimizer": portfolio_optimizer
            },
            "equity_curve": [{"step": idx, "equity": val} for idx, val in enumerate(equity_curve[::max(1, len(equity_curve)//60)])],
            "recent_trades": trade_logs[-15:]
        }

    @classmethod
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
                
        return signals

# =====================================================================
# 3. CCXT Crypto Universal Exchange Gateway
# =====================================================================
class CryptoGateway:
    def __init__(self, exchange_id='binance', api_key=None, secret=None):
        self.exchange_id = exchange_id
        exchange_class = getattr(ccxt, exchange_id)
        self.exchange = exchange_class({
            'apiKey': api_key,
            'secret': secret,
            'enableRateLimit': True,
        })
        
    def fetch_market_data(self, symbol, timeframe='1h', limit=100):
        try:
            ohlcv = self.exchange.fetch_ohlcv(symbol, timeframe, limit=limit)
            df = pd.DataFrame(ohlcv, columns=['timestamp', 'Open', 'High', 'Low', 'Close', 'Volume'])
            df['timestamp'] = pd.to_datetime(df['timestamp'], unit='ms')
            df.set_index('timestamp', inplace=True)
            return df
        except Exception as e:
            logger.error(f"CCXT Error fetching data for {symbol}: {e}")
            return pd.DataFrame()
            
    def execute_order(self, symbol, order_type, side, amount, price=None):
        if not self.exchange.has['createOrder']:
            raise NotImplementedError(f"{self.exchange_id} does not support createOrder")
        try:
            order = self.exchange.create_order(symbol, order_type, side, amount, price)
            return {"status": "success", "order": order}
        except Exception as e:
            logger.error(f"CCXT Order execution failed: {e}")
            return {"status": "error", "message": str(e)}

