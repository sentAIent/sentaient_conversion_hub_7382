import clickhouse_connect
import pandas as pd
import numpy as np
import quantstats as qs
import empyrical as emp
from datetime import datetime

# Connect to ClickHouse
def get_client():
    return clickhouse_connect.get_client(host='127.0.0.1', port=8123, database='lim_db')

def fetch_data(client, symbol):
    query = f"""
        SELECT timestamp, close 
        FROM market_data 
        WHERE symbol = '{symbol}'
        ORDER BY timestamp ASC
    """
    df = client.query_df(query)
    if not df.empty:
        df.set_index('timestamp', inplace=True)
        # Resample to daily, forward fill missing
        df = df.resample('D').last().ffill()
        df['returns'] = df['close'].pct_change()
        df.dropna(inplace=True)
    return df

def calculate_stats(symbol_returns, benchmark_returns):
    # Align the series by date
    aligned = pd.concat([symbol_returns, benchmark_returns], axis=1, join='inner')
    aligned.columns = ['symbol', 'benchmark']
    s_ret = aligned['symbol']
    b_ret = aligned['benchmark']

    # Compute advanced metrics
    stats = {
        'alpha': emp.alpha(s_ret, b_ret, risk_free=0.0),
        'beta': emp.beta(s_ret, b_ret),
        'sharpe': emp.sharpe_ratio(s_ret, risk_free=0.0),
        'sortino': emp.sortino_ratio(s_ret, required_return=0.0),
        'omega': emp.omega_ratio(s_ret, risk_free=0.0),
        'skewness': s_ret.skew(),
        'kurtosis': s_ret.kurtosis(),
        'correlation': s_ret.corr(b_ret),
        'upside_dev': emp.downside_risk(s_ret), # We will use custom for upside
        'downside_dev': emp.downside_risk(s_ret),
    }

    # Custom Upside Deviation
    positive_returns = s_ret[s_ret > 0]
    stats['upside_dev'] = np.sqrt(np.mean(positive_returns**2)) * np.sqrt(252) if not positive_returns.empty else 0.0

    # R-squared
    stats['r_squared'] = stats['correlation'] ** 2

    # M-Squared (Modigliani)
    # M2 = (Sharpe * Benchmark_Vol) + RiskFree
    b_vol = emp.annual_volatility(b_ret)
    stats['m_squared'] = (stats['sharpe'] * b_vol) + 0.0

    return stats

def run_nightly_batch():
    print("Starting Nightly Quant Engine Batch...")
    client = get_client()

    # Get distinct symbols
    symbols = client.query("SELECT DISTINCT symbol FROM market_data").result_rows
    symbols = [row[0] for row in symbols]

    # Benchmarks to calculate against
    benchmarks = ['^GSPC', 'SPY', 'QQQ'] # S&P 500 and tech/broad indices

    # Cache benchmark data
    benchmark_data = {}
    for bm in benchmarks:
        df = fetch_data(client, bm)
        if not df.empty:
            benchmark_data[bm] = df['returns']

    calc_date = datetime.now().date()
    batch_data = []

    for bm, b_ret in benchmark_data.items():
        for symbol in symbols:
            if symbol == bm:
                continue
            
            s_df = fetch_data(client, symbol)
            if s_df.empty:
                continue
            
            try:
                stats = calculate_stats(s_df['returns'], b_ret)
                
                # Format for ClickHouse insertion
                row = [
                    symbol,
                    bm,
                    calc_date,
                    float(stats.get('alpha', 0.0) or 0.0),
                    float(stats.get('beta', 0.0) or 0.0),
                    float(stats.get('sharpe', 0.0) or 0.0),
                    float(stats.get('sortino', 0.0) or 0.0),
                    float(stats.get('omega', 0.0) or 0.0),
                    float(stats.get('skewness', 0.0) or 0.0),
                    float(stats.get('kurtosis', 0.0) or 0.0),
                    float(stats.get('m_squared', 0.0) or 0.0),
                    float(stats.get('r_squared', 0.0) or 0.0),
                    float(stats.get('correlation', 0.0) or 0.0),
                    float(stats.get('upside_dev', 0.0) or 0.0),
                    float(stats.get('downside_dev', 0.0) or 0.0),
                    datetime.now()
                ]
                batch_data.append(row)
                print(f"Calculated stats for {symbol} against {bm}")
            except Exception as e:
                print(f"Error calculating stats for {symbol}: {e}")

    # Insert into ClickHouse
    if batch_data:
        client.insert('portfolio_stats_daily', batch_data, column_names=[
            'symbol', 'benchmark_symbol', 'calc_date', 'alpha', 'beta', 'sharpe', 
            'sortino', 'omega', 'skewness', 'kurtosis', 'm_squared', 'r_squared', 
            'correlation', 'upside_dev', 'downside_dev', 'updated_at'
        ])
        print(f"Inserted {len(batch_data)} records into portfolio_stats_daily.")

if __name__ == "__main__":
    run_nightly_batch()
