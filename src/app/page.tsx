'use client';
import { useEffect } from 'react'
import Landing from '../components/Landing'
import Projects from '../components/Projects/Projects'
export default function Home() {
  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])


  return (
    <main>
      {/* <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence> */}
      <Landing />
      {/* <Description /> */}
      <Projects />
      {/* <SlidingImages />
      <Contact /> */}
    </main>
  )
}
