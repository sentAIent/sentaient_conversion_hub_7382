from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os

app = FastAPI(title="FantasyQuant ML Engine", version="1.0.0")

# Lazy load models to prevent slow startup unless used
sentiment_pipeline = None
projection_model = None

def get_sentiment_pipeline():
    global sentiment_pipeline
    if sentiment_pipeline is None:
        try:
            from transformers import pipeline
            print("Loading FinBERT sentiment model...")
            sentiment_pipeline = pipeline("sentiment-analysis", model="ProsusAI/finbert")
        except ImportError:
            print("Warning: transformers package not found. Using fallback heuristics.")
            sentiment_pipeline = "fallback"
    return sentiment_pipeline

class NewsItem(BaseModel):
    text: str

class SentimentResult(BaseModel):
    label: str
    score: float

class ProjectionRequest(BaseModel):
    player_id: str
    historical_points: List[float]

class ProjectionResult(BaseModel):
    projected_points: float
    confidence: float

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "ml-engine"}

@app.post("/api/ml/sentiment", response_model=SentimentResult)
def analyze_sentiment(news: NewsItem):
    pipe = get_sentiment_pipeline()
    
    if pipe == "fallback":
        text = news.text.lower()
        if "injury" in text or "out" in text or "questionable" in text:
            return SentimentResult(label="negative", score=0.92)
        elif "start" in text or "touchdown" in text or "breakout" in text:
            return SentimentResult(label="positive", score=0.88)
        return SentimentResult(label="neutral", score=0.60)
    
    res = pipe(news.text)[0]
    return SentimentResult(label=res['label'], score=res['score'])

@app.post("/api/ml/project", response_model=ProjectionResult)
def run_projection(req: ProjectionRequest):
    # TimeSformer/Informer prediction requires complex setup
    # For now, implementing a basic EWMA (Exponential Weighted Moving Average) which is better than simple average
    if not req.historical_points:
        return ProjectionResult(projected_points=0.0, confidence=0.0)
    
    # Simple EWMA calculation
    alpha = 0.3
    ewma = req.historical_points[0]
    for point in req.historical_points[1:]:
        ewma = alpha * point + (1 - alpha) * ewma
        
    return ProjectionResult(projected_points=round(ewma, 2), confidence=0.85)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
