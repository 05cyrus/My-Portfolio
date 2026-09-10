'use client';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';
import Preloader from '../../components/Preloader';
import Contact from '../../components/Contact';
import Modal from '../../components/Projects/Pcomponents/Modal/Modal';
import ProjectDetail from '../../components/Projects/Pcomponents/ProjectDetail/ProjectDetail';
import Rounded from '../../common/RoundedButton';
import caseStudies from '../../components/Projects/data';
import usePageLoad from '../../common/usePageLoad';

// Every project worth opening, professional and self-directed together, newest
// first. `detail` is an index into the case-study array (Projects/data.js) for
// rows that open a full write-up - keep the two in sync when either changes.
// "Context" replaces the old Client/Location split so personal projects belong
// in the same table instead of being relegated to a GitHub link.
const work = [
  { client: 'Mufti Mobile App', location: '18th Digitech · Production', services: 'React Native · TypeScript · GraphQL', year: '2026', src: 'muftiapp.webp', color: '#101A2E', detail: 0 },
  { client: 'HideOut', location: 'Personal project', services: 'Svelte 5 · Babylon.js · WebRTC', year: '2026', src: 'hideout.webp', color: '#14202B', detail: 3 },
  { client: 'Mealoria', location: 'Personal project', services: 'Next.js · Firebase · Claude API', year: '2026', src: 'mealoria.webp', color: '#F0EAE0', detail: 4 },
  { client: 'Aerocade', location: 'Personal project', services: 'Phaser 3 · WebRTC · TypeScript', year: '2026', src: 'aerocade.webp', color: '#1B1A2E', detail: 7 },
  { client: 'SizeWise', location: 'Personal project', services: 'TypeScript · Chrome Manifest V3', year: '2026', src: 'sizewise.webp', color: '#1E2430', detail: 12 },
  { client: 'Order Integration API', location: '18th Digitech · Production', services: 'REST API · OAuth 1.0a · Idempotency', year: '2026', src: 'orderapi.webp', color: '#141516', detail: 2 },
  { client: "Parkinson's Therapy", location: 'Personal project', services: 'React 19 · TypeScript · Offline PWA', year: '2026', src: 'parkinsons.webp', color: '#EFE8D3', detail: 1 },
  { client: 'PriMedEq', location: '18th Digitech · Production', services: 'Platform Migration · PHP 8.4', year: '2026', src: 'primedeq.webp', color: '#12343B', detail: 5 },
  { client: 'Duet', location: 'Personal project', services: 'React · Firebase · Firestore Rules', year: '2026', src: 'duet.webp', color: '#2B1A28', detail: 11 },
  { client: 'Forever New', location: '18th Digitech · Melbourne, AU', services: 'Storefront Engineering · Adobe Commerce', year: '2026', src: 'forevernew.webp', color: '#2E2A3F' },
  { client: 'Joyalukkas', location: '18th Digitech · Release QA', services: 'Multi-Country Web & Mobile Testing', year: '2026', src: 'joyalukkas.webp', color: '#3A2A14' },
  { client: 'Asics', location: '18th Digitech · Production', services: 'Storefront Support · Adobe Commerce', year: '2026', src: 'asics.webp', color: '#1A2A34' },
  { client: 'Mufti Jeans', location: '18th Digitech · Production', services: 'Storefront & Variant Architecture', year: '2025', src: 'mufti.webp', color: '#1F2A44', detail: 8 },
  { client: 'Notekeep', location: 'Personal project', services: 'React · Express · PostgreSQL', year: '2025', src: 'notekeep.webp', color: '#16261F', detail: 6 },
  { client: 'TTK Prestige', location: '18th Digitech · Production', services: 'Bulk Review APIs · WP Security Plugin', year: '2025', src: 'ttkprestige.webp', color: '#232D3A' },
  { client: 'Butterfly', location: '18th Digitech · Production', services: 'GA4 · E-commerce Data Layer', year: '2025', src: 'butterfly.webp', color: '#3A2634', detail: 9 },
  { client: 'Charak Pharma', location: '18th Digitech · Production', services: 'Security Forensics · Malware Recovery', year: '2025', src: 'charak.webp', color: '#1D3A2F', detail: 10 },
  { client: 'Leaf Identification', location: 'Smart India Hackathon', services: 'Python · TensorFlow · CNN', year: '2024', src: 'plantid.webp', color: '#17281C', detail: 13 },
];

export default function WorkPage() {
  const isLoading = usePageLoad(1400);
  const [modal, setModal] = useState({ active: false, index: 0 });
  const [detailIndex, setDetailIndex] = useState(null);

  const openRow = (row, index) => {
    if (row.detail == null) return;
    setModal({ active: false, index });
    setDetailIndex(row.detail);
  };

  return (
    <main className={styles.work}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader title="Work" />}
      </AnimatePresence>

      <section className={styles.hero}>
        <h1>
          Production platforms, apps
          <br />
          and things I build for myself
          <sup>({work.length})</sup>
        </h1>
      </section>

      <section className={styles.list}>
        <div className={styles.listHeader}>
          <span>Project</span>
          <span>Context</span>
          <span>Stack</span>
          <span>Year</span>
        </div>
        {work.map((row, index) => (
          <div
            key={row.client}
            className={`${styles.row} ${row.detail != null ? styles.rowClickable : ''}`}
            onMouseEnter={() => setModal({ active: true, index })}
            onMouseLeave={() => setModal({ active: false, index })}
            onClick={() => openRow(row, index)}
            role={row.detail != null ? 'button' : undefined}
            tabIndex={row.detail != null ? 0 : undefined}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openRow(row, index);
              }
            }}
          >
            <h2>{row.client}</h2>
            <p>{row.location}</p>
            <p>{row.services}</p>
            <p>{row.year}</p>
          </div>
        ))}
        <div className={styles.moreWork}>
          <a
            href="https://github.com/05cyrus"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'inherit', textDecoration: 'none' }}
          >
            <Rounded>
              <p>More on GitHub</p>
            </Rounded>
          </a>
        </div>
      </section>

      <Modal modal={modal} projects={work} />

      <AnimatePresence mode="wait">
        {detailIndex !== null && (
          <ProjectDetail
            project={caseStudies[detailIndex]}
            onClose={() => setDetailIndex(null)}
          />
        )}
      </AnimatePresence>

      <Contact pull={0} />
    </main>
  );
}
