import { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation } from 'motion/react'
import BurgerMenu from './components/BurgerMenu.jsx'
import Hero from './sections/Hero.jsx'

// Below-the-fold sections are split out of the initial bundle (they pull in the
// project constellation, the About card, and the motion features). Hero stays eager
// for a fast first paint.
const Projects = lazy(() => import('./sections/Projects.jsx'))
const About = lazy(() => import('./sections/About.jsx'))
const Contact = lazy(() => import('./sections/Contact.jsx'))

// Full-height placeholder so the anchor id exists immediately and the layout doesn't
// shift while a section chunk loads.
function SectionFallback({ id }) {
  return <section id={id} className="section" aria-hidden="true" />
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <a href="#home" className="skip-link">Skip to content</a>
      <BurgerMenu />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback id="projects" />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<SectionFallback id="about" />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionFallback id="contact" />}>
          <Contact />
        </Suspense>
      </main>
    </LazyMotion>
  )
}
