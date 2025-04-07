'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './page.module.scss';
import Landing from '../components/Landing';
import Projects from '../components/Projects/Projects';
import Description from '../components/Description';
import SlidingImages from '../components/SlidingImages';
import Contact from '../components/Contact';
import Preloader from '../components/Preloader';
import { AnimatePresence } from 'framer-motion';
import type LocomotiveScrollType from 'locomotive-scroll'; // ✅ import the type

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef<LocomotiveScrollType | null>(null); // ✅ type-safe ref

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      scrollRef.current = new LocomotiveScroll();

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default';
        window.scrollTo(0, 0);
      }, 2000);
    })();
  }, []);

  return (
    <main className={styles.main}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <Projects />
      <SlidingImages />
      <Contact />
    </main>
  );
}
