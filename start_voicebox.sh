#!/bin/bash

# ==============================================================================
# Voicebox Startup Script
# This script downloads and starts the local Voicebox AI studio.
# ==============================================================================

echo "🎙️ Starting Voicebox Installation & Setup..."

VOICEBOX_DIR="voicebox_studio"

if [ ! -d "$VOICEBOX_DIR" ]; then
    echo "📥 Cloning jamiepine/voicebox repository..."
    git clone https://github.com/jamiepine/voicebox.git $VOICEBOX_DIR
fi

cd $VOICEBOX_DIR

echo "📦 Installing Node dependencies..."
if command -v npm &> /dev/null; then
    npm install
else
    echo "❌ npm not found. Voicebox requires Node.js."
    exit 1
fi

echo "🚀 Starting Voicebox local server..."
echo "The API should be available at http://localhost:8080 (check console for actual port)"
npm run dev
