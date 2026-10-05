#!/bin/bash

# ==============================================================================
# SentAIent Agentic Tools Installation Script
# This script installs Feynman, SkillOpt, and Understand-Anything locally.
# ==============================================================================

echo "🚀 Starting installation of SentAIent Agentic Tools..."

# 1. Install Feynman (Research Agent)
echo "------------------------------------------------"
echo "🧠 Installing Feynman (companion-inc/feynman)..."
# Using standard npm global install, fallback to curl script
if command -v npm &> /dev/null; then
    npm install -g @companion-inc/feynman || echo "⚠️ Feynman npm package not found."
fi

# 2. Setup Python Environment for AI Tools
echo "------------------------------------------------"
echo "🐍 Setting up Python Virtual Environment..."
VENV_DIR=".agent_tools_venv"
if [ ! -d "$VENV_DIR" ]; then
    python3 -m venv $VENV_DIR
    echo "✅ Virtual environment created at $VENV_DIR"
else
    echo "✅ Virtual environment already exists."
fi

source $VENV_DIR/bin/activate

# 3. Install SkillOpt and Understand-Anything
echo "------------------------------------------------"
echo "🛠️ Installing SkillOpt and Understand-Anything..."
pip install --upgrade pip
# Installing directly from GitHub
pip install git+https://github.com/microsoft/SkillOpt.git
pip install git+https://github.com/Egonex-AI/Understand-Anything.git

echo "------------------------------------------------"
echo "🎉 Installation Complete!"
echo "To use the python tools, run: source $VENV_DIR/bin/activate"
echo "To run Understand-Anything on this codebase: ua-build ."
