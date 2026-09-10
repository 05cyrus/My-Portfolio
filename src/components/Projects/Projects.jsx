'use client';
import styles from './style.module.css';
import { useState } from 'react';
import Project from './Pcomponents/Project/Project';
import Modal from './Pcomponents/Modal/Modal';
import ProjectDetail from './Pcomponents/ProjectDetail/ProjectDetail';
import { motion, AnimatePresence } from 'framer-motion';
import Rounded from '../../common/RoundedButton';
import projects, { FEATURED_COUNT } from './data';

  export default function Projects() {
    const [modal, setModal] = useState({active: false, index: 0})
    const [detailIndex, setDetailIndex] = useState(null)

    // The home page shows a curated opening set - half professional platform
    // work, half self-directed projects - rather than every case study. The
    // full list lives on /work. Modal and rows must share the SAME array or
    // the hover-preview slider lands on the wrong image.
    const featured = projects.slice(0, FEATURED_COUNT)

    const openDetail = (index) => {
      // hide the hover-follow preview while the case study is open
      setModal({active: false, index})
      setDetailIndex(index)
    }

    return (
    <main id="work" className={styles.main}>
      <div className={styles.body}>
        <motion.h1 className={styles.h1}>Selected work</motion.h1>
        {
          featured.map( (project, index) => {
            return <Project index={index} title={project.title} subtitle={project.subtitle} setModal={setModal} onOpen={openDetail} key={index}/>
          })
        }
      <div className={styles.moreWorkSpacing}>
        <a
          href="/work"
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          <Rounded>
            <p>All work</p>
          </Rounded>
        </a>
      </div>
      </div>
      <Modal modal={modal} projects={featured}/>

      <AnimatePresence mode="wait">
        {detailIndex !== null && (
          <ProjectDetail
            project={featured[detailIndex]}
            onClose={() => setDetailIndex(null)}
          />
        )}
      </AnimatePresence>
    </main>
    )
  }