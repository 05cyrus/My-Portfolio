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

// Full client list from the all-time timesheet data. `detail` points into the
// case-study array (Projects/data.js) for rows that open the full write-up.
const work = [
  { client: 'Forever New', location: 'Melbourne, Australia', services: 'Adobe Commerce · Storefront Engineering', year: '2026', src: 'forevernew.webp', color: '#2E2A3F' },
  { client: 'PriMedEq', location: 'Bengaluru, India', services: 'Magento 2.4.8 Migration · PHP 8.4', year: '2026', src: 'primedeq.webp', color: '#12343B', detail: 1 },
  { client: 'Order Integration API', location: 'New Delhi, India', services: 'Magento 2 REST · Service Contracts', year: '2026', src: 'orderapi.webp', color: '#141516', detail: 2 },
  { client: 'Joyalukkas', location: 'Thrissur, India', services: 'Adobe Commerce · INTL Storefronts', year: '2026', src: 'joyalukkas.webp', color: '#3A2A14' },
  { client: 'Asics', location: 'Gurugram, India', services: 'Adobe Commerce · Storefront Support', year: '2026', src: 'asics.webp', color: '#1A2A34' },
  { client: "Parkinson's Therapy", location: 'New Delhi, India', services: 'React 19 · Healthcare PWA', year: '2026', src: 'parkinsons.webp', color: '#EFE8D3', detail: 5 },
  { client: 'Mufti Jeans', location: 'Mumbai, India', services: 'Adobe Commerce · Product Architecture', year: '2025', src: 'mufti.webp', color: '#1F2A44', detail: 0 },
  { client: 'TTK Prestige', location: 'Bengaluru, India', services: 'Magento 2 · Bulk Review APIs', year: '2025', src: 'ttkprestige.webp', color: '#232D3A' },
  { client: 'Butterfly', location: 'Chennai, India', services: 'GA4 · E-commerce Analytics', year: '2025', src: 'butterfly.webp', color: '#3A2634', detail: 4 },
  { client: 'Charak Pharma', location: 'Mumbai, India', services: 'WordPress · Security Forensics', year: '2025', src: 'charak.webp', color: '#1D3A2F', detail: 3 },
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
          Building next level
          <br />
          commerce experiences
          <sup>({work.length})</sup>
        </h1>
      </section>

      <section className={styles.list}>
        <div className={styles.listHeader}>
          <span>Client</span>
          <span>Location</span>
          <span>Services</span>
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
              <p>More work</p>
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
