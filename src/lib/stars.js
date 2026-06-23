// Deterministic starfield data. Mirrors the mockup's seed math so the field is
// stable across renders (no hydration mismatch, no layout shift).
export function makeStars(count, seed, opts = {}) {
  const rand = (n) => {
    const x = Math.sin(seed * 99.13 + n * 17.71) * 43758.5453
    return x - Math.floor(x)
  }
  const maxSize = opts.maxSize || 2.2
  const stars = []
  for (let i = 0; i < count; i++) {
    stars.push({
      key: i,
      size: maxSize * rand(i) + 0.5,
      top: rand(i + 100) * 100,
      left: rand(i + 200) * 100,
      dur: 2.5 + rand(i + 300) * 4,
      delay: rand(i + 400) * 5,
      gold: rand(i + 500) > 0.82,
    })
  }
  return stars
}
