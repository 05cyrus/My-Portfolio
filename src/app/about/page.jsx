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
    title: 'Full-Stack Product Development',
    text: 'React 19, Next.js App Router and TypeScript front ends over PHP or Node service layers, with MySQL and PostgreSQL behind them. Features taken from data and API design through development, testing and release.',
  },
  {
    number: '02',
    title: 'APIs & Integrations',
    text: 'REST API design with idempotent processing, audit logging and configurable retry; GraphQL; OAuth 1.0a request signing; asynchronous message-queue jobs; and third-party payment, analytics and notification integrations.',
  },
  {
    number: '03',
    title: 'Mobile & Offline-First Apps',
    text: 'React Native on iOS and Android with typed navigation, Apollo/GraphQL and Redux Toolkit - plus installable PWAs built on service workers, IndexedDB and repository-seam data layers that keep working without a network.',
  },
  {
    number: '04',
    title: 'Debugging, Performance & Reliability',
    text: 'Evidence-led root-cause analysis on live systems, query-plan and indexing work, synchronous-to-asynchronous conversions, Playwright and PHPUnit test harnesses, accessibility audits, and security and standards remediation.',
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
  'Python Pro Bootcamp - Udemy',
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
            I build software that has to survive production - and I own problems
            until they are actually fixed, not just closed.
          </h1>
          <div className={styles.heroAside}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="currentColor"/>
            </svg>
            <p>
              Full-stack developer at 18th Digitech with a B.Tech in Computer
              Science. React, TypeScript, Next.js and React Native on the front;
              PHP service layers, REST and GraphQL APIs and MySQL behind them.
              My professional work is mostly large-scale e-commerce for brands
              like Mufti, Forever New, Joyalukkas and Asics - my own projects
              are deliberately somewhere else entirely.
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

      <section className={styles.story}>
        <Reveal>
          <h3 className={styles.sectionLabel}>How I got here</h3>
        </Reveal>
        <div className={styles.storyBody}>
          <Reveal delay={0.05}>
            <p>
              I came in the ordinary way - a B.Tech in Computer Science, C++ and
              data structures, then WordPress sites for an NGO while I was still
              studying. My first full-time role put me on large e-commerce
              platforms, which turned out to be an unreasonably good place to
              learn engineering rather than just frameworks. Production does not
              forgive you: a stale index takes 2,737 products off a storefront, a
              synchronous export dies behind a CDN at 385,000 rows, a plugin
              quietly writes malicious code into a live database. I learned to
              reason from evidence instead of guesses, to design a feature so the
              next change costs one class and one config line, and to prove a fix
              before I ship it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              The other half of my time goes somewhere else on purpose. Around
              forty repositories: an offline-first healthcare PWA rebuilt from a
              dead hackathon codebase into React 19 and TypeScript, with 131 unit
              tests and an accessibility audit running in CI; two multiplayer
              browser games with WebRTC peer networking, deterministic simulation
              and an entity-component-system architecture; a Next.js meal tracker
              that calls the Claude API for nutrition estimates; a React, Express
              and PostgreSQL app; a Chrome extension on Manifest V3; a
              convolutional network in TensorFlow that identifies medicinal
              leaves. None of it is my day job, which is exactly the point - and
              the React Native and GraphQL work I do professionally started as
              curiosity in that column first.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>
              What I enjoy most is the diagnosis. The bug three people have
              already looked at. The feature that works on the website and fails
              silently on the mobile API. The performance number nobody has
              actually measured. Getting something from &quot;it is broken and we
              do not know why&quot; to a written explanation with evidence, and
              then to a fix that is smaller than everyone expected, is the part of
              this job I would do for free. I am looking to keep doing it on
              modern stacks - full-stack product work, APIs and mobile - with
              people who care whether the thing is actually correct.
            </p>
          </Reveal>
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
