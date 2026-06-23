import Starfield from '../components/Starfield.jsx'
import Reveal from '../components/Reveal.jsx'
import { EmailIcon, LinkedInIcon, GitHubIcon } from '../components/icons.jsx'
import { profile } from '../data/profile.js'

const circle = {
  width: 54,
  height: 54,
  border: '1px solid rgba(201,168,106,0.4)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  color: '#e8eef7',
}

export default function Contact() {
  const { socials } = profile
  return (
    <section id="contact" className="section" aria-label="Contact">
      <Starfield count={80} seed={64} maxSize={2.4} />

      {/* moon rising from the bottom (decorative) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -260,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 620,
          height: 620,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 40%, rgba(232,238,247,0.22) 0%, rgba(174,191,220,0.08) 48%, transparent 70%)',
          boxShadow: '0 0 160px 40px rgba(174,191,220,0.12)',
        }}
      />

      <Reveal style={{ position: 'relative', zIndex: 2, maxWidth: 760, padding: '0 clamp(28px, 5vw, 72px)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'var(--ice)', marginBottom: 22 }}>
          Contact
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(44px, 6.5vw, 80px)',
            lineHeight: 1.02,
            color: 'var(--text)',
            margin: '0 0 18px 0',
            letterSpacing: '-0.01em',
          }}
        >
          Get in <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>touch</span>
        </h2>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.12em', color: 'var(--muted-dim)', marginBottom: 40 }}>
          {profile.location}
        </div>

        <a
          href={profile.cvPath}
          download
          className="cta"
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#0b1024',
            background: 'linear-gradient(135deg, #e6cf9a, #c9a86a)',
            padding: '16px 34px',
            borderRadius: 3,
            textDecoration: 'none',
            fontWeight: 700,
            marginBottom: 40,
          }}
        >
          ↓ Download CV
        </a>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={`mailto:${socials.email}`} aria-label="Email" className="social-icon" style={circle}>
            <EmailIcon size={23} />
          </a>
          <a href={socials.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn" className="social-icon" style={circle}>
            <LinkedInIcon size={22} />
          </a>
          <a href={socials.github} target="_blank" rel="noopener" aria-label="GitHub" className="social-icon" style={circle}>
            <GitHubIcon size={23} />
          </a>
        </div>
      </Reveal>

      <div
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.16em',
          color: 'var(--muted-dim)',
          whiteSpace: 'nowrap',
        }}
      >
        © 2026 {profile.name}
      </div>
    </section>
  )
}
