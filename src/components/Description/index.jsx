import styles from './style.module.scss';
import Link from 'next/link';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './anim';
import Rounded from '../../common/RoundedButton';

export default function Index() {
  const phrase =
    'I build production web applications, mobile apps and the APIs behind them. Nearly two years shipping to live platforms used by real customers - and a habit of building well outside that stack on my own time, from offline-first PWAs to real-time multiplayer engines.';

  const description = useRef(null);
  const isInView = useInView(description);

  return (
    <div id="about" ref={description} className={styles.description}>
      <div className={styles.body}>
        <p className={styles.animatedText}>
          {phrase.split(' ').map((word, index) => (
            <span key={index} className={styles.mask}>
              <motion.span
                variants={slideUp}
                custom={index}
                animate={isInView ? 'open' : 'closed'}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
        <motion.p
          variants={opacity}
          animate={isInView ? 'open' : 'closed'}
          className={styles.subtext}
        >
          Full-stack developer at 18th Digitech. React 19, Next.js, TypeScript and React
          Native on the front; PHP service layers, REST and GraphQL APIs, message queues and
          MySQL behind them. Most of my professional work is large-scale e-commerce - which is
          where I learned idempotency, query plans and what production actually does to your
          assumptions.
        </motion.p>
        <div data-scroll data-scroll-speed={0.01} className={styles.buttonContainer}>
          <Link href="/about" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Rounded className={styles.button}>
              <p>About me</p>
            </Rounded>
          </Link>
        </div>
      </div>
    </div>
  );
}
