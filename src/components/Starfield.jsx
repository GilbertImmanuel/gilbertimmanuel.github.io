import { useMemo } from 'react'
import { makeStars } from '../lib/stars.js'

// Decorative twinkling star layer. Deterministic per seed; memoized so parent
// re-renders (e.g. the projects auto-cycle) don't recompute it.
export default function Starfield({ count, seed, maxSize }) {
  const stars = useMemo(() => makeStars(count, seed, { maxSize }), [count, seed, maxSize])
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {stars.map((s) => (
        <span
          key={s.key}
          style={{
            position: 'absolute',
            top: s.top + '%',
            left: s.left + '%',
            width: s.size + 'px',
            height: s.size + 'px',
            borderRadius: '50%',
            background: s.gold ? '#e6cf9a' : '#eaf1fb',
            boxShadow: s.gold
              ? '0 0 6px 1px rgba(230,207,154,0.7)'
              : '0 0 5px 1px rgba(200,220,250,0.6)',
            animation: `twinkle ${s.dur.toFixed(2)}s ease-in-out ${s.delay.toFixed(2)}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
