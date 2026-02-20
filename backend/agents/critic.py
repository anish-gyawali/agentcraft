from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage, SystemMessage

llm = ChatOllama(model="mistral-nemo")

def critique_output(original_request: str, agent_output: str) -> dict:
    """Review and critique the coder agent's output"""
    
    response = llm.invoke([
        SystemMessage(content="""You are a Critic agent. Your job is to review 
        the output of other agents and identify issues or improvements.
        
        Respond in this exact format:
        VERDICT: <approved|needs_improvement>
        ISSUES:
        - <issue or 'none'>
        SUGGESTIONS:
        - <specific improvement>
        CONFIDENCE: <high|medium|low>
        """),
        HumanMessage(content=f"""
        Original request: {original_request}
        Agent output: {agent_output}
        
        Review this output critically.
        """)
    ])
    
    return {
        "agent": "critic",
        "output": response.content,
        "status": "complete"
    }