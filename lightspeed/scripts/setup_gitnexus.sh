#!/bin/bash
# Setup script for GitNexus (Internal MCP integration)

echo "Setting up GitNexus for LightSpeed internal compliance & development..."

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm could not be found. Please install Node.js."
    exit 1
fi

echo "Installing gitnexus globally..."
npm install -g gitnexus

echo "Analyzing LightSpeed repository..."
cd .. # Go to project root (assuming run from scripts dir)
gitnexus analyze

echo "Configuring MCP for Cursor/Claude..."
gitnexus setup

echo "GitNexus Knowledge Graph created successfully."
echo "You can now use AI agents to deeply query this repository's architecture without breaking dependencies!"
