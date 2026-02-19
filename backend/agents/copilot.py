from langchain_ollama import ChatOllama
from langchain.agents import create_agent
from backend.tools import all_tools

def create_copilot_agent():
    llm = ChatOllama(model="mistral-nemo")
    agent = create_agent(llm, all_tools)
    return agent