import os
import json
from openai import AsyncOpenAI

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def evaluate_deal(title: str, description: str, asking_price: float):
    prompt = f"""
    You are an expert AI flipper. Evaluate this deal and estimate the actual market value. 
    Title: {title}
    Description: {description}
    Asking Price: ${asking_price}
    
    Return ONLY a JSON object with:
    - estimated_value (float)
    - recommended_to_buy (boolean)
    - reason (short string)
    """
    
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )
    
    try:
        content = response.choices[0].message.content
        return json.loads(content)
    except:
        return {"estimated_value": 0, "recommended_to_buy": False, "reason": "Parsing failed"}
