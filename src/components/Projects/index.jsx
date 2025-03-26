'use client';
import styles from './style.module.css'
import { useState } from 'react';
import Project from './components/Project';
import Modal from './components/Modal';

const projects = [
  {
    title: "Zensya Tech",
    src: "zensya-tech.png",
    color: "#000000"
  },
  {
    title: "Zensya Main",
    src: "zensya-main.png",
    color: "#8C8C8C"
  },
  {
    title: "Parkinsons",
    src: "parkinsons.png",
    color: "#EFE8D3"
  },
  {
    title: "FastAid",
    src: "fastaid.png",
    color: "#706D63"
  }
]

export default function Home() {

  const [modal, setModal] = useState({active: false, index: 0})

  return (
  <main className={styles.main}>
    <div className={styles.body}>
      {
        projects.map( (project, index) => {
          return <Project index={index} title={project.title} setModal={setModal} key={index}/>
        })
      }
    </div>
    <Modal modal={modal} projects={projects}/>
  </main>
  )
}
