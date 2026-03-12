import { useTranslation } from 'react-i18next';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.disclaimer}>{t('footer.disclaimer')}</p>
        <p className={styles.sources}>{t('footer.sources')}</p>
      </div>
    </footer>
  );
};

export default Footer;
