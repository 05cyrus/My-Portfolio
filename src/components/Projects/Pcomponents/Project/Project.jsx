// Project.jsx
'use client';
import React from 'react';
import styles from './style.module.css';

// rename the function so it does not collide with "index"
export default function Project({ index, title, setModal }) {
  return (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      className={styles.project}
    >
      <h2>{title}</h2>
      <p>Design & Development</p>
    </div>
  );
}
