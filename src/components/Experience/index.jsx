'use client';
import styles from './style.module.scss';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const stats = [
  { value: '900+', label: 'Hours logged across client projects' },
  { value: '15', label: 'Client platforms shipped and supported' },
  { value: '13', label: 'Backend modules & services designed end to end' },
  { value: '40+', label: 'Personal & academic repositories on GitHub' },
];

// Bullets are grouped by engineering theme rather than listed per task, and
// ordered by what they demonstrate - API design, mobile, architecture and
// performance first, platform modernisation last. The underlying work is
// large-scale e-commerce; that's the context, not the whole skill set.
const roles = [
  {
    company: '18th Digitech',
    title: 'Full-Stack Developer',
    period: 'Jul 2025 - Present',
    summary:
      'Agency building and supporting large web platforms and mobile apps for enterprise retail and marketplace brands - React Native and GraphQL on the app side, PHP service layers and Adobe Commerce on the platform side.',
    points: [
      'API engineering - designed and shipped a ~100-file REST integration service exposing order create, status, invoice, shipment and tracking, with idempotent processing, request/response audit logging, configurable retry via cron and CLI, and an admin log UI; secured it with OAuth 1.0a (HMAC-SHA256) after diagnosing that the platform\'s opaque tokens were no longer accepted as Bearer credentials.',
      'Mobile & GraphQL - ship features to a production React Native + TypeScript app on iOS and Android, and extended a server-side merchandising feature to it over GraphQL by refactoring three request-shaped seams behind interfaces and extracting shared eligibility and ordering logic into services so web and mobile could not diverge; proved page 1 + page 2 equalled a single 40-item call with no duplicates or omissions.',
      'Frontend - built customer-facing storefront features in JavaScript, jQuery and Knockout.js, including a colour and size variant selector that swaps product imagery, recomputes variant pricing and rewrites the canonical URL on selection, and instrumented 9+ GA4 e-commerce data-layer events across the customer journey to restore accurate conversion tracking.',
      'Architecture - designed features for extension rather than modification: a validation rule engine on the Strategy and Composite patterns where a new rule costs one class and one config line, and a monitoring provider abstraction where adding a monitored entity is configuration, proven by wiring in a third-party data source with no new PHP written.',
      'Performance & databases - converted a reporting feature from a request-blocking synchronous export to an asynchronous message-queue job after measuring 15-20 minutes per 100k rows, where a ~385k-row production export would have been killed mid-write behind the CDN; the request now returns immediately and the UI polls status, with a cron reaper closing out abandoned runs. Analysed query plans with EXPLAIN and documented missing indexes rather than guessing.',
      'Debugging & production support - resolved high-severity incidents through evidence-led root-cause analysis: a total storefront outage traced to an hourly sync job whose query excluded the environment\'s only stocked inventory source (2,737 products wrongly out of stock; category pages restored from zero to the correct 1,199 after ruling out six other causes), frozen scheduled indexers on a server with no cron installed, a filesystem ownership asymmetry blocking generated code across 597 directories, and a checkout tax regression caused by stale per-item state on virtual carts.',
      'Testing & reliability - backed releases with PHPUnit unit tests, Playwright end-to-end harnesses, Postman API suites and documented manual regression checklists, and ran release testing for a jewellery retailer\'s India and international web and mobile apps across iOS, Android and web in five countries (116 hours logged).',
      'Security & compliance - remediated a security and coding-standards audit across an estate of 59 modules: removed a redundant OTP pre-check that had left the existing brute-force lockout unreachable, replaced plaintext OTP, phone and login-token logging with truncated hashes, activated seven dead catch blocks caused by a missing import, and cleared 128 PSR-12 violations proven behaviourally inert by diffing PHP token streams; also built a DPDPA consent module recording consent text, IP and source across four user-facing forms.',
      'Platform modernisation - led a full Magento 2.4.5 → 2.4.8 / PHP 7.4 → 8.4 migration completing 100% of a legacy module estate (automating refactors with Rector, replacing removed Zend APIs with Laminas, migrating an admin tree from ExtJS to jQuery/jsTree), plus a WordPress core, plugin and theme upgrade in which malicious script injections were traced to a specific plugin and cleared from both codebase and database.',
    ],
  },
  {
    company: 'Naturemonks (NGO)',
    title: 'Web Developer',
    period: 'Nov 2024 - Mar 2025',
    summary: 'First professional development role, alongside my final year of engineering.',
    points: [
      'Developed and maintained WordPress websites with a focus on performance, accessibility and mobile responsiveness.',
      'Customised themes and plugins and resolved frontend-backend integration issues to improve site stability.',
    ],
  },
];

