import { useState, useEffect } from 'react';

export default function Bomb() {
  const [explode, setExplode] = useState(false);

  // 1. Render error → error boundary
  if (explode) throw new Error('💥 Render error');

  return (
    <div style={{ display: 'flex', gap: 8, padding: 16 }}>
      <button onClick={() => setExplode(true)}>
        Render error (boundary)
      </button>

      {/* 2. Event handler → window 'error' */}
      <button onClick={() => { throw new Error('💥 Handler error'); }}>
        Handler error
      </button>

      {/* 3. Rejected promise → unhandledrejection */}
      <button onClick={() => { Promise.reject(new Error('💥 Rejection')); }}>
        Promise rejection
      </button>

      {/* 4. Timer → window 'error' */}
      <button onClick={() => setTimeout(() => { throw new Error('💥 Timer'); }, 100)}>
        Timer error
      </button>
    </div>
  );
}