'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import styles from './style.module.scss';
import Preloader from '../../components/Preloader';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';
import usePageLoad from '../../common/usePageLoad';

const fields = [
  { key: 'name', number: '01', label: "What's your name?", placeholder: 'John Doe *', type: 'text' },
  { key: 'email', number: '02', label: "What's your email?", placeholder: 'john@doe.com *', type: 'email' },
  { key: 'organization', number: '03', label: "What's the name of your organization?", placeholder: 'John & Doe ®', type: 'text' },
  { key: 'services', number: '04', label: 'What services are you looking for?', placeholder: 'Magento build, Migration, API integration...', type: 'text' },
];

export default function ContactPage() {
  const isLoading = usePageLoad(1400);
  const [form, setForm] = useState({ name: '', email: '', organization: '', services: '', message: '' });
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const formatted = new Date()
        .toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });
      const next = (formatted + ' IST').toUpperCase();
      setTime((prev) => (prev === next ? prev : next));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  // No backend - compose the enquiry into a prefilled mail instead.
  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Project enquiry${form.organization ? ` - ${form.organization}` : ''}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Organization: ${form.organization}`,
      `Services: ${form.services}`,
      '',
      form.message,
    ].join('\n');
    window.location.href = `mailto:sumit05gusain@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className={styles.contactPage}>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader title="Contact" />}
      </AnimatePresence>

      <section className={styles.body}>
        <div className={styles.titleRow}>
          <h1>
            Let&apos;s start a<br />project together
          </h1>
          <div className={styles.portrait}>
            <Image src="/images/profile.jpg" alt="Sumit Gusain" fill={true} sizes="120px" />
          </div>
        </div>

        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {fields.map((field) => (
              <div className={styles.field} key={field.key}>
                <span className={styles.number}>{field.number}</span>
                <label htmlFor={`contact-${field.key}`}>{field.label}</label>
                <input
                  id={`contact-${field.key}`}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={update(field.key)}
                  required={field.key === 'name' || field.key === 'email'}
                />
              </div>
            ))}
            <div className={styles.field}>
              <span className={styles.number}>05</span>
              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                rows={4}
                placeholder="Hello Sumit, can you help me with ... *"
                value={form.message}
                onChange={update('message')}
                required
              />
            </div>
            <div className={styles.submitContainer}>
              <Rounded backgroundColor="#334BD3" className={styles.submit}>
                <button type="submit">
                  <p>Send it!</p>
                </button>
              </Rounded>
            </div>
          </form>

          <aside className={styles.details}>
            <div className={styles.detailGroup}>
              <h3>Contact Details</h3>
              <Magnetic><p><a href="mailto:sumit05gusain@gmail.com">Email Me</a></p></Magnetic>
              <Magnetic><p><a href="tel:+917982416604">Chat on WhatsApp</a></p></Magnetic>
            </div>
            <div className={styles.detailGroup}>
              <h3>Business Details</h3>
              <p>Sumit Gusain</p>
              <p>Commerce Developer</p>
              <p>New Delhi, India</p>
            </div>
            <div className={styles.detailGroup}>
              <h3>Socials</h3>
              <Magnetic><p><a href="https://www.instagram.com/sum.it____?igsh=MXViM3Q5cXdxOGFmMg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer">Instagram</a></p></Magnetic>
              <Magnetic><p><a href="https://github.com/05cyrus" target="_blank" rel="noopener noreferrer">GitHub</a></p></Magnetic>
              <Magnetic><p><a href="https://www.linkedin.com/in/sumitgusain05/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p></Magnetic>
            </div>
          </aside>
        </div>

        <div className={styles.info}>
          <span>
            <h3>Version</h3>
            <p>2026 © Edition</p>
          </span>
          <span>
            <h3>Local Time</h3>
            <p>{time}</p>
          </span>
        </div>
      </section>
    </main>
  );
}
