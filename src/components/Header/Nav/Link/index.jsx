import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { slide, scale } from '../../animation';
import { scrollToSection } from '../../../../common/smoothScroll';

export default function Index({data, isActive, setSelectedIndicator, closeMenu}) {

    const { title, href, index} = data;

    const handleClick = (e) => {
      e.preventDefault();
      scrollToSection(href); // href is a section anchor, e.g. "#work"
      closeMenu?.();
    };

    return (
      <motion.div
        className={styles.link}
        onMouseEnter={() => {setSelectedIndicator(href)}}
        custom={index}
        variants={slide}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <motion.div
          variants={scale}
          animate={isActive ? "open" : "closed"}
          className={styles.indicator}>
        </motion.div>
        <a href={href} onClick={handleClick}>{title}</a>
      </motion.div>
    )
}
