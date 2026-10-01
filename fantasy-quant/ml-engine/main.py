from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import logging

from model import load_model, predict_points

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Fantasy Football ML Engine", description="PyTorch model for fantasy predictions")

# Load model globally when app starts
model_instance = load_model()

class PredictionRequest(BaseModel):
    player_id: str
    past_points: list[float]
    # Add additional features here as needed for the ML model
    # (e.g. opponent rank, snap percentage, etc.)

class PredictionResponse(BaseModel):
    player_id: str
    projected_points: float

@app.get("/health")
def health_check():
    """Health check endpoint to ensure the service is running."""
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    """
    Predict projected points for a player given their past data.
    """
    try:
        # Pad or truncate past_points to match expected input dimension of 5
        input_features = request.past_points[:5]
        if len(input_features) < 5:
            input_features += [0.0] * (5 - len(input_features))
        
        projected = predict_points(model_instance, input_features)
        
        return PredictionResponse(
            player_id=request.player_id,
            projected_points=projected
        )
    except Exception as e:
        logger.error(f"Prediction error for player {request.player_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error during prediction")
