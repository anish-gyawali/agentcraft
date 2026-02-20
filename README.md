# AgentCraft 🤖⚡

> Local multi-agent AI copilot — runs entirely on your hardware, no paid APIs.

Built to understand codebases, perform research, use tools, and maintain memory
using open-source LLMs orchestrated with LangGraph.

## Architecture
- **Agent Orchestration** — LangGraph multi-agent workflows
- **Local LLMs** — Ollama (Mistral, CodeLlama) on GPU
- **Vector Memory** — ChromaDB + nomic-embed-text embeddings
- **Tool Use** — Git, filesystem, code execution
- **Backend API** — FastAPI
- **Frontend** — React + Vite

## Tech Stack
| Layer | Technology |
|-------|-----------|
| LLM Runtime | Ollama |
| Agent Framework | LangChain + LangGraph |
| Vector DB | ChromaDB |
| Backend | FastAPI (Python 3.11) |
| Frontend | React + Vite |
| Deep Learning | PyTorch (CUDA 12.8) |

## Hardware
- GPU: NVIDIA RTX 5070 (12GB VRAM)
- RAM: 32GB
- CPU: AMD Ryzen 9 7900X

## Project Progress
- [x] Phase 0 — Environment Setup (WSL2, CUDA, PyTorch)
- [x] Phase 1 — Local LLM Running (Ollama, Mistral, CodeLlama)
- [x] Phase 2 — Agent Framework (LangChain, LangGraph, Tool Use)
- [x] Phase 3 — Vector Memory & RAG
- [x] Phase 4 — Full System (API + React UI)
- [ ] Phase 5 — Evaluation & Fine-tuning

## Getting Started
### Prerequisites
- NVIDIA GPU with CUDA support
- Ollama installed
- Python 3.11+
- Node.js 18+

### Backend Setup
```bash
conda create -n aidev python=3.11
conda activate aidev
pip install -r backend/requirements.txt
ollama pull mistral && ollama pull codellama
uvicorn backend.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```