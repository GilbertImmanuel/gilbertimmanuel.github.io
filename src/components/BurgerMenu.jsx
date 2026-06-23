import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile.js'
import { EmailIcon, LinkedInIcon, GitHubIcon } from './icons.jsx'

const NAV = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const lineBase = {
  position: 'absolute',
  left: 0,
  top: '7px', // fixed; position + morph are driven by transform (GPU), not top
  height: '1.5px',
  background: 'var(--gold)',
  display: 'block',
  borderRadius: '2px',
  transition:
    'transform 0.3s var(--ease-out), opacity 0.2s var(--ease-out), width 0.3s var(--ease-out)',
}

const circleIcon = {
  width: 46,
  height: 46,
  border: '1px solid rgba(201,168,106,0.4)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  color: '#bcc6dd',
}

export default function BurgerMenu() {
  const [open, setOpen] = useState(false)
  const overlayRef = useRef(null)
  const triggerRef = useRef(null)

  // While open: lock body scroll, focus the first item, trap Tab, ESC to close,
  // restore focus to the trigger on close.
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const items = () => overlayRef.current?.querySelectorAll('a[href], button') ?? []
    items()[0]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab') return
      const list = items()
      if (!list.length) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      triggerRef.current?.focus()
    }
  }, [open])

  const burgerTop = open
    ? { ...lineBase, width: '20px', transform: 'translateY(0) rotate(45deg)' }
    : { ...lineBase, width: '20px', transform: 'translateY(-6px)' }
  const burgerMid = open
    ? { ...lineBase, width: '20px', transform: 'translateY(0)', opacity: 0 }
    : { ...lineBase, width: '20px', transform: 'translateY(0)' }
  const burgerBot = open
    ? { ...lineBase, width: '20px', transform: 'translateY(0) rotate(-45deg)' }
    : { ...lineBase, width: '13px', transform: 'translateY(6px)' }

  // Stagger menu items in on open (none when closed so it replays each time).
  const itemAnim = (i) => (open ? `menuItemIn 0.5s var(--ease-out) ${(0.08 + i * 0.06).toFixed(2)}s both` : 'none')

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="menu-overlay"
        style={{
          position: 'fixed',
          top: 30,
          right: 'clamp(28px, 5vw, 72px)',
          zIndex: 130,
          width: 46,
          height: 46,
          border: '1px solid rgba(201,168,106,0.5)',
          borderRadius: 4,
          background: 'rgba(10,15,34,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span style={{ position: 'relative', width: 20, height: 16 }}>
          <span style={burgerTop} />
          <span style={burgerMid} />
          <span style={burgerBot} />
        </span>
      </button>

      <div
        id="menu-overlay"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!open}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: 'rgba(7,10,26,0.32)',
          backdropFilter: open ? 'blur(18px) saturate(120%)' : 'blur(0px)',
          WebkitBackdropFilter: open ? 'blur(18px) saturate(120%)' : 'blur(0px)',
          opacity: open ? 1 : 0,
          visibility: open ? 'visible' : 'hidden',
          pointerEvents: open ? 'auto' : 'none',
          // Asymmetric: deliberate open breathes (0.45s drawer curve), system close snaps (0.3s).
          transition: open
            ? 'opacity 0.45s var(--ease-drawer), visibility 0.45s var(--ease-drawer), backdrop-filter 0.45s var(--ease-drawer)'
            : 'opacity 0.3s var(--ease-out), visibility 0.3s var(--ease-out), backdrop-filter 0.3s var(--ease-out)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'var(--ice)',
            marginBottom: 36,
            animation: itemAnim(0),
          }}
        >
          Navigate the night
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              className="menu-link"
              onClick={() => setOpen(false)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(40px, 6vw, 68px)',
                fontWeight: 500,
                color: 'var(--text)',
                textDecoration: 'none',
                lineHeight: 1.15,
                animation: itemAnim(i + 1),
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            marginTop: 44,
            animation: itemAnim(NAV.length + 1),
          }}
        >
          <a
            href={`mailto:${profile.socials.email}`}
            onClick={() => setOpen(false)}
            aria-label="Email"
            className="social-icon"
            style={circleIcon}
          >
            <EmailIcon />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
            aria-label="LinkedIn"
            className="social-icon"
            style={circleIcon}
          >
            <LinkedInIcon />
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener"
            onClick={() => setOpen(false)}
            aria-label="GitHub"
            className="social-icon"
            style={circleIcon}
          >
            <GitHubIcon />
          </a>
          <a
            href={profile.cvPath}
            download
            onClick={() => setOpen(false)}
            className="cta"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#0b1024',
              background: 'linear-gradient(135deg, #e6cf9a, #c9a86a)',
              padding: '13px 18px',
              borderRadius: 3,
              textDecoration: 'none',
              fontWeight: 700,
            }}
          >
            CV ↓
          </a>
        </div>
      </div>
    </>
  )
}
