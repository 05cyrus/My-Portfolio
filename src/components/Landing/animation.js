import { useEffect, useRef, useState } from 'react';

const TextPressure = ({
  text = 'Compressa',
  // Font is loaded/self-hosted by the parent via next/font and passed in here.
  fontFamily = 'sans-serif',

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',

  minFontSize = 24,

}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  // rAF loop control: only run while there is something to animate (mouse
  // catching up) and while the heading is on screen — otherwise it thrashes
  // layout on the main thread every frame for no visible change.
  const rafRef = useRef(null);
  const runningRef = useRef(false);
  const visibleRef = useRef(true);
  const startRef = useRef(() => {});

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split('');

  const dist = (a, b) => {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
      startRef.current(); // wake the animation loop on input
    };
    const handleTouchMove = (e) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
      startRef.current();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Initialize mouse near center of container if it exists
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    // Pause the loop entirely while the heading is scrolled off screen.
    let observer;
    if (containerRef.current && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) startRef.current();
        else if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          runningRef.current = false;
        }
      });
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      observer?.disconnect();
    };
  }, []);

  const setSize = () => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  };

  useEffect(() => {
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
    // eslint-disable-next-line
  }, [scale, text]);

  useEffect(() => {
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        // Batch ALL layout reads first, then ALL writes — this collapses the
        // former read-after-write reflow per character into a single layout.
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        const spans = spansRef.current;
        const rects = spans.map((span) => (span ? span.getBoundingClientRect() : null));

        const getAttr = (distance, minVal, maxVal) => {
          const val = maxVal - Math.abs((maxVal * distance) / maxDist);
          return Math.max(minVal, val + minVal);
        };

        for (let i = 0; i < spans.length; i++) {
          const span = spans[i];
          const rect = rects[i];
          if (!span || !rect) continue;

          const charCenter = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha ? getAttr(d, 0, 1).toFixed(2) : 1;

          span.style.opacity = alphaVal;
          span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        }
      }

      // Idle-stop: once the eased cursor has caught up there is nothing left to
      // animate. Input handlers / the visibility observer restart the loop.
      const dx = cursorRef.current.x - mouseRef.current.x;
      const dy = cursorRef.current.y - mouseRef.current.y;
      if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) {
        runningRef.current = false;
        return;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    const start = () => {
      if (runningRef.current || !visibleRef.current) return;
      runningRef.current = true;
      rafRef.current = requestAnimationFrame(animate);
    };
    startRef.current = start;

    start(); // run at least one pass to set the resting state

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      runningRef.current = false;
    };
  }, [width, weight, italic, alpha, chars.length]);

  const dynamicClassName = [className, flex ? 'flex' : '', stroke ? 'stroke' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    >
      <style>{`
        /* If flex=true => space out each character span */
        .flex {
          display: flex;
          justify-content: space-between;
        }

        /* Stroke class toggles "stroke" effect on each character */
        .stroke span {
          position: relative;
          color: ${textColor}; /* normal text color */
        }
        /* The stroke layer sits behind with text-stroke */
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          /* If you'd like to shift the stroke up/down, you can add transform here */
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        /* If stroke=false => no stroke class => normal text color */
        .text-pressure-title {
          color: ${textColor};
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize: fontSize,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 100,
          width: '100%',
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={(el) => (spansRef.current[i] = el)}
            data-char={char}
            style={{
              display: 'inline-block',
              color: stroke ? undefined : textColor
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
