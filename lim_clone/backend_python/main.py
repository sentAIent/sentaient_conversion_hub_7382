from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import logging
import re
from py_vollib.black_scholes.greeks.analytical import delta, gamma, rho, theta, vega

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

def translate_nlp_to_params(nlp_query: str) -> SimulationParams:
    """
    Mock LLM translation layer. 
    In production, this would call OpenAI/Anthropic to extract parameters using structured JSON output.
    Here we use a simple regex for demonstration.
    Example query: "What happens to AAPL when it drops 5% over 10 days?"
    """
    logger.info(f"Translating NLP Query: {nlp_query}")
    
    # Very basic regex mock of what an LLM would extract
    symbol_match = re.search(r'\b([A-Z]{2,5})\b', nlp_query)
    drop_match = re.search(r'(\d+)%', nlp_query)
    days_match = re.search(r'(\d+)\s*days?', nlp_query, re.IGNORECASE)

    symbol = symbol_match.group(1) if symbol_match else "AAPL"
    drop_pct = float(drop_match.group(1)) / 100.0 if drop_match else 0.05
    hold_days = int(days_match.group(1)) if days_match else 5

    params = SimulationParams(
        Symbol=symbol,
        EntryDropPct=drop_pct,
        HoldDays=hold_days
    )
    logger.info(f"Translated to parameters: {params}")
    return params

@app.post("/ask")
def ask_xmim(request: QueryRequest):
    """
    Accepts a near-English query, translates it, and executes the simulation on the Go backend.
    """
    # 1. Translate NLP to structured Go Engine parameters
    try:
        params = translate_nlp_to_params(request.query)
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
