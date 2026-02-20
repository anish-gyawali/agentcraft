from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_core.messages import HumanMessage
from backend.agents import create_copilot_agent, run_multi_agent
from backend.tools.memory_tools import index_project
import os

PROJECT_ROOT = os.path.expanduser("~/agentcraft")

app = FastAPI(title="AgentCraft API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

agent = create_copilot_agent()

class ChatRequest(BaseModel):
    message: str
    mode: str = "simple"  # "simple" or "multi_agent"

class AgentResult(BaseModel):
    agent: str
    output: str
    status: str
    steps: list = []

class ChatResponse(BaseModel):
    response: str
    steps: list = []
    agents: list = []

@app.get("/")
def root():
    return {"status": "AgentCraft API running"}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    if request.mode == "multi_agent":
        results = run_multi_agent(request.message)
        
        agents = []
        for agent_name in ["planner", "coder", "critic"]:
            if results[agent_name]:
                agents.append({
                    "agent": agent_name,
                    "output": results[agent_name]["output"],
                    "status": results[agent_name]["status"],
                    "steps": results[agent_name].get("steps", [])
                })
        
        return ChatResponse(
            response=results["final_response"],
            agents=agents
        )
    
    # Simple mode — single agent
    grounded_message = f"""You are AgentCraft, an AI copilot for the codebase at {PROJECT_ROOT}.
Always use search_code tool first. Never answer from memory alone.
User question: {request.message}"""

    result = agent.invoke({
        "messages": [HumanMessage(content=grounded_message)]
    })

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
    result = index_project.invoke(directory)
    return {"result": result}