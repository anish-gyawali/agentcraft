from langchain_core.tools import tool
from backend.memory.vector_store import index_directory, search_codebase

@tool
def search_code(query: str) -> str:
    """Search the codebase semantically by meaning"""
    return search_codebase(query, n_results=3)

@tool
def index_project(directory: str) -> str:
    """Index a directory into vector memory for semantic search"""
    return index_directory(directory)