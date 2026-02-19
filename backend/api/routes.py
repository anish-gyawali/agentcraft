from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_ollama import ChatOllama
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage
from langchain.agents import create_agent
from backend.memory.vector_store import index_directory, search_codebase
import os

app = FastAPI(title="AgentCraft API")

# Allow React frontend to talk to this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_methods=["*"],
    allow_headers=["*"],
)

llm = ChatOllama(model="mistral-nemo")

# Define tools
@tool
def read_file(filepath: str) -> str:
    """Reads and returns the contents of a file"""
    if not os.path.exists(filepath):
        return f"File not found: {filepath}"
    with open(filepath, "r") as f:
        return f.read()

@tool
def list_files(directory: str) -> str:
    """Lists all files in a directory"""
    if not os.path.exists(directory):
        return f"Directory not found: {directory}"
    files = []
    for root, dirs, filenames in os.walk(directory):
        dirs[:] = [d for d in dirs if not d.startswith(".")]
        for filename in filenames:
            files.append(os.path.join(root, filename))
    return "\n".join(files)

@tool
def search_code(query: str) -> str:
    """Search the codebase semantically"""
    return search_codebase(query, n_results=3)

@tool
def index_project(directory: str) -> str:
    """Index a directory into vector memory"""
    return index_directory(directory)

tools = [read_file, list_files, search_code, index_project]
agent = create_agent(llm, tools)

# Request/Response models
class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    steps: list

# Routes
@app.get("/")
def root():
    return {"status": "AgentCraft API running"}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    result = agent.invoke({
        "messages": [HumanMessage(content=request.message)]
    })
    
    # Extract steps and final response
    steps = []
    final_response = ""
    for message in result["messages"]:
        class_name = message.__class__.__name__
        if class_name == "ToolMessage":
            steps.append({"type": "tool", "content": message.content[:200]})
        elif class_name == "AIMessage" and message.content:
            final_response = message.content

    return ChatResponse(response=final_response, steps=steps)

@app.post("/index")
def index(directory: str = "."):
    result = index_directory(directory)
    return {"result": result}