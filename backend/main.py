from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from scraper import run_scraper

app = FastAPI(title="Swoopa Replica API")

try:
    from database import engine, Base
    import models
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Database setup skipped: {e}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ScrapeRequest(BaseModel):
    keyword: str
    max_price: float

@app.get("/")
def read_root():
    return {"message": "Swoopa Replica API running successfully"}

@app.post("/api/scrape")
async def scrape_endpoint(request: ScrapeRequest):
    results = await run_scraper(request.keyword, request.max_price)
    return {"status": "success", "results": results}
