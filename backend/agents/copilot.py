from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from langchain_core.messages import HumanMessage
from backend.tools import all_tools

llm = ChatOllama(model="mistral-nemo")

def create_copilot_agent():
    return create_agent(llm, all_tools)

def run_coder(plan: str, user_request: str, project_root: str) -> dict:
    """Execute the plan using tools"""
    agent = create_copilot_agent()
    
    result = agent.invoke({
        "messages": [HumanMessage(content=f"""
        Project root: {project_root}
        
        You are a Coder agent. Execute this plan using your tools:
        {plan}
        
        Original request: {user_request}
        
        Use search_code and read_file to understand the codebase before making changes.
        """)]
    })
    
    steps = []
    final_output = ""
    for message in result["messages"]:
        class_name = message.__class__.__name__
        if class_name == "ToolMessage":
            steps.append(message.content[:300])
        elif class_name == "AIMessage" and message.content:
            final_output = message.content
    
    return {
        "agent": "coder",
        "output": final_output,
        "steps": steps,
        "status": "complete"
    }