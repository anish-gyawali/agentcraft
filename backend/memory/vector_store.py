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

EXCLUDED_DIRS = {
    "node_modules", "__pycache__", ".git", 
    "db", ".env", "dist", "build", ".vite"
}

INCLUDED_EXTENSIONS = {".py", ".md", ".txt", ".js", ".jsx", ".ts", ".tsx", ".json"}

def index_directory(directory: str) -> str:
    results = []
    for root, dirs, files in os.walk(directory):
        # Skip excluded directories
        dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS]
        for filename in files:
            if any(filename.endswith(ext) for ext in INCLUDED_EXTENSIONS):
                # Skip package.json files inside node_modules paths
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