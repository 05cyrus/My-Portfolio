'use client';
import { useEffect, useRef, useState } from 'react';
import { registerScroll } from './smoothScroll';

// Shared page-mount sequence used by every route: lock the page behind the
// intro curtain for `delay` ms, boot locomotive-scroll in parallel (never
// blocking the unlock on the chunk download), and clean both up on unmount.
export default function usePageLoad(delay = 1400) {
  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    document.body.style.cursor = 'wait';
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, delay);

    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      scrollRef.current = new LocomotiveScroll();
      registerScroll(scrollRef.current);
    })();

    return () => {
      clearTimeout(timer);
      document.body.style.cursor = 'default';
      scrollRef.current?.destroy?.();
      registerScroll(null);
    };
  }, [delay]);

  return isLoading;
}
