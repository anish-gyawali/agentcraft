from langchain_ollama import ChatOllama
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage
from langchain.agents import create_agent

# Connect to local Mistral
llm = ChatOllama(model="mistral")

# Define tools
@tool
def get_word_length(word: str) -> int:
    """Returns the length of a word"""
    return len(word)

@tool
def add_numbers(a: int, b: int) -> int:
    """Adds two numbers together"""
    return a + b

tools = [get_word_length, add_numbers]

# Create agent using LangGraph (modern approach)
agent = create_agent(llm, tools)

# Run it
result = agent.invoke({
    "messages": [HumanMessage(content="What is the length of the word 'artificial' and what is 15 + 27?")]
})

# Print conversation
print("\n=== AGENT REASONING ===")
for message in result["messages"]:
    print(f"\n[{message.__class__.__name__}]: {message.content}")