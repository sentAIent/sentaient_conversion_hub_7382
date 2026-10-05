import torch
import torch.nn as nn

class FantasyPointPredictor(nn.Module):
    def __init__(self, input_dim=5, hidden_dim=16):
        super(FantasyPointPredictor, self).__init__()
        self.fc1 = nn.Linear(input_dim, hidden_dim)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_dim, 1)

    def forward(self, x):
        out = self.fc1(x)
        out = self.relu(out)
        out = self.fc2(out)
        return out

def load_model():
    """
    Load the PyTorch model for fantasy point prediction.
    In a real scenario, we would load pre-trained weights here, e.g.:
    model.load_state_dict(torch.load('model_weights.pth'))
    """
    model = FantasyPointPredictor()
    model.eval()
    return model

def predict_points(model: nn.Module, features: list[float]) -> float:
    """
    Predict fantasy points based on input features using the provided model.
    """
    with torch.no_grad():
        # Convert list of floats to a tensor and add a batch dimension
        input_tensor = torch.tensor(features, dtype=torch.float32).unsqueeze(0)
        output = model(input_tensor)
        return output.item()
