import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage, darkMode, toggleDarkMode } = useAppStore();

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

        <div className={styles.actions}>
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
