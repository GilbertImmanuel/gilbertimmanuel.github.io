import { HERO_CONSTELLATIONS } from '../lib/constellations.js'

// Ambient hero constellations — 8 varied figures that dwell-fade in and out.
export default function HeroConstellations() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {HERO_CONSTELLATIONS.map((s, si) => (
        <svg
          key={si}
          viewBox={`0 0 ${s.vbw} ${s.vbh}`}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: (s.w * 0.72).toFixed(0) + 'px',
            height: 'auto',
            pointerEvents: 'none',
            opacity: 0,
            animation: `constDwell ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        >
          <g>
            {s.edges.map((e, ei) => (
              <line
                key={ei}
                x1={s.pts[e[0]][0]}
                y1={s.pts[e[0]][1]}
                x2={s.pts[e[1]][0]}
                y2={s.pts[e[1]][1]}
                stroke={`rgba(${s.color},${s.alpha})`}
                strokeWidth={s.sw}
              />
            ))}
          </g>
          <g>
            {s.pts.map((p, pi) => (
              <circle
                key={pi}
                cx={p[0]}
                cy={p[1]}
                r={s.dotR}
                fill="#fbf7ec"
                style={{ filter: `drop-shadow(0 0 ${(s.dotR * 2).toFixed(1)}px rgba(${s.color},0.95))` }}
              />
            ))}
          </g>
        </svg>
      ))}
    </div>
  )
}
