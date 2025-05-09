'use client';
import Image from 'next/image';
import styles from './style.module.css';
import { useRef, useEffect ,useState} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import TextPressure from './animation';


export default function Landing() {

    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    let direction = -1;

    useEffect( () => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: 0.25,
                start: 0,
                end: window.innerHeight,
            onUpdate: e => direction = e.direction * -1
          },
          x: "-500px",
        })
        requestAnimationFrame(animate);
    }, [])

    const animate = () => {
        if(xPercent < -100){
            xPercent = 0;
        } 
        else if(xPercent > 0){
            xPercent = -100;
        }
        gsap.set(firstText.current, {xPercent: xPercent})
        gsap.set(secondText.current, {xPercent: xPercent})
        requestAnimationFrame(animate);
        xPercent += 0.1 * direction;
    }
    const [bgImage, setBgImage] = useState("/images/bg1.png");

    useEffect(() => {
      const handleResize = () => {
        if (window.matchMedia('(max-width: 768px)').matches) {
          setBgImage("/images/bgsmall.png");
        } else {
          setBgImage("/images/bg1.png");
        }
      };
    
      handleResize(); // Check once on mount
      window.addEventListener('resize', handleResize); // Update on resize
    
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
  return (
    <main className={styles.main}>
      <Image 
        src={bgImage}
        fill={true}
        sizes="100vw"
        alt="background"
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Freelance Developer -</p>
          <p ref={secondText}>Freelance Developer -</p>
        </div>
      </div>
      
      <div className={styles.description}>
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
        </svg>
        <div style={styles.TextPressure}>
  <TextPressure
    text="Freelance Designer & Developer"
    flex={true}
    alpha={false}
    stroke={false}
    width={true}
    weight={true}
    italic={true}
    textColor="#ffffff"
    strokeColor="#ff0000"
    minFontSize={36}
  />
</div>
      </div>
    </main>
  )
}