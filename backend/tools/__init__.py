from backend.tools.file_tools import read_file, write_file
from backend.tools.memory_tools import search_code, index_project
from backend.tools.pdf_tools import index_pdf, search_pdf

all_tools = [read_file, write_file, search_code, index_project, index_pdf, search_pdf]