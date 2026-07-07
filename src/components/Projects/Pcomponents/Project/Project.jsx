// Project.jsx
'use client';
import React from 'react';
import styles from './style.module.css';


export default function Project({ index, title, subtitle, setModal, onOpen }) {
  return (
    <div
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
      onClick={() => onOpen && onOpen(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onOpen) {
          e.preventDefault();
          onOpen(index);
        }
      }}
      className={styles.project}
    >
      <h2>{title}</h2>
      <p>{subtitle || 'Design & Development'}</p>
    </div>
  );
}
