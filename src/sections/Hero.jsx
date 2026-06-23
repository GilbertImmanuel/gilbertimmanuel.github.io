import Starfield from '../components/Starfield.jsx'
import HeroConstellations from '../components/HeroConstellations.jsx'
import RotatingRoles from '../components/RotatingRoles.jsx'
import { ChevronDown } from '../components/icons.jsx'
import { profile } from '../data/profile.js'

export default function Hero() {
  return (
    <section id="home" className="section" aria-label="Intro">
      <Starfield count={95} seed={41} maxSize={2.3} />
      <HeroConstellations />

      {/* large faint floating moon behind center */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 560,
          height: 560,
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 50% 45%, rgba(220,230,244,0.17) 0%, rgba(174,191,220,0.06) 50%, transparent 72%)',
          boxShadow: 'inset 0 0 120px rgba(174,191,220,0.08)',
          animation: 'moonFloat 10s ease-in-out infinite',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'min(880px, 86vw)',
          padding: '56px 40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            letterSpacing: '0.34em',
            textTransform: 'uppercase',
            color: 'var(--ice)',
            marginBottom: 22,
          }}
        >
          {profile.eyebrow}
        </div>

        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 500,
            fontSize: 30,
            color: 'var(--ice-soft)',
            marginBottom: 6,
          }}
        >
          {profile.greeting}
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(52px, 7vw, 92px)',
            lineHeight: 1.0,
            color: 'var(--text)',
            margin: 0,
            letterSpacing: '-0.005em',
          }}
        >
          {profile.nameLines[0]}
          <br />
          <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>{profile.nameLines[1]}</span>
        </h1>

        <RotatingRoles />

        <p style={{ fontSize: 16, lineHeight: 1.7, color: 'var(--muted)', maxWidth: 480, margin: 0 }}>
          {profile.oneLiner}
        </p>
      </div>

      {/* scroll cue */}
      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="scroll-cue"
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          color: 'rgba(201,168,106,0.55)',
        }}
      >
        <ChevronDown style={{ display: 'block', animation: 'arrowBob 2.2s ease-in-out infinite' }} />
      </a>
    </section>
  )
}
