export default function Home() {
  return (
    <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', background: 'linear-gradient(to right, #60a5fa, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Swoopa Replica
        </h1>
        <nav>
          <button className="btn">Sign In</button>
        </nav>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '30px' }}>
        <aside className="glass-panel" style={{ height: 'fit-content' }}>
          <h2 style={{ marginBottom: '20px' }}>Create Alert</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>Keywords</label>
              <input type="text" className="input-field" placeholder="e.g. iPhone 13 Pro Max" />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.9rem', color: '#cbd5e1' }}>Max Price ($)</label>
              <input type="number" className="input-field" placeholder="800" />
            </div>
            <button className="btn" style={{ marginTop: '10px' }}>Start Scraping</button>
          </div>
        </aside>

        <section className="glass-panel">
          <h2 style={{ marginBottom: '20px' }}>Recent Flips</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div className="glass-panel" style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>MacBook Pro M1 (Facebook)</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Listed 2 mins ago in New York</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#4ade80' }}>$650</p>
                <p style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>Est. Value: $800</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
