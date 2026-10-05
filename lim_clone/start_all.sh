#!/usr/bin/env bash

# Contango Quant — Unified Local Services Orchestrator
# Starts Python backend (8000), Go analytics engine (8080), and Vite frontend (3050).

# Terminate all child processes on Ctrl+C (SIGINT)
trap "kill 0" EXIT

echo "🚀 Starting Contango Quant Local Server Network..."

# Helper to check if a port is in use
check_port() {
  local port=$1
  if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
    echo "⚠️  Warning: Port $port is already in use. Please clear it first."
    exit 1
  fi
}

echo "🔍 Verifying clean ports..."
check_port 8000
check_port 8080
check_port 3050

# 1. Start Python FastAPI Backend
echo "🐍 Starting Python FastAPI Gateway (8000)..."
cd backend_python || exit
if [ -d "venv" ]; then
  source venv/bin/activate
fi
python3 main.py > ../python_backend.log 2>&1 &
PYTHON_PID=$!
cd ..

# 2. Start Go MIM Analytics Engine
echo "🐹 Starting Go MIM Analytics Engine (8080)..."
cd backend_go || exit
go run main.go > ../go_backend.log 2>&1 &
GO_PID=$!
cd ..

# 3. Start React Web & PWA Frontend
echo "⚡ Starting React Frontend (3050)..."
cd frontend || exit
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ All services running in background."
echo "   - Python log: python_backend.log"
echo "   - Go log: go_backend.log"
echo "   - Frontend: http://localhost:3050"
echo "   - Press Ctrl+C to terminate all services gracefully."

# Keep shell active to receive Ctrl+C trap
wait
