'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './Nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);

    useEffect( () => {
      if(isActive) setIsActive(false)
    }, [pathname])

    useEffect( () => {
        gsap.registerPlugin(ScrollTrigger)
        const mm = gsap.matchMedia()

        // Desktop: burger hidden on the hero, slides in once you scroll past the
        // first screen. Wrapping this in matchMedia re-runs the setup whenever
        // the viewport crosses 768px, so it no longer stays broken when the page
        // first loads in a narrow / emulated viewport (the old innerWidth guard
        // only ran once on mount and never recovered).
        mm.add("(min-width: 769px)", () => {
            gsap.set(button.current, { scale: 0 })
            const tween = gsap.to(button.current, {
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 0,
                    end: window.innerHeight,
                    onLeave: () => gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }),
                    onEnterBack: () => {
                        gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" })
                        setIsActive(false)
                    }
                }
            })
            return () => {
                tween.scrollTrigger?.kill()
                tween.kill()
            }
        })

        // Mobile: always visible (CSS pins it too; this keeps GSAP's inline
        // transform in sync so it doesn't fight the stylesheet).
        mm.add("(max-width: 768px)", () => {
            gsap.set(button.current, { scale: 1 })
        })

        return () => mm.revert()
    }, [])

    // /work and /about sit on light backgrounds — flip the header text dark.
    const onLightPage = pathname === '/work' || pathname === '/about';

    return (
        <>
        <div ref={header} className={`${styles.header} ${onLightPage ? styles.dark : ''}`}>
            <Link href="/" className={styles.logoLink}>
                <div className={styles.logo}>
                    <p className={styles.copyright}>©</p>
                    <div className={styles.name}>
                        <p className={styles.codeBy}>Code by</p>
                        <p className={styles.sumit}>Sumit</p>
                        <p className={styles.gusain}>Gusain</p>
                    </div>
                </div>
            </Link>
            <div className={styles.nav}>
                <Magnetic>
                    <div className={styles.el}>
                        <Link href="/work">Work</Link>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el}>
                        <Link href="/about">About</Link>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el}>
                        <Link href="/contact">Contact</Link>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
            </div>
        </div>
        <div ref={button} className={styles.headerButtonContainer}>
            <Rounded onClick={() => {setIsActive(!isActive)}} className={`${styles.button}`}>
                <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
            </Rounded>
        </div>
        <AnimatePresence mode="wait">
            {isActive && <Nav closeMenu={() => setIsActive(false)} />}
        </AnimatePresence>
        </>
    )
}
