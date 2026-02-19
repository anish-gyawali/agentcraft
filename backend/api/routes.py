from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_core.messages import HumanMessage
from backend.agents import create_copilot_agent
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

class ChatResponse(BaseModel):
    response: str
    steps: list

@app.get("/")
def root():
    return {"status": "AgentCraft API running"}

@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    grounded_message = f"""You are AgentCraft, an AI copilot for the codebase at {PROJECT_ROOT}.

IMPORTANT RULES:
- Always use search_code tool first to find relevant files
- Only use list_files on specific subdirectories like {PROJECT_ROOT}/backend, never on the full project root
- Never list node_modules or frontend/node_modules
- Base your answers only on what the tools return

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
    from backend.tools.memory_tools import index_project
    result = index_project.invoke(directory)
    return {"result": result}