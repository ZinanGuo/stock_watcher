import { useEffect, useState } from 'react';

type Health = { status: string; time: string };
type Quote = { symbol: string; price: number; change: number; time: string };

export default function App() {
  const [health, setHealth] = useState<Health | null>(null);
  const [symbols, setSymbols] = useState('AAPL,MSFT');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);

    useEffect(() => {
    fetch('/api/health')               // /api Vite to 8080/api/health
      .then(r => r.json())             // parse json response
      .then(setHealth)                 // set to state
      .catch(console.error);           // log error if any
  }, []);                              // run once on mount

const fetchQuotes = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ symbols });
      const res = await fetch(`/api/quotes?${params.toString()}`); // 仍然走代理
      const data = await res.json(); // { quotes: [...] }
      setQuotes(data.quotes ?? []);
    } catch (e) {
      console.error(e);
      setQuotes([]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <h1>Stock Watcher</h1>

      <section style={{ marginBottom: 16 }}>
        <p>API health: {health ? `${health.status} @ ${new Date(health.time).toLocaleTimeString()}` : 'loading...'}</p>
      </section>

      <section style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <label htmlFor="symbols">Symbols (comma separated):</label>
        <input
          id="symbols"
          value={symbols}
          onChange={(e) => setSymbols(e.target.value)}
          style={{ padding: 6, minWidth: 280 }}
          placeholder="AAPL,MSFT,GOOG"
        />
        <button onClick={fetchQuotes} disabled={loading} style={{ padding: '6px 12px' }}>
          {loading ? 'Loading...' : 'Fetch quotes'}
        </button>
      </section>

      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={th}>Symbol</th>
            <th style={th}>Price</th>
            <th style={th}>Change</th>
            <th style={th}>Time</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr key={q.symbol}>
              <td style={td}>{q.symbol}</td>
              <td style={td}>{q.price.toFixed(2)}</td>
              <td style={{ ...td, color: q.change > 0 ? 'green' : q.change < 0 ? 'crimson' : 'inherit' }}>
                {q.change >= 0 ? '+' : ''}
                {q.change.toFixed(2)}
              </td>
              <td style={td}>{new Date(q.time).toLocaleTimeString()}</td>
            </tr>
          ))}
          {!loading && quotes.length === 0 && (
            <tr>
              <td style={td} colSpan={4}>No data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

const th: React.CSSProperties = { textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px 4px' };
const td: React.CSSProperties = { borderBottom: '1px solid #f0f0f0', padding: '8px 4px' };