#!/bin/bash
echo "🚀 Starting SentAIent Internal AI Workspace (Odysseus)..."
cd odysseus-workspace
docker compose up -d --build
echo "✅ Workspace starting in the background!"
echo "🌐 Access at: http://localhost:7000"
echo "🔐 Default Admin User: admin"
echo "🔑 Default Password: sentaient_admin_secure123"
