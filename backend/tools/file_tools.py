import os
from langchain_core.tools import tool

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
def write_file(filepath: str, content: str) -> str:
    """Writes content to a file"""
    with open(filepath, "w") as f:
        f.write(content)
    return f"Successfully written to {filepath}"