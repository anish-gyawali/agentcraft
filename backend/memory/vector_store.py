import chromadb
from sentence_transformers import SentenceTransformer
import os

# Load local embedding model — no API needed
embedder = SentenceTransformer('all-MiniLM-L6-v2')

# Initialize ChromaDB — persists to disk
client = chromadb.PersistentClient(path="./backend/memory/db")
collection = client.get_or_create_collection("codebase")

def index_file(filepath: str) -> str:
    """Read a file and store it in vector database"""
    if not os.path.exists(filepath):
        return f"File not found: {filepath}"
    
    with open(filepath, "r", errors="ignore") as f:
        content = f.read()

    if not content.strip():
        return f"File is empty: {filepath}"

    # Convert text to embedding
    embedding = embedder.encode(content).tolist()

    # Store in ChromaDB
    collection.upsert(
        documents=[content],
        embeddings=[embedding],
        ids=[filepath],
        metadatas=[{"filepath": filepath}]
    )
    return f"Indexed: {filepath}"

def index_directory(directory: str) -> str:
    """Index all files in a directory"""
    results = []
    for root, dirs, files in os.walk(directory):
        dirs[:] = [d for d in dirs if not d.startswith(".")]
        for filename in files:
            # Only index text-based files
            if filename.endswith((".py", ".md", ".txt", ".js", ".ts", ".json")):
                filepath = os.path.join(root, filename)
                result = index_file(filepath)
                results.append(result)
    return "\n".join(results)

def search_codebase(query: str, n_results: int = 3) -> str:
    """Search codebase by meaning, not keyword"""
    query_embedding = embedder.encode(query).tolist()
    
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=n_results
    )
    
    if not results["documents"][0]:
        return "No results found"

    output = []
    for doc, metadata in zip(results["documents"][0], results["metadatas"][0]):
        output.append(f"--- File: {metadata['filepath']} ---\n{doc[:500]}")
    
    return "\n\n".join(output)

if __name__ == "__main__":
    print("Indexing agentcraft codebase...")
    result = index_directory(".")
    print(result)
    
    print("\nSearching for 'agent tools'...")
    results = search_codebase("agent tools")
    print(results)