// Shared Framer Motion config. Kept tiny on purpose — most motion in this site is
// CSS keyframes (off main thread). Framer is only for scroll-reveal entrances.
export const reveal = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

// whileInView config: animate once, when ~25% on screen.
export const inView = { once: true, amount: 0.25 }
