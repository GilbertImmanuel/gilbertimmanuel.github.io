import { profile } from '../data/profile.js'

// The role list, with the first repeated at the end so roleCycle loops seamlessly.
const roles = [...profile.roles, profile.roles[0]]
const rule = { width: 36, height: 1, background: 'rgba(201,168,106,0.6)', display: 'block' }

// Reduced-motion: the global CSS block freezes the cycle on the first role — readable, no movement.
export default function RotatingRoles() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '28px 0 24px' }}>
      <span style={rule} />
      <div style={{ height: 40, overflow: 'hidden' }} aria-label={profile.roles.join(', ')}>
        <div style={{ animation: 'roleCycle 9s cubic-bezier(0.7,0,0.3,1) infinite' }}>
          {roles.map((r, i) => (
            <div
              key={i}
              aria-hidden={i === roles.length - 1 ? 'true' : undefined}
              style={{
                height: 46,
                lineHeight: '40px',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 19,
                letterSpacing: '0.04em',
                color: 'var(--ice-soft)',
              }}
            >
              {r}
            </div>
          ))}
        </div>
      </div>
      <span style={rule} />
    </div>
  )
}
