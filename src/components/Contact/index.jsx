import styles from './style.module.scss';
import Image from 'next/image';
import { useRef,useState,useEffect } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';
import Magnetic from '../../common/Magnetic';
import Rounded from '../../common/RoundedButton';

export default function index() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const x = useTransform(scrollYProgress, [0, 1], [0, 100])
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])
    const [time, setTime] = useState('');

    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
  
        // Convert to IST (Indian Standard Time)
        const options = {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
          timeZone: 'Asia/Kolkata',
        };
  
        const formattedTime = now.toLocaleTimeString('en-IN', options);
        setTime((formattedTime + ' IST').toUpperCase());
      };
  
      updateTime(); 
      const interval = setInterval(updateTime, 1000); 
  
      return () => clearInterval(interval);
    }, []);
    return (
        <motion.div style={{y}} ref={container} className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                        <div className={styles.imageContainer}>
                            <Image 
                            fill={true}
                            alt={"image"}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            src={`/images/profile.jpg`}
                            />
                        </div>
                        <h2>Let's work</h2>
                    </span>
                    <h2>together</h2>
                    <motion.div style={{x}} className={styles.buttonContainer}>
                    <Rounded  backgroundColor={"#334BD3"} className={styles.button}>
                            <p>Get in touch</p>
                        </Rounded>
                    </motion.div>
                    <motion.svg style={{rotate, scale: 2}} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
                    </motion.svg>
                </div>
                <div className={styles.nav}>
                        <Rounded className={styles.button}>
                            <p>sumitgusain5311@gmail.com</p>
                        </Rounded>
                        <Rounded className={styles.button}>
                            <p>+91 7982416604</p>
                        </Rounded>
                </div>
                <div className={styles.info}>
                    <div>
                        <span>
                            <h3>Version</h3>
                            <Magnetic>
                            <p>2025 © Edition</p>
                            </Magnetic>
                        </span>
                        <span>
 
                            <h3>Local Time</h3>
  
                            <Magnetic>
                            <p>{time}</p>
                            </Magnetic>
                        </span>
                    </div>
                    <div className={styles.socials}>
                        <span>
                            <h3>SOCIALS</h3>
                            <Magnetic>
                                <p>
                                <a
                                    href="https://www.instagram.com/sum.it____?igsh=MXViM3Q5cXdxOGFmMg%3D%3D&utm_source=qr"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                >
                                    Instagram
                                </a>
                                </p>
                            </Magnetic>
                        </span>
                            <Magnetic>
                                <p>
                                <a
                                    href="https://www.behance.net/deathbringer2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                >
                                    Behance
                                </a>
                                </p>
                            </Magnetic>
                            <Magnetic>
                                <p>
                                <a
                                    href="https://www.linkedin.com/in/sumitgusain05/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: 'inherit', textDecoration: 'none' }}
                                >
                                    LinkedIn
                                </a>
                                </p>
                            </Magnetic>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}