import asyncio

async def run_scraper(keyword: str, max_price: float):
    print(f"Starting scrape for {keyword} under ${max_price}")
    mock_price = max_price - 50 if max_price > 50 else max_price * 0.7
    listings = [
        {
            "title": f"{keyword} - Like New Condition",
            "price": round(mock_price, 2),
            "url": "https://facebook.com/marketplace/item/12345",
            "platform": "facebook",
            "estimated_value": round(max_price * 1.2, 2),
            "recommended_to_buy": True
        },
        {
            "title": f"{keyword} - Good Deal, Must Go",
            "price": round(mock_price * 0.8, 2),
            "url": "https://facebook.com/marketplace/item/67890",
            "platform": "facebook",
            "estimated_value": round(max_price * 1.1, 2),
            "recommended_to_buy": True
        },
        {
            "title": f"{keyword} - Used but Working",
            "price": round(mock_price * 1.3, 2),
            "url": "https://offerup.com/item/detail/11111",
            "platform": "offerup",
            "estimated_value": round(max_price * 0.9, 2),
            "recommended_to_buy": False
        }
    ]
    return listings
