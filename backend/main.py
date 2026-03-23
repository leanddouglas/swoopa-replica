from fastapi import FastAPI

app = FastAPI(title="Swoopa Replica API")

@app.get("/")
def read_root():
    return {"message": "Swoopa Replica API running successfully"}
