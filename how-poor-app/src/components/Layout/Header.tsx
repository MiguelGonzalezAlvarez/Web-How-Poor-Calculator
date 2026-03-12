import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import LiveDataToggle from '../UI/LiveDataToggle';
import styles from './Header.module.scss';

const DATA_UPDATE_DATE = new Date('2026-03-01');

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage, darkMode, toggleDarkMode } = useAppStore();

  const dateLocale = i18n.language === 'es' ? es : enUS;
  const formattedDate = format(DATA_UPDATE_DATE, 'MMMM yyyy', { locale: dateLocale });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleLanguage = () => {
    const newLang = language === 'es' ? 'en' : 'es';
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🌍</span>
          <h1 className={styles.logoText}>{t('app.title')}</h1>
        </div>
        
        <p className={styles.tagline}>{t('app.subtitle')}</p>

        <div className={styles.dataInfo}>
          <span className={styles.dataBadge}>
            📊 {t('data.lastUpdate')}: {formattedDate}
          </span>
        </div>

        <div className={styles.actions}>
          <LiveDataToggle />
          <button 
            className={styles.themeButton} 
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          
          <button className={styles.langButton} onClick={toggleLanguage}>
            <span className={styles.langFlag}>{language === 'es' ? '🇪🇸' : '🇺🇸'}</span>
            <span className={styles.langText}>{t(`languages.${language === 'es' ? 'en' : 'es'}`)}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
