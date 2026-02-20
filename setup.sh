#!/bin/bash
echo "Starting AgentCraft..."

docker compose up -d

echo "Waiting for Ollama to start..."
sleep 15

echo "Pulling AI models (this takes a few minutes first time)..."
docker exec agentcraft-ollama ollama pull mistral-nemo
docker exec agentcraft-ollama ollama pull nomic-embed-text

echo ""
echo "AgentCraft is ready."
echo "Frontend:  http://localhost:5173"
echo "Backend:   http://localhost:8000"
echo "API Docs:  http://localhost:8000/docs"

chmod +x ~/agentcraft/setup.sh