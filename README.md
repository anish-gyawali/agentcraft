
# AgentCraft

> A local multi-agent AI copilot that understands your codebase, plans tasks, writes code, and critiques its own output — running entirely on your hardware with no paid APIs.


<img width="1680" height="1039" alt="homescreen" src="https://github.com/user-attachments/assets/5ba9f1a9-e31c-4e27-b112-289794c08754" />

---

## What Is This?

AgentCraft is a production-style AI system built around three specialized agents that collaborate on every request:

- **Planner** — breaks your request into clear, actionable steps
- **Coder** — executes the plan using real tools (reads files, searches codebase)
- **Critic** — reviews the output and identifies improvements

All three agents run on a local LLM (mistral-nemo via Ollama) with no data leaving your machine.

---

## Demo

https://github.com/user-attachments/assets/1286e4c7-8e07-45ff-8643-04f374a109d5






---

## Architecture
```
User → React Frontend → FastAPI Backend → Agent Pipeline
                                              ├── Planner Agent
                                              ├── Coder Agent  
                                              └── Critic Agent
                                                    ├── Ollama (mistral-nemo)
                                                    ├── ChromaDB (vector memory)
                                                    └── Tools (read, write, search)
```
## Tech Stack

| Layer | Technology |
|-------|-----------|
| LLM Runtime | Ollama (mistral-nemo) |
| Agent Framework | LangChain + LangGraph |
| Vector Memory | ChromaDB + sentence-transformers |
| Backend | FastAPI (Python 3.11) |
| Frontend | React + Vite |
| Deep Learning | PyTorch (CUDA 12.8) |
| Deployment | Docker + NVIDIA Container Toolkit |

---

## Hardware Used

| Component | Spec |
|-----------|------|
| GPU | NVIDIA RTX 5070 (12GB VRAM) |
| RAM | 32GB |
| CPU | AMD Ryzen 9 7900X |
| OS | Windows 11 + WSL2 Ubuntu 22.04 |

Any NVIDIA GPU with 8GB+ VRAM will work.

---

## Features

- Multi-agent orchestration — Planner, Coder, and Critic collaborate on every request
- Fully local — no OpenAI, no Anthropic, no cloud costs
- Codebase-aware — indexes your project into ChromaDB for semantic search
- Visible reasoning — see each agent's thinking and tool calls in real time
- Production architecture — modular backend, REST API, React UI, Docker deployment
- Simple mode — single agent for fast direct answers
- Multi-agent mode — full pipeline for complex tasks

---

## Quick Start (Docker)

Requires NVIDIA GPU + Docker + NVIDIA Container Toolkit.

```bash
git clone https://github.com/anish-gyawali/agentcraft.git
cd agentcraft
./setup.sh
```

Open http://localhost:5173

That is it. Setup pulls all required models and starts all services automatically.

---

## Manual Setup

### Prerequisites
- NVIDIA GPU (8GB+ VRAM)
- Python 3.11
- Node.js 20
- Ollama
- Conda

### 1. Clone the repo
```bash
git clone https://github.com/anish-gyawali/agentcraft.git
cd agentcraft
```

### 2. Backend
```bash
conda create -n aidev python=3.11
conda activate aidev
pip install -r backend/requirements.txt
```

### 3. Pull models
```bash
ollama pull mistral-nemo
ollama pull nomic-embed-text
```

### 4. Start everything
```bash
# Terminal 1
ollama serve

# Terminal 2
conda activate aidev
uvicorn backend.api.routes:app --reload --port 8000

# Terminal 3
cd frontend
npm install
npm run dev
```

Open http://localhost:5173

---

## Project Structure

```
agentcraft/
├── backend/
│   ├── agents/
│   │   ├── planner.py       — breaks tasks into steps
│   │   ├── copilot.py       — executes using tools
│   │   ├── critic.py        — reviews output
│   │   └── orchestrator.py  — coordinates all three agents
│   ├── tools/
│   │   ├── file_tools.py    — read, write files
│   │   └── memory_tools.py  — search and index codebase
│   ├── memory/
│   │   └── vector_store.py  — ChromaDB embeddings
│   └── api/
│       └── routes.py        — FastAPI endpoints
│   └── data/
│       └── cleancode.pdf    — Your pdf file here
├── frontend/
│   └── src/
│       ├── components/      — UI components
│       ├── hooks/           — React state logic
│       └── api/             — API client
├── docker-compose.yml
└── setup.sh
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/chat` | Send message to agent pipeline |
| POST | `/index` | Index codebase into vector memory |

API docs available at http://localhost:8000/docs

---

## How It Works

### RAG (Retrieval Augmented Generation)
Instead of reading every file on every request, AgentCraft indexes your codebase into ChromaDB. When an agent needs information, it searches by meaning — not by keyword. Searching "authentication logic" finds relevant code even if that exact phrase never appears in the file.

### Multi-Agent Pipeline
Every request goes through three agents in sequence. The Planner decides what needs to be done. The Coder uses tools to actually do it. The Critic reviews whether the output is good enough. This mirrors how real engineering teams work.

### Local LLMs
Ollama manages downloading and serving open source models. mistral-nemo is used for all agents because it supports tool calling — not all models do. The model runs entirely on your GPU.

---

## Docker Hub

Images available at:
- `anishgyawali/agentcraft-backend`
- `anishgyawali/agentcraft-frontend`


## Built By

Anish Gyawali — [GitHub](https://github.com/anish-gyawali)

Built as part of learning AI engineering from scratch — environment setup, local LLMs, agent frameworks, vector memory, multi-agent orchestration, and full stack deployment.
