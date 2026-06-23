import Starfield from '../components/Starfield.jsx'
import Reveal from '../components/Reveal.jsx'
import { profile } from '../data/profile.js'

const { about } = profile

const sectionLabel = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'var(--ice)',
  marginBottom: 16,
}
const cornerTick = {
  position: 'absolute',
  width: 22,
  height: 22,
  borderColor: 'rgba(201,168,106,0.7)',
}

export default function About() {
  return (
    <section id="about" className="section" aria-label="About">
      <Starfield count={55} seed={23} maxSize={2.0} />

      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1180, margin: '0 auto', padding: 'clamp(32px, 4vh, 80px) clamp(28px, 5vw, 72px)' }}>
        <Reveal>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(40px, 5.5vw, 68px)',
              lineHeight: 1.0,
              color: 'var(--text)',
              margin: '0 0 44px 0',
              letterSpacing: '-0.01em',
            }}
          >
            About <span style={{ fontStyle: 'italic', color: 'var(--gold)' }}>me</span>
          </h2>
        </Reveal>

        <div style={{ display: 'flex', gap: 'clamp(32px, 5vw, 72px)', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* LEFT — blurb + fun fact */}
          <Reveal delay={0.06} style={{ flex: '1 1 460px', minWidth: 300 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, lineHeight: 1.5, color: 'var(--text-warm)', margin: '0 0 24px 0' }}>
              I'm a fresh IT graduate from <span style={{ color: 'var(--gold)' }}>ITS</span>. I like taking
              messy, open-ended problems and turning them into clear, reproducible answers: pipelines,
              models, and dashboards that people can actually make decisions with.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.78, color: 'var(--muted)', margin: '0 0 22px 0' }}>{about.hobbies}</p>

            <div
              style={{
                position: 'relative',
                border: '1px solid rgba(201,168,106,0.28)',
                borderRadius: 6,
                padding: '22px 24px',
                marginTop: 30,
                background: 'var(--surface-soft)',
              }}
            >
              <span style={{ ...cornerTick, top: -1, left: -1, borderTop: '1px solid var(--gold-deep)', borderLeft: '1px solid var(--gold-deep)' }} />
              <span style={{ ...cornerTick, bottom: -1, right: -1, borderBottom: '1px solid var(--gold-deep)', borderRight: '1px solid var(--gold-deep)' }} />
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10 }}>
                ✦ Fun fact
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: '#9aa3ba', margin: 0, fontStyle: 'italic' }}>{about.funFact}</p>
            </div>
          </Reveal>

          {/* RIGHT — card with eclipse moon + lists */}
          <Reveal delay={0.12} style={{ flex: '1 1 400px', minWidth: 300 }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                border: '1px solid var(--gold-faint)',
                borderRadius: 16,
                padding: '32px 34px',
                background: 'linear-gradient(160deg, rgba(22,30,60,0.7), rgba(11,16,34,0.55))',
                boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
                overflow: 'hidden',
              }}
            >
              <span style={{ position: 'absolute', top: 12, left: 12, width: 22, height: 22, borderTop: '1px solid rgba(201,168,106,0.7)', borderLeft: '1px solid rgba(201,168,106,0.7)', borderRadius: '4px 0 0 0' }} />
              <span style={{ position: 'absolute', bottom: 12, right: 12, width: 22, height: 22, borderBottom: '1px solid rgba(201,168,106,0.7)', borderRight: '1px solid rgba(201,168,106,0.7)', borderRadius: '0 0 4px 0' }} />

              {/* rotating eclipse moon (decorative) */}
              <span aria-hidden="true" style={{ position: 'absolute', top: 24, right: 26, width: 30, height: 30, display: 'inline-block', animation: 'eclipseSpin 16s linear infinite' }}>
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle at 36% 34%, #f6f9fd, #dde6f4 55%, #aebfdc 100%)' }} />
                <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: '#131a36', transform: 'translate(8px, -6px)' }} />
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
                <div>
                  <div style={sectionLabel}>Off the clock</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {about.offTheClock.map((item) => (
                      <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ width: 5, height: 5, transform: 'rotate(45deg)', background: 'var(--gold)', display: 'block', flexShrink: 0 }} />
                        <span style={{ fontSize: 15, color: '#cdd4e6' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={sectionLabel}>Toolkit</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {about.toolkit.map((t) => (
                      <span key={t} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#bcc6dd', border: '1px solid rgba(201,168,106,0.3)', padding: '6px 12px', borderRadius: 3 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div style={sectionLabel}>Credentials</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                    {about.credentials.map((c) => (
                      <div key={c.label}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, color: 'var(--text)', lineHeight: 1 }}>{c.value}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted-dim)', marginTop: 4 }}>{c.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