// Grouped by where the work actually happens, with an honest depth label per
// group - not one flat list where UiPath and React look equally load-bearing.
const skillGroups = [
  {
    title: 'Frontend',
    level: 'Strong',
    items: [
      'React 19', 'Next.js (App Router)', 'TypeScript', 'JavaScript (ES6+)', 'Tailwind CSS',
      'SCSS & CSS Modules', 'Framer Motion', 'GSAP', 'Vite', 'Accessible UI (WCAG, axe)',
      'jQuery', 'Knockout.js', 'Bootstrap',
    ],
  },
  {
    title: 'Backend & APIs',
    level: 'Strong',
    items: [
      'PHP 8', 'REST API design', 'GraphQL', 'Service layers & dependency injection',
      'OAuth 1.0a (HMAC-SHA256)', 'Message queues', 'Cron & CLI services',
      'Design patterns (Strategy, Composite, Repository)', 'Node.js & Express',
    ],
  },
  {
    title: 'Databases',
    level: 'Strong',
    items: [
      'MySQL', 'Schema design', 'Complex joins', 'Indexing & query plans (EXPLAIN)',
      'PostgreSQL', 'IndexedDB', 'Firestore', 'SQLite', 'OpenSearch',
    ],
  },
  {
    title: 'Mobile & PWA',
    level: 'Project experience',
    items: [
      'React Native (CLI & Expo)', 'React Navigation', 'Redux Toolkit', 'Apollo Client',
      'Service workers', 'Offline-first architecture', 'Push notifications (FCM)',
    ],
  },
  {
    title: 'Testing & Quality',
    level: 'Project experience',
    items: [
      'Playwright (e2e)', 'PHPUnit', 'Vitest & Jest', 'Postman', 'axe accessibility audits',
      'Contract tests', 'Regression suites', 'PSR-12 & phpcs',
    ],
  },
  {
    title: 'Cloud, DevOps & Tools',
    level: 'Project experience',
    items: [
      'Git', 'GitHub Actions (CI)', 'Linux', 'Firebase (Auth, Firestore, Storage)', 'Vercel',
      'Cloudflare Workers', 'Composer', 'Rector', 'Fastly & Varnish caching', 'Figma',
    ],
  },
  {
    title: 'E-commerce Platforms',
    level: 'Strong',
    items: [
      'Adobe Commerce (Magento 2)', 'Custom modules & service contracts', 'Magento GraphQL & MSI',
      'WordPress (themes, plugins, ACF)', 'GA4 e-commerce data layer',
    ],
  },
  {
    title: 'AI, Data & Fundamentals',
    level: 'Exploring / academic',
    items: [
      'Claude API integration', 'AI-assisted development', 'Python (Pandas, NumPy)',
      'scikit-learn', 'TensorFlow & Keras (CNNs)', 'UiPath', 'C++',
      'Data structures & algorithms', 'OOP & DBMS',
    ],
  },
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
            {role.summary && <p className={styles.roleSummary}>{role.summary}</p>}
            <ul>
              {role.points.map((point, j) => (
                <li key={j}>{point}</li>
              ))}
            </ul>
          </motion.div>
        ))}

        <motion.div
          className={styles.skillsBlock}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className={styles.skillsHeader}>
            <h3>Technical skills</h3>
            <p>Grouped by where I actually work. Labels mark depth, not enthusiasm.</p>
          </div>
          <div className={styles.skillGrid}>
            {skillGroups.map((group) => (
              <div key={group.title} className={styles.skillGroup}>
                <div className={styles.skillGroupHeader}>
                  <h4>{group.title}</h4>
                  <span className={styles.level} data-level={group.level}>
                    {group.level}
                  </span>
                </div>
                <div className={styles.skills}>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
