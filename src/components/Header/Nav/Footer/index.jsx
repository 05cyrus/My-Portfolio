import styles from './style.module.scss';
import Magnetic from '../../../../common/Magnetic'
export default function index() {
  return (
    <div className={styles.footer}>
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
)
}
