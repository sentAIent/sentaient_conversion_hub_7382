#!/bin/bash
echo "🚀 Sentaient Manim Backend Initialization"
echo "========================================="

# Check for macOS / brew
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "📦 Installing system dependencies (FFmpeg, Cairo, Pango)..."
    brew install py3cairo ffmpeg pango pkg-config
fi

echo "🐍 Creating Python Virtual Environment..."
python3 -m venv venv
source venv/bin/activate

echo "📦 Installing Python packages..."
pip install -r manim-backend/requirements.txt

echo "✅ Setup Complete!"
echo "To run the Dynamic Generation API:"
echo "  source venv/bin/activate"
echo "  cd manim-backend && uvicorn server:app --reload"
echo ""
echo "To render the Sacred Geometry video locally:"
echo "  source venv/bin/activate"
echo "  cd manim-backend && manim -qk sacred_geometry.py BreathingMandala"
