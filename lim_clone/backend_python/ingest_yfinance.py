import yfinance as yf
import pandas as pd
import clickhouse_connect
import datetime
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# --- Admin Alerting System ---
def send_admin_alert(symbol: str, issue: str, raw_data: dict = None):
    """
    Mock function to send an alert to admins (e.g. via Slack/Email/PagerDuty)
    so they can review and potentially add a manual override.
    """
    alert_msg = f"[CRITICAL DATA ALERT] Symbol: {symbol} | Issue: {issue}"
    if raw_data:
        alert_msg += f" | Data: {raw_data}"
    
    logger.error(alert_msg)
    # TODO: Implement actual Slack/Email API call here
    # requests.post("https://hooks.slack.com/...", json={"text": alert_msg})


# --- Data Validation ---
def validate_and_clean_data(df: pd.DataFrame, symbol: str) -> pd.DataFrame:
    """
    Validates Yahoo Finance data for common errors. 
    Drops bad rows, fixes what it can, and alerts admins for manual review.
    """
    if df.empty:
        send_admin_alert(symbol, "No data returned from yfinance.")
        return df

    # Check for negative prices
    price_cols = ['Open', 'High', 'Low', 'Close']
    for col in price_cols:
        negative_prices = df[df[col] < 0]
        if not negative_prices.empty:
            send_admin_alert(symbol, f"Negative prices found in {col}", negative_prices.to_dict(orient="records"))
            # Drop invalid rows
            df = df[df[col] >= 0]

    # Check for extreme price jumps (potential split errors)
    # Simple check: daily change > 50%
    if len(df) > 1:
        df['pct_change'] = df['Close'].pct_change()
        extreme_jumps = df[df['pct_change'].abs() > 0.5]
        if not extreme_jumps.empty:
            send_admin_alert(symbol, "Extreme daily price jump > 50% (possible unadjusted split)", extreme_jumps[['Close', 'pct_change']].to_dict())
        df = df.drop(columns=['pct_change'])

    # Handle NaNs
    if df[price_cols].isnull().values.any():
        send_admin_alert(symbol, "NaN values detected in price data.")
        df = df.dropna(subset=price_cols)

    return df

# --- Ingestion ---
def ingest_data(symbols: list):
    """
    Pulls data from Yahoo Finance, validates it, and inserts into ClickHouse raw table.
    """
    try:
        # Connect to ClickHouse (default credentials for local docker)
        client = clickhouse_connect.get_client(host='localhost', username='default', password='', database='lim_db')
        logger.info("Connected to ClickHouse.")
    except Exception as e:
        logger.error(f"Failed to connect to ClickHouse: {e}")
        return

    for symbol in symbols:
        logger.info(f"Fetching data for {symbol}...")
        ticker = yf.Ticker(symbol)
        
        # Fetch 5 years of historical data
        hist = ticker.history(period="5y")
        
        # Validate and clean
        clean_hist = validate_and_clean_data(hist, symbol)
        
        if clean_hist.empty:
            logger.warning(f"Skipping insertion for {symbol} due to empty/invalid data.")
            continue

        # Prepare for ClickHouse insertion
        clean_hist.reset_index(inplace=True)
        # Convert timezone-aware datetime to naive datetime for ClickHouse
        if isinstance(clean_hist['Date'].dtype, pd.DatetimeTZDtype):
            clean_hist['Date'] = clean_hist['Date'].dt.tz_localize(None)

        # Build list of tuples matching the schema: 
        # (symbol, timestamp, open, high, low, close, volume)
        data_to_insert = []
        for index, row in clean_hist.iterrows():
            data_to_insert.append((
                symbol,
                row['Date'],
                float(row['Open']),
                float(row['High']),
                float(row['Low']),
                float(row['Close']),
                int(row['Volume'])
            ))

        # Insert into raw table
        try:
            client.insert(
                'market_data_raw', 
                data_to_insert, 
                column_names=['symbol', 'timestamp', 'open', 'high', 'low', 'close', 'volume']
            )
            logger.info(f"Successfully inserted {len(data_to_insert)} rows for {symbol} into market_data_raw.")
        except Exception as e:
            send_admin_alert(symbol, f"Database insertion failed: {e}")

# --- Options Ingestion ---
def ingest_options(symbols: list):
    """
    Pulls current options chains from Yahoo Finance and inserts into ClickHouse.
    """
    try:
        client = clickhouse_connect.get_client(host='localhost', username='default', password='', database='lim_db')
        logger.info("Connected to ClickHouse for Options Ingestion.")
    except Exception as e:
        logger.error(f"Failed to connect to ClickHouse: {e}")
        return

    for symbol in symbols:
        logger.info(f"Fetching options for {symbol}...")
        ticker = yf.Ticker(symbol)
        
        try:
            expirations = ticker.options
        except Exception as e:
            logger.warning(f"Could not fetch expirations for {symbol}: {e}")
            continue
            
        data_to_insert = []
        for exp in expirations:
            try:
                opt = ticker.option_chain(exp)
                # Process calls
                for _, row in opt.calls.iterrows():
                    data_to_insert.append((
                        symbol,
                        row['contractSymbol'],
                        datetime.datetime.strptime(exp, "%Y-%m-%d").date(),
                        float(row['strike']),
                        'call',
                        float(row.get('lastPrice', 0.0)),
                        float(row.get('bid', 0.0)),
                        float(row.get('ask', 0.0)),
                        int(row.get('volume', 0.0) if not pd.isna(row.get('volume')) else 0),
                        int(row.get('openInterest', 0.0) if not pd.isna(row.get('openInterest')) else 0),
                        float(row.get('impliedVolatility', 0.0)),
                        0.0, 0.0, 0.0, 0.0, 0.0, # Greeks placeholder
                        datetime.datetime.now()
                    ))
                # Process puts
                for _, row in opt.puts.iterrows():
                    data_to_insert.append((
                        symbol,
                        row['contractSymbol'],
                        datetime.datetime.strptime(exp, "%Y-%m-%d").date(),
                        float(row['strike']),
                        'put',
                        float(row.get('lastPrice', 0.0)),
                        float(row.get('bid', 0.0)),
                        float(row.get('ask', 0.0)),
                        int(row.get('volume', 0.0) if not pd.isna(row.get('volume')) else 0),
                        int(row.get('openInterest', 0.0) if not pd.isna(row.get('openInterest')) else 0),
                        float(row.get('impliedVolatility', 0.0)),
                        0.0, 0.0, 0.0, 0.0, 0.0, # Greeks placeholder
                        datetime.datetime.now()
                    ))
            except Exception as e:
                logger.warning(f"Error fetching chain for {symbol} at {exp}: {e}")
                
        if data_to_insert:
            try:
                client.insert(
                    'options_chain_raw', 
                    data_to_insert, 
                    column_names=[
                        'underlying_symbol', 'contract_symbol', 'expiration_date', 'strike', 
                        'option_type', 'last_price', 'bid', 'ask', 'volume', 'open_interest', 
                        'implied_volatility', 'delta', 'gamma', 'theta', 'vega', 'rho', 'ingestion_time'
                    ]
                )
                logger.info(f"Successfully inserted {len(data_to_insert)} options for {symbol}.")
            except Exception as e:
                logger.error(f"Failed to insert options for {symbol}: {e}")

if __name__ == "__main__":
    # Added SPY and QQQ as benchmarks
    test_symbols = ["AAPL", "MSFT", "TSLA", "BRK-A", "^GSPC", "SPY", "QQQ"]
    ingest_data(test_symbols)
    ingest_options(["AAPL", "MSFT", "TSLA", "SPY", "QQQ"])
