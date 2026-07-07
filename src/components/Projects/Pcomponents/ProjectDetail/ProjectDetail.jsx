'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './style.module.scss';

const backdropAnim = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.25, delay: 0.05 } },
};

const panelAnim = {
  initial: { y: 80, opacity: 0 },
  enter: { y: 0, opacity: 1, transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] } },
  exit: { y: 60, opacity: 0, transition: { duration: 0.3, ease: [0.32, 0, 0.67, 0] } },
};

export default function ProjectDetail({ project, onClose }) {
  // Lock page scrolling while the case study is open, close on Escape.
  // Also flags <body> so the mobile burger menu (a sibling tree with no
  // shared state) can hide itself instead of floating above the modal.
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.classList.add('project-modal-open');

    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);

    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      document.body.classList.remove('project-modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className={styles.backdrop}
      variants={backdropAnim}
      initial="initial"
      animate="enter"
      exit="exit"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* data-lenis-prevent keeps locomotive/lenis from hijacking wheel events,
          so the panel's own overflow scrolling works. */}
      <motion.div
        className={styles.panel}
        variants={panelAnim}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        <button className={styles.closeIcon} onClick={onClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <header className={styles.header}>
          <h2>{project.title}</h2>
          <p>{project.subtitle}</p>
        </header>

        <div className={styles.hero}>
          <Image
            src={`/images/${project.src}`}
            alt={project.title}
            width={1280}
            height={720}
            sizes="(max-width: 768px) 100vw, 720px"
          />
        </div>

        <section className={styles.section}>
          <h3>Overview</h3>
          {project.overview.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </section>

        <section className={styles.section}>
          <h3>My Contributions</h3>
          <ul>
            {project.contributions.map((point, i) => (
              <li key={i}>
                <span className={styles.check} aria-hidden="true">✓</span>
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h3>Tech Stack</h3>
          <div className={styles.tech}>
            {project.tech.map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </section>

        <footer className={styles.actions}>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.visit}>
              Visit Project
            </a>
          )}
          <button onClick={onClose} className={styles.close}>
            Close
          </button>
        </footer>
      </motion.div>
    </motion.div>
  );
}
