import { m, useReducedMotion } from 'motion/react'
import { reveal, inView } from '../lib/motion.js'

// Scroll-reveal entrance: fades + lifts content in once when it enters view.
// Uses `m` (LazyMotion-tree-shaken) — must sit under the <LazyMotion> in App.jsx.
// Under reduced motion we render visible immediately (no hidden initial, no translate),
// so the content never depends on an observer firing to become readable.
export default function Reveal({ children, delay = 0, style }) {
  const reduce = useReducedMotion()
  if (reduce) return <div style={style}>{children}</div>
  return (
    <m.div
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
      style={style}
    >
      {children}
    </m.div>
  )
}
