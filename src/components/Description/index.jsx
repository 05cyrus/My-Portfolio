import styles from './style.module.scss';
import Link from 'next/link';
import { useInView, motion } from 'framer-motion';
import { useRef } from 'react';
import { slideUp, opacity } from './anim';
import Rounded from '../../common/RoundedButton';

export default function Index() {
  const phrase =
    'From platform migrations to custom modules and security recovery, I build e-commerce that holds up. Commerce Developer at 18th Digitech, shipping Magento 2 and WordPress storefronts for Mufti, TTK Prestige, Joyalukkas and Asics.';

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
          From custom module engineering and REST integrations to full platform migrations,
          security forensics and analytics — I work across the whole commerce stack: Adobe
          Commerce (Magento 2), PHP, JavaScript, React and MySQL.
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
