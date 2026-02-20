import os
from pypdf import PdfReader
from langchain_core.tools import tool
from backend.memory.vector_store import embedder, collection

@tool
def index_pdf(filepath: str) -> str:
    """Index a PDF file into vector memory for semantic search"""
    if not os.path.exists(filepath):
        return f"File not found: {filepath}"

    reader = PdfReader(filepath)
    total_pages = len(reader.pages)
    indexed = 0

    for i, page in enumerate(reader.pages):
        text = page.extract_text()
        if not text or not text.strip():
            continue

        # Store each page as a separate chunk
        chunk_id = f"{filepath}_page_{i+1}"
        embedding = embedder.encode(text).tolist()

        collection.upsert(
            documents=[text],
            embeddings=[embedding],
            ids=[chunk_id],
            metadatas=[{
                "filepath": filepath,
                "page": i + 1,
                "total_pages": total_pages,
                "type": "pdf"
            }]
        )
        indexed += 1

    return f"Indexed {indexed} pages from {filepath}"

@tool
def search_pdf(query: str) -> str:
    """Search indexed PDF content by meaning"""
    query_embedding = embedder.encode(query).tolist()

    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=3,
        where={"type": "pdf"}
    )

    if not results["documents"][0]:
        return "No results found in indexed PDFs"

    output = []
    for doc, metadata in zip(results["documents"][0], results["metadatas"][0]):
        output.append(
            f"--- {metadata['filepath']} (Page {metadata['page']}) ---\n{doc[:600]}"
        )

    return "\n\n".join(output)