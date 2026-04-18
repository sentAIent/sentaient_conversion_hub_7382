#!/bin/bash
# Local Server Script for Mindwave
# Bypasses CORS restrictions by serving via HTTP

# Try to find a server tool
if command -v live-server >/dev/null 2>&1; then
  echo "Starting live-server..."
  live-server public --port=8001
elif command -v npm >/dev/null 2>&1; then
  echo "Starting via npm..."
  npm run dev
elif command -v python3 >/dev/null 2>&1; then
  echo "Starting via Python 3..."
  python3 -m http.server 8001 --directory public
else
  echo "No server found. Please install live-server or python3."
fi
