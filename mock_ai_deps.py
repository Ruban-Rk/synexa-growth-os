import os

site_packages = "/home/ruban/Documents/robovantha/hackathon/synexa-growth-os/backend/venv/lib/python3.14/site-packages"

# Mock crewai
os.makedirs(os.path.join(site_packages, "crewai"), exist_ok=True)
with open(os.path.join(site_packages, "crewai", "__init__.py"), "w") as f:
    f.write("""
class Process:
    sequential = 'sequential'
class Agent:
    def __init__(self, **kwargs): pass
class Task:
    def __init__(self, **kwargs): pass
class Crew:
    def __init__(self, **kwargs): pass
    def kickoff(self): return "Marketing wants to increase budget. Finance might reject. Capacity warning."
""")

# Mock langchain_google_genai
os.makedirs(os.path.join(site_packages, "langchain_google_genai"), exist_ok=True)
with open(os.path.join(site_packages, "langchain_google_genai", "__init__.py"), "w") as f:
    f.write("""
class ChatGoogleGenerativeAI:
    def __init__(self, **kwargs): pass
""")

# Mock chromadb
os.makedirs(os.path.join(site_packages, "chromadb"), exist_ok=True)
with open(os.path.join(site_packages, "chromadb", "__init__.py"), "w") as f:
    f.write("""
class PersistentClient:
    def __init__(self, **kwargs): pass
    def get_or_create_collection(self, **kwargs): return MockCollection()
class MockCollection:
    def add(self, **kwargs): pass
    def query(self, **kwargs): return {"documents": [["mock document"]], "metadatas": [[]], "distances": [[]]}
""")

print("Mocks successfully installed!")
