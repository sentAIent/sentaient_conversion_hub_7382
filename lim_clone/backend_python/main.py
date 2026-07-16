from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import logging
import re
from py_vollib.black_scholes.greeks.analytical import delta, gamma, rho, theta, vega
from crawl4ai import AsyncWebCrawler
import json
from litellm import acompletion
from dotenv import load_dotenv
import yfinance as yf
from datetime import datetime

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Logical Trade View - Natural Language Gateway")

# Allow CORS from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3050"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration for the Go Analytics Engine (MIM)
GO_ENGINE_URL = "http://localhost:8080/simulate"

class QueryRequest(BaseModel):
    query: str

class SimulationParams(BaseModel):
    Symbol: str
    EntryDropPct: float
    HoldDays: int

async def translate_nlp_to_params(nlp_query: str, markdown_context: str = "") -> SimulationParams:
    """
    LLM translation layer using Gemini via LiteLLM. 
    """
    logger.info(f"Translating NLP Query: {nlp_query}")
    
    prompt = f"""
    You are a quantitative trading assistant. Your job is to parse the user's natural language query into a JSON object matching the SimulationParams schema.
    Schema:
    {{
      "Symbol": "string", // Ticker symbol, e.g. AAPL
      "EntryDropPct": float, // e.g. 0.05 for 5% drop
      "HoldDays": int // e.g. 5 for 5 days
    }}

    User Query: {nlp_query}
    News Context (if any): {markdown_context}

    Analyze the query and context. Extract the parameters. If the query mentions sentiment or news, use the context to determine the most logical DropPct and HoldDays based on market conditions, or default to 0.05 and 5.
    Return ONLY valid JSON, no markdown formatting.
    """
    
    try:
        response = await acompletion(
            model="gemini/gemini-1.5-flash",
            messages=[{"role": "user", "content": prompt}]
        )
        
        content = response.choices[0].message.content
        content = content.replace('```json', '').replace('```', '').strip()
        
        data = json.loads(content)
        params = SimulationParams(**data)
        logger.info(f"Translated to parameters: {params}")
        return params
    except Exception as e:
        logger.error(f"LLM Parsing failed: {e}")
        return SimulationParams(Symbol="AAPL", EntryDropPct=0.05, HoldDays=5)


@app.post("/ask")
async def ask_xmim(request: QueryRequest):
    """
    Accepts a near-English query, translates it, and executes the simulation on the Go backend.
    """
    needs_scrape = "news" in request.query.lower() or "sentiment" in request.query.lower()
    markdown_context = ""
    
    if needs_scrape:
        symbol_match = re.search(r'\b([A-Z]{2,5})\b', request.query)
        symbol = symbol_match.group(1) if symbol_match else "SPY"
        url = f"https://finance.yahoo.com/quote/{symbol}/news"
        logger.info(f"Fetching news from {url} for context...")
        
        try:
            async with AsyncWebCrawler(verbose=True) as crawler:
                result = await crawler.arun(url=url)
                markdown_context = result.markdown[:2000] # limit context size
        except Exception as e:
            logger.error(f"Failed to fetch news: {e}")

    # 1. Translate NLP to structured Go Engine parameters
    try:
        params = await translate_nlp_to_params(request.query, markdown_context)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to parse query: {e}")

    # 2. Forward to the high-speed Go Engine (MIM)
    try:
        logger.info("Forwarding simulation request to Go Engine...")
        response = requests.post(GO_ENGINE_URL, json=params.model_dump())
        response.raise_for_status()
        
        # 3. Return results back to the user/frontend
        return {
            "original_query": request.query,
            "parsed_parameters": params,
            "simulation_results": response.json()
        }
    except requests.exceptions.RequestException as e:
        logger.error(f"Go Engine failed: {e}")
        raise HTTPException(status_code=502, detail="Analytics Engine (Go) is unreachable or failed.")

class GreekRequest(BaseModel):
    option_type: str
    S: float
    K: float
    t: float
    r: float
    sigma: float

@app.post("/greeks")
def get_greeks(req: GreekRequest):
    """
    Computes Black-Scholes Greeks using py_vollib.
    """
    try:
        flag = 'c' if req.option_type.lower() in ['call', 'c'] else 'p'
        time_to_exp = max(req.t, 0.001)
        
        return {
            "delta": delta(flag, req.S, req.K, time_to_exp, req.r, req.sigma),
            "gamma": gamma(flag, req.S, req.K, time_to_exp, req.r, req.sigma),
            "theta": theta(flag, req.S, req.K, time_to_exp, req.r, req.sigma),
            "vega": vega(flag, req.S, req.K, time_to_exp, req.r, req.sigma),
            "rho": rho(flag, req.S, req.K, time_to_exp, req.r, req.sigma),
        }
    except Exception as e:
        logger.error(f"Error calculating greeks: {e}")
        raise HTTPException(status_code=400, detail="Invalid inputs for Black-Scholes")

@app.get("/api/options-chain")
def get_options_chain(symbol: str = "AAPL"):
    """
    Fetches the live options chain (nearest expiration) using yfinance.
    Computes Greeks on the fly.
    """
    try:
        ticker = yf.Ticker(symbol)
        expirations = ticker.options
        if not expirations:
            return []
            
        # Get nearest expiration
        nearest_exp = expirations[0]
        opt = ticker.option_chain(nearest_exp)
        
        # We need current underlying price for Greeks
        hist = ticker.history(period="1d")
        if hist.empty:
            S = 150.0 # fallback
        else:
            S = hist['Close'].iloc[-1]
            
        # Time to expiration in years
        exp_date = datetime.strptime(nearest_exp, '%Y-%m-%d')
        t = max((exp_date - datetime.now()).days / 365.0, 0.001)
        r = 0.05 # Risk free rate approx 5%
        
        results = []
        
        # Process Calls (limit to 10 nearest to money for speed)
        calls = opt.calls
        calls['abs_diff'] = abs(calls['strike'] - S)
        calls = calls.sort_values('abs_diff').head(10)
        
        for _, row in calls.iterrows():
            strike = row['strike']
            iv = row['impliedVolatility']
            # Compute Greeks
            try:
                d = delta('c', S, strike, t, r, iv)
                g = gamma('c', S, strike, t, r, iv)
                th = theta('c', S, strike, t, r, iv)
                v = vega('c', S, strike, t, r, iv)
                rh = rho('c', S, strike, t, r, iv)
            except:
                d, g, th, v, rh = 0, 0, 0, 0, 0
                
            results.append({
                "contract_symbol": row['contractSymbol'],
                "strike": strike,
                "option_type": "call",
                "last_price": row['lastPrice'],
                "implied_volatility": iv,
                "delta": d,
                "gamma": g,
                "theta": th,
                "vega": v,
                "rho": rh
            })
            
        # Process Puts (limit to 10 nearest to money)
        puts = opt.puts
        puts['abs_diff'] = abs(puts['strike'] - S)
        puts = puts.sort_values('abs_diff').head(10)
        
        for _, row in puts.iterrows():
            strike = row['strike']
            iv = row['impliedVolatility']
            # Compute Greeks
            try:
                d = delta('p', S, strike, t, r, iv)
                g = gamma('p', S, strike, t, r, iv)
                th = theta('p', S, strike, t, r, iv)
                v = vega('p', S, strike, t, r, iv)
                rh = rho('p', S, strike, t, r, iv)
            except:
                d, g, th, v, rh = 0, 0, 0, 0, 0
                
            results.append({
                "contract_symbol": row['contractSymbol'],
                "strike": strike,
                "option_type": "put",
                "last_price": row['lastPrice'],
                "implied_volatility": iv,
                "delta": d,
                "gamma": g,
                "theta": th,
                "vega": v,
                "rho": rh
            })
            
        # Sort by strike
        results = sorted(results, key=lambda x: x['strike'])
        return results

    except Exception as e:
        logger.error(f"Failed to fetch options chain for {symbol}: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch options data")

class ScrapeRequest(BaseModel):
    url: str

@app.post("/api/scrape")
async def scrape_url(request: ScrapeRequest):
    """
    Accepts a target URL, uses Crawl4AI to render the JS and extract the clean,
    LLM-ready markdown from the page.
    """
    logger.info(f"Scraping URL: {request.url}")
    try:
        async with AsyncWebCrawler(verbose=True) as crawler:
            result = await crawler.arun(url=request.url)
            return {
                "url": request.url,
                "markdown": result.markdown
            }
    except Exception as e:
        logger.error(f"Failed to scrape: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to scrape URL: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
