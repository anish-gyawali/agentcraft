from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage

llm = ChatOllama(model="mistral-nemo")

def plan_task(user_request: str, project_root: str) -> dict:
    """Break a complex request into actionable steps"""
    
    response = llm.invoke([
        SystemMessage(content="""You are a Planner agent. Your job is to break down 
        complex coding tasks into clear, actionable steps.
        
        Respond in this exact format:
        GOAL: <one line summary of what needs to be done>
        STEPS:
        1. <specific step>
        2. <specific step>
        3. <specific step>
        ASSIGNED_TO: <coder|researcher|both>
        """),
        HumanMessage(content=f"Project is at {project_root}. Task: {user_request}")
    ])
    
    return {
        "agent": "planner",
        "output": response.content,
        "status": "complete"
    }