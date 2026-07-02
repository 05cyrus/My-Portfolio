'use client';
import styles from './style.module.css';
import { useState } from 'react';
import Project from './Pcomponents/Project/Project'; 
import Modal from './Pcomponents/Modal/Modal';     
import { motion } from 'framer-motion';
import Rounded from '../../common/RoundedButton';

const projects = [
    {
      title: "Zensya Tech",
      src: "zensya-tech.webp",
      color: "#000000"
    },
    {
      title: "Zensya Main",
      src: "zensya-main.webp",
      color: "#8C8C8C"
    },
    {
      title: "Parkinsons",
      src: "parkinsons.webp",
      color: "#EFE8D3"
    },
    {
      title: "FastAid",
      src: "fastaid.webp",
      color: "#706D63"
    }
  ]
  

  export default function Projects() {
    const [modal, setModal] = useState({active: false, index: 0})
    return (
    <main id="work" className={styles.main}>
      <div className={styles.body}>
        <motion.h1 className={styles.h1}>Recent work</motion.h1>
        {
          projects.map( (project, index) => {
            return <Project index={index} title={project.title} setModal={setModal} key={index}/>
          })
        }
      <div className={styles.moreWorkSpacing}>
        <Rounded>
          <p>More work</p>
        </Rounded>
      </div>
      </div>
      <Modal modal={modal} projects={projects}/>

    </main>
    )
  }