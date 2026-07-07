'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './page.module.scss';
import Landing from '../components/Landing';
import Projects from '../components/Projects/Projects';
import Description from '../components/Description';
import Experience from '../components/Experience';
import SlidingImages from '../components/SlidingImages';
import Contact from '../components/Contact';
import Preloader from '../components/Preloader';
import { AnimatePresence } from 'framer-motion';
import type LocomotiveScrollType from 'locomotive-scroll'; // ✅ import the type
import { registerScroll } from '../common/smoothScroll';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<LocomotiveScrollType | null>(null); // ✅ type-safe ref

  useEffect(() => {
    // Unlock interactivity on a fixed timer that starts immediately — do NOT
    // stack it behind the locomotive-scroll dynamic import, which used to delay
    // the whole intro by the chunk's download/parse time.
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000);

    // Initialize smooth scroll in parallel; don't block the unlock on it.
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      scrollRef.current = new LocomotiveScroll();
      registerScroll(scrollRef.current); // expose for the nav menu's smooth-scroll
    })();

    return () => {
      clearTimeout(timer);
      scrollRef.current?.destroy?.();
      registerScroll(null);
    };
  }, []);

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <Experience />
      <Projects />
      <SlidingImages />
      <Contact />
    </main>
  );
}
