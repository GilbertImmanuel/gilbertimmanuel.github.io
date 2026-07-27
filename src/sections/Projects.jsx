import { useCallback, useEffect, useRef, useState } from 'react'
import Starfield from '../components/Starfield.jsx'
import ProjectConstellation from '../components/ProjectConstellation.jsx'
import { projects } from '../data/projects.js'

const AUTO_CYCLE_MS = 4800
const IDLE_RESUME_MS = 12000
const PRIMARY_LABELS = { live: 'Live Demo →', slides: 'Slides →', org: 'View Org →' }

// CTAs are driven off whichever link fields exist: one primary (gold) from
// live/slides/org, plus an optional outline "Repo".
function ctasFor(links) {
  const out = []
  for (const k of ['live', 'slides', 'org']) {
    if (links[k]) {
      out.push({ href: links[k], label: PRIMARY_LABELS[k], primary: true })
      break
    }
  }
  if (links.repo) out.push({ href: links.repo, label: 'Repo', primary: false })
  return out
}

const goldCta = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#0b1024',
  background: 'linear-gradient(135deg, #e6cf9a, #c9a86a)',
  padding: '12px 22px',
  borderRadius: 3,
  textDecoration: 'none',
  fontWeight: 700,
}
const outlineCta = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#f2ede1',
  border: '1px solid var(--gold-line)',
  padding: '11px 20px',
  borderRadius: 3,
  textDecoration: 'none',
}
const tagStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  color: '#bcc6dd',
  border: '1px solid var(--ice-line)',
  padding: '5px 11px',
  borderRadius: 3,
}

export default function Projects() {
  const [s, setS] = useState({ active: 0, prev: 0, nonce: 0 })
  const [hovering, setHovering] = useState(false)
  const [engaged, setEngaged] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [reduced, setReduced] = useState(false)
  const idleRef = useRef()

  // Advance to the next project (wraps).
  const advance = useCallback(() => {
    setS((cur) => ({ prev: cur.active, active: (cur.active + 1) % projects.length, nonce: cur.nonce + 1 }))
  }, [])

  // Mark a user interaction: pause the auto-cycle, then resume it IDLE_RESUME_MS after the
  // last interaction by advancing once (which hands control back to the auto-cycle effect).
  // Focusing a star (via click or Tab) would otherwise pin the cycle forever, since nothing
  // blurs it. Re-arming on every touch keeps it paused while the user keeps interacting.
  const touch = useCallback(() => {
    setEngaged(true)
    clearTimeout(idleRef.current)
    idleRef.current = setTimeout(() => {
      setEngaged(false)
      advance()
    }, IDLE_RESUME_MS)
  }, [advance])
  useEffect(() => () => clearTimeout(idleRef.current), [])

  // Jump to a project (user-driven). touch() re-arms the idle window that resumes cycling.
  const go = useCallback((i) => {
    touch()
    setS((cur) => (i === cur.active ? cur : { prev: cur.active, active: i, nonce: cur.nonce + 1 }))
  }, [touch])

  // Track reduced-motion preference (disables auto-cycle so cards never swap unprompted).
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mql.matches)
    sync()
    mql.addEventListener('change', sync)
    return () => mql.removeEventListener('change', sync)
  }, [])

  // Pause the auto-cycle while the tab is hidden so it does not advance unseen.
  useEffect(() => {
    const onVis = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  // Auto-cycle: a setTimeout re-armed on every active change, so a user jump resets the
  // full 4800ms (interruptible) rather than restarting a fixed keyframe. Paused while the
  // user is interacting, the tab is hidden, or reduced motion is on.
  useEffect(() => {
    if (reduced || hovering || engaged || hidden) return
    const id = setTimeout(advance, AUTO_CYCLE_MS)
    return () => clearTimeout(id)
  }, [s.active, hovering, engaged, hidden, reduced, advance])

  const project = projects[s.active]
  const activeNum = '0' + (s.active + 1)

  return (
    <section
      id="projects"
      className="section"
      aria-label="Projects"
      onFocus={touch}
    >
      <Starfield count={60} seed={88} maxSize={1.9} />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 1320,
          margin: '0 auto',
          padding: 'clamp(24px, 4vh, 64px) clamp(28px, 5vw, 72px)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: 1.0,
            color: 'var(--text)',
            margin: '0 0 clamp(18px, 3vh, 34px) 0',
            letterSpacing: '-0.01em',
          }}
        >
          Projects
        </h2>

        <div
          style={{
            display: 'flex',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* LEFT — active project card (remounts with cardFade on change).
              The hover pause lives on this wrapper, not the section (which is full-viewport,
              so it would pause forever) and not the card (which remounts, so a remount under
              the cursor could swallow mouseleave and strand it paused). */}
          <div
            style={{ flex: '1 1 520px', minWidth: 320 }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <div
              key={s.active}
              style={{
                animation: 'cardFade 0.6s var(--ease-out)',
                background: 'linear-gradient(180deg, var(--surface), rgba(10,15,34,0.85))',
                border: '1px solid var(--gold-faint)',
                borderRadius: 6,
                overflow: 'hidden',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
              }}
            >
              <img
                src={project.image}
                alt={`${project.title} project preview`}
                width={1000}
                height={project.imgH}
                loading="lazy"
                decoding="async"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'clamp(185px, 29vh, 310px)',
                  objectFit: 'cover',
                  background: '#0a1024',
                  borderBottom: '1px solid rgba(201,168,106,0.18)',
                }}
              />
              <div style={{ padding: 'clamp(16px,2.4vh,28px) 34px clamp(18px,2.8vh,30px) 34px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)', letterSpacing: '0.1em' }}>
                    {project.num}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: 'var(--muted-dim)',
                    }}
                  >
                    {project.category}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(25px, 3.1vh, 33px)',
                    lineHeight: 1.05,
                    color: 'var(--text)',
                    margin: '0 0 11px 0',
                  }}
                >
                  {project.title}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 13 }}>
                  {project.tags.map((t) => (
                    <span key={t} style={tagStyle}>
                      {t}
                    </span>
                  ))}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.72, color: 'var(--muted)', margin: '0 0 18px 0' }}>
                  {project.blurb}
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  {ctasFor(project.links).map((c) => (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener"
                      className="cta"
                      style={c.primary ? goldCta : outlineCta}
                    >
                      {c.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — constellation navigator */}
          <div style={{ flex: '1 1 420px', minWidth: 300, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--ice)',
                }}
              >
                Cassiopeia
              </span>
              <span aria-live="polite" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--gold)' }}>
                {activeNum} / 0{projects.length}
              </span>
            </div>
            <div
              style={{
                flex: 1,
                minHeight: 340,
                position: 'relative',
                border: '1px solid rgba(201,168,106,0.14)',
                borderRadius: 6,
                background: 'radial-gradient(120% 100% at 70% 20%, rgba(27,37,71,0.5), rgba(8,12,29,0.2))',
                overflow: 'hidden',
                padding: 18,
              }}
            >
              <ProjectConstellation active={s.active} prev={s.prev} nonce={s.nonce} onSelect={go} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', display: 'block' }} />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--muted-dim)',
                }}
              >
                Click a star to jump · auto-cycling
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
