'use client';
import styles from './style.module.scss';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '15+', label: 'Brand platforms shipped & maintained' },
  { value: '900+', label: 'Engineering hours logged' },
  { value: '20+', label: 'Legacy module families modernised' },
  { value: '5', label: 'Countries of INTL storefronts tested' },
];

const roles = [
  {
    company: '18th Digitech',
    title: 'Commerce Developer',
    period: 'Jul 2025 — Present',
    points: [
      'Migrated a multi-vendor Magento marketplace (PriMedEq) to Magento 2.4.8 / PHP 8.4 — Webkul, ElasticSuite & OpenSearch, payment gateways, and 100% of the legacy module codebase modernised with Rector.',
      'Engineered a ~100-file REST order-integration module with Service Contracts, idempotent processing, OAuth 1.0a, retry via cron/CLI and a full admin audit log.',
      'Built custom Magento modules — bulk review APIs (MoEngage), colour-group swatches with variant-based pricing, and a DPDPA consent-compliance module with audit trails.',
      'Recovered a compromised WordPress platform: traced and removed malicious code injections, upgraded PHP 7.4 → 8.4, and audited every plugin.',
      'Instrumented GA4 e-commerce analytics end to end — 9+ data layer events from add_to_cart to add_payment_info.',
    ],
  },
  {
    company: 'Naturemonks (NGO)',
    title: 'Web Developer',
    period: 'Nov 2024 — Mar 2025',
    points: [
      'Developed and maintained WordPress websites with a focus on performance, accessibility and mobile responsiveness.',
      'Customised themes and plugins and resolved frontend–backend integration issues to improve site stability.',
    ],
  },
];

const skills = [
  'C++', 'Python', 'JavaScript', 'PHP', 'Node.js', 'Adobe Commerce (Magento 2)',
  'WordPress', 'React.js', 'HTML/CSS', 'Bootstrap', 'jQuery', 'MySQL',
  'PostgreSQL', 'MongoDB', 'Figma', 'Uipath', 'REST APIs', 'GraphQL',
  'Data Structures and Algorithms', 'DBMS', 'OOPS',
];

export default function Experience() {
  const container = useRef(null);
  const isInView = useInView(container, { once: true, margin: '-10% 0px' });

  return (
    <section id="experience" ref={container} className={styles.experience}>
      <div className={styles.body}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h1>

        <div className={styles.stats}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className={styles.stat}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
            >
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {roles.map((role, i) => (
          <motion.div
            key={i}
            className={styles.role}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
          >
            <div className={styles.roleHeader}>
              <h2>{role.company}</h2>
              <div className={styles.roleMeta}>
                <p>{role.title}</p>
                <span>{role.period}</span>
              </div>
            </div>
            <ul>
              {role.points.map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div
          className={styles.skills}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {skills.map((skill, i) => (
            <span key={i}>{skill}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
