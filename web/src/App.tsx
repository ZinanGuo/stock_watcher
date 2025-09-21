import { useEffect, useState } from 'react';

type Health = { status: string; time: string };

export default function App() {
  const [health, setHealth] = useState<Health | null>(null);
    useEffect(() => {
    fetch('/api/health')               // /api Vite to 8080
      .then(r => r.json())             // parse json response
      .then(setHealth)                 // set to state
      .catch(console.error);           // log error if any
  }, []);                              // run once on mount

  return (
    <div style={{ padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <h1>Stock Watcher (UI only)</h1>
      <p>UI</p>
      <p>
        API: {
          health
            ? `${health.status} @ ${new Date(health.time).toLocaleTimeString()}`
            : 'loading...'
        }
      </p>
    </div>
  );
}
