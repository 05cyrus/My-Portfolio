'use client';
import styles from './style.module.css';
import { useState } from 'react';
import Project from './Pcomponents/Project/Project';
import Modal from './Pcomponents/Modal/Modal';
import ProjectDetail from './Pcomponents/ProjectDetail/ProjectDetail';
import { motion, AnimatePresence } from 'framer-motion';
import Rounded from '../../common/RoundedButton';
import projects from './data';

  export default function Projects() {
    const [modal, setModal] = useState({active: false, index: 0})
    const [detailIndex, setDetailIndex] = useState(null)

    const openDetail = (index) => {
      // hide the hover-follow preview while the case study is open
      setModal({active: false, index})
      setDetailIndex(index)
    }

    return (
    <main id="work" className={styles.main}>
      <div className={styles.body}>
        <motion.h1 className={styles.h1}>Recent work</motion.h1>
        {
          projects.map( (project, index) => {
            return <Project index={index} title={project.title} subtitle={project.subtitle} setModal={setModal} onOpen={openDetail} key={index}/>
          })
        }
      <div className={styles.moreWorkSpacing}>
        <Rounded>
          <p>More work</p>
        </Rounded>
      </div>
      </div>
      <Modal modal={modal} projects={projects}/>

      <AnimatePresence mode="wait">
        {detailIndex !== null && (
          <ProjectDetail
            project={projects[detailIndex]}
            onClose={() => setDetailIndex(null)}
          />
        )}
      </AnimatePresence>
    </main>
    )
  }