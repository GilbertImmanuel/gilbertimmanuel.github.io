import { useMemo } from 'react'
import { PROJECT_NODES, PROJECT_EDGES, bfs } from '../lib/constellations.js'
import { projects } from '../data/projects.js'

// The project count comes from the data, not a constant: the first projects.length
// nodes are interactive stars, the rest fill the figure. Adding a project to
// projects.js is all it takes (ceiling: PROJECT_NODES has 9 points).

// Static faint background dots — deterministic per the mockup's standalone RNG, so
// the field never reshuffles on re-render (active changes every 4800ms).
function makeBgDots() {
  const rand = (n) => {
    const x = Math.sin(n * 12.9898) * 43758.5453
    return x - Math.floor(x)
  }
  return Array.from({ length: 30 }, (_, i) => ({
    cx: rand(i) * 480,
    cy: rand(i + 50) * 460,
    r: rand(i + 99) * 1.1 + 0.3,
    opacity: 0.16 + rand(i + 7) * 0.32,
  }))
}

// Interactive constellation navigator. The project stars are clickable + keyboard-
// operable; the BFS shortest path between prev→active is drawn as a tracer that replays
// (via the React key) each jump. Active/prev/nonce are owned by the Projects section.
export default function ProjectConstellation({ active, prev, nonce, onSelect }) {
  const bgDots = useMemo(makeBgDots, [])

  const path = bfs(prev, active)
  const tracer =
    path.length > 1 ? 'M' + path.map((n) => PROJECT_NODES[n][0] + ',' + PROJECT_NODES[n][1]).join(' L') : null

  const handleKey = (e, i) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(i)
    }
  }

  return (
    <svg
      viewBox="0 0 480 460"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', overflow: 'visible' }}
    >
      {/* faint background dots */}
      <g aria-hidden="true">
        {bgDots.map((d, i) => (
          <circle key={'b' + i} cx={d.cx} cy={d.cy} r={d.r} fill="#9fb3d6" opacity={d.opacity} />
        ))}
      </g>

      {/* figure edges */}
      <g aria-hidden="true">
        {PROJECT_EDGES.map((e, i) => (
          <line
            key={'e' + i}
            x1={PROJECT_NODES[e[0]][0]}
            y1={PROJECT_NODES[e[0]][1]}
            x2={PROJECT_NODES[e[1]][0]}
            y2={PROJECT_NODES[e[1]][1]}
            stroke="rgba(201,168,106,0.2)"
            strokeWidth={1}
          />
        ))}
      </g>

      {/* animated tracer — keyed so drawLine replays on each jump */}
      {tracer && (
        <path
          key={`tr-${prev}-${active}-${nonce}`}
          d={tracer}
          fill="none"
          stroke="#e6cf9a"
          strokeWidth={1.8}
          pathLength={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ strokeDasharray: 1, animation: 'drawLine 0.7s var(--ease-in-out) forwards' }}
        />
      )}

      {/* stars: the first projects.length nodes are interactive, the rest are filler */}
      <g>
        {PROJECT_NODES.map((p, i) => {
          if (i >= projects.length) {
            return <circle key={'dn' + i} cx={p[0]} cy={p[1]} r={2.4} fill="#aebcd8" opacity={0.55} aria-hidden="true" />
          }
          const isA = i === active
          const num = '0' + (i + 1)
          return (
            <g
              key={'s' + i}
              className="const-star"
              role="button"
              tabIndex={0}
              aria-label={`Project ${num}: ${projects[i].title}`}
              aria-pressed={isA}
              onClick={() => onSelect(i)}
              onKeyDown={(e) => handleKey(e, i)}
              style={{ cursor: 'pointer' }}
            >
              {isA && <circle cx={p[0]} cy={p[1]} r={26} fill="rgba(230,207,154,0.10)" />}
              {isA && <circle cx={p[0]} cy={p[1]} r={15} fill="none" stroke="rgba(230,207,154,0.55)" strokeWidth={1} />}
              <circle
                cx={p[0]}
                cy={p[1]}
                r={isA ? 7 : 4}
                fill={isA ? '#f0dca8' : '#dbe6f6'}
                style={{
                  filter: isA ? 'drop-shadow(0 0 7px rgba(230,207,154,0.95))' : 'none',
                  transition: 'r 0.3s var(--ease-out)',
                }}
              />
              {/* generous transparent hit target */}
              <circle cx={p[0]} cy={p[1]} r={22} fill="transparent" />
              <text
                x={p[0] + 13}
                y={p[1] + 4}
                fill={isA ? '#e6cf9a' : '#7f8bab'}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.08em' }}
              >
                {num}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
