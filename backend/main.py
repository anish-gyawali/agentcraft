from langchain_ollama import ChatOllama
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage
from langchain.agents import create_agent
from memory.vector_store import index_directory, search_codebase
import os

llm = ChatOllama(model="mistral-nemo")

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
    """Search the codebase semantically by meaning, not keyword"""
    return search_codebase(query, n_results=3)

@tool
def index_project(directory: str) -> str:
    """Index a directory into vector memory for semantic search"""
    return index_directory(directory)

tools = [read_file, list_files, search_code, index_project]

agent = create_agent(llm, tools)

result = agent.invoke({
    "messages": [HumanMessage(content="Use the search_code tool with query='vector database memory' and show me the results")]
})

print("\n=== AGENT REASONING ===")
for message in result["messages"]:
    print(f"\n[{message.__class__.__name__}]: {message.content}")