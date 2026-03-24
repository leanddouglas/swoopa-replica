"use client";
import { useState } from 'react';

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleScrape = async () => {
    if (!keyword || !maxPrice) {
      alert("Please enter a keyword and max price.");
      return;
    }

    setLoading(true);
    setResults([]);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
      const response = await fetch(`${backendUrl}/api/scrape`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword, max_price: parseFloat(maxPrice) })
      });
      
      const data = await response.json();
      if (data.results) {
        setResults(data.results);
      }
    } catch (error) {
      console.error(error);
      alert("Uh oh! Could not connect to the backend.");
    }
    
    setLoading(false);
  };

  return (
    <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Swoopa Replica
        </h1>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '30px' }}>
        <aside className="glass-panel" style={{ height: 'fit-content' }}>
          <h2 style={{ marginBottom: '20px' }}>Create Alert</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>Keywords</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="e.g. iPhone 13 Pro Max" 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>Max Price ($)</label>
              <input 
                type="number" 
                className="input-field" 
                placeholder="800" 
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            <button className="btn" style={{ marginTop: '10px' }} onClick={handleScrape} disabled={loading}>
              {loading ? "Scraping..." : "Start Scraping"}
            </button>
          </div>
        </aside>

        <section className="glass-panel">
          <h2 style={{ marginBottom: '20px' }}>Recent Flips</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {results.length === 0 && !loading && (
              <p style={{ color: '#94a3b8' }}>No results yet. Start a swoop to see listings!</p>
            )}
            {loading && <p style={{ color: '#3b82f6' }}>Searching marketplaces...</p>}
            {results.map((item, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{item.title}</h3>
                  <a href={item.url} target="_blank" rel="noreferrer" style={{ color: '#94a3b8', fontSize: '0.9rem', textDecoration: 'underline' }}>
                    View on {item.platform}
                  </a>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4ade80' }}>${item.price}</p>
                  <p style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>
                    Est. Margin: +${(item.estimated_value - item.price) || 50}
                  </p>
                  {item.recommended_to_buy && (
                    <span style={{ fontSize: '0.7rem', background: '#4ade80', color: 'black', padding: '2px 6px', borderRadius: '4px' }}>Recommended</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
