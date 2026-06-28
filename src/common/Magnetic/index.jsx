// Magnetic.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Magnetic({ children }) {
  const magnetic = useRef(null);

  useEffect(() => {
    const xTo = gsap.quickTo(magnetic.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magnetic.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const el = magnetic.current;
    if (!el) return;

      // Skip magnetic effect on small screens
     if (window.innerWidth < 768) return;
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = el.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.1);
      yTo(y * 0.1);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={magnetic} style={{ display: 'inline-block' }}>
      {children}
    </div>
  );
}
