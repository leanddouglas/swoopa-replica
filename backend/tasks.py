import os
from celery import Celery
from scraper import run_scraper
import asyncio

redis_url = os.getenv("REDIS_URL", "redis://localhost:6379/0")
app = Celery("swoopa_tasks", broker=redis_url)

@app.task
def scrape_marketplace_task(keyword: str, max_price: float):
    # Celery tasks are synchronous by default, but Playwright is async
    results = asyncio.run(run_scraper(keyword, max_price))
    # In a real app, send these to the matching engine
    return results
