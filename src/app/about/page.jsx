'use client';
import Image from 'next/image';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import styles from './style.module.scss';
import Preloader from '../../components/Preloader';
import Contact from '../../components/Contact';
import usePageLoad from '../../common/usePageLoad';

const services = [
  {
    number: '01',
    title: 'Commerce Development',
    text: 'Custom Adobe Commerce (Magento 2) modules, configurable product architecture with dynamic swatches and variant-based pricing, and full platform migrations - up to Magento 2.4.8 on PHP 8.4 - built to stay stable in production.',
  },
  {
    number: '02',
    title: 'APIs & Integrations',
    text: 'Secure REST APIs on Magento Service Contracts with OAuth, bulk data and review APIs, idempotent order-lifecycle integrations with full audit logging, and GA4 data-layer instrumentation across the entire purchase journey.',
  },
  {
    number: '03',
    title: 'The full package',
    text: 'WordPress security forensics and recovery, React 19 + TypeScript applications, accessibility-first offline PWAs and performance work - end-to-end ownership from investigation and debugging to production release.',
  },
];

const education = [
  { name: 'Inderprastha Engineering College - B.Tech, Computer Science', period: '2021 - 2025' },
  { name: 'Vivekanand School, Delhi - Senior Secondary (90%)', period: '2019 - 2021' },
  { name: 'St. Thomas School, Uttar Pradesh - Secondary (90.2%)', period: '2019' },
];

const certifications = [
  'ReactJS Course - Infosys Springboard',
  'Data Analytics Essentials - Cisco Networking Academy',
  'Database Foundations - Oracle Academy',
  'Generative AI - Google Cloud & Coursera',
];

function Reveal({ children, delay = 0, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  const isLoading = usePageLoad(1400);

  return (
    <main className={styles.about}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader title="About" />}
      </AnimatePresence>

      <section className={styles.hero}>
        <div className={styles.heroTop}>
          <h1>
            I help e-commerce brands run storefronts that stay fast, stable and
            secure - and I own problems until they are fixed.
          </h1>
          <div className={styles.heroAside}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="currentColor"/>
            </svg>
            <p>
              Commerce Developer at 18th Digitech and a B.Tech in Computer
              Science. I work across the whole commerce stack - Adobe Commerce
              (Magento 2), PHP, WordPress, React and MySQL - for brands like
              Mufti, Forever New, Joyalukkas, TTK Prestige and Asics.
            </p>
          </div>
        </div>
        <Reveal className={styles.portrait}>
          <Image
            src="/images/me.png"
            alt="Sumit Gusain"
            fill={true}
            sizes="(max-width: 768px) 80vw, 450px"
          />
        </Reveal>
      </section>

      <section className={styles.services}>
        <Reveal>
          <h3 className={styles.sectionLabel}>I can help you with ...</h3>
        </Reveal>
        <div className={styles.serviceGrid}>
          {services.map((service, i) => (
            <Reveal key={service.number} delay={0.1 * i} className={styles.service}>
              <p className={styles.number}>{service.number}</p>
              <h2>{service.title}</h2>
              <p className={styles.serviceText}>{service.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className={styles.background}>
        <div className={styles.backgroundCol}>
          <Reveal>
            <h3 className={styles.sectionLabel}>Education</h3>
            <ul>
              {education.map((item) => (
                <li key={item.name}>
                  <span>{item.name}</span>
                  <span className={styles.period}>{item.period}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className={styles.backgroundCol}>
          <Reveal delay={0.1}>
            <h3 className={styles.sectionLabel}>Certifications</h3>
            <ul>
              {certifications.map((item) => (
                <li key={item}>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <Contact pull={0} />
    </main>
  );
}
