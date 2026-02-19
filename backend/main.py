from langchain_ollama import ChatOllama
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage
from langchain.agents import create_agent
import os

llm = ChatOllama(model="mistral")

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
        # Skip hidden folders like .git
        dirs[:] = [d for d in dirs if not d.startswith(".")]
        for filename in filenames:
            filepath = os.path.join(root, filename)
            files.append(filepath)
    return "\n".join(files)

@tool
def write_file(filepath: str, content: str) -> str:
    """Writes content to a file"""
    with open(filepath, "w") as f:
        f.write(content)
    return f"Successfully written to {filepath}"

tools = [read_file, list_files, write_file]

agent = create_agent(llm, tools)

# Ask the agent to explore your project
result = agent.invoke({
    "messages": [HumanMessage(content="""
    Do these steps in order:
    1. Call list_files with directory=/home/anish/agentcraft
    2. Then call read_file with filepath=/home/anish/agentcraft/README.md
    3. Summarize what you read
    """)]
})

print("\n=== AGENT REASONING ===")
for message in result["messages"]:
    print(f"\n[{message.__class__.__name__}]: {message.content}")