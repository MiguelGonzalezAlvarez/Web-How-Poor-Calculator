import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import styles from './LanguageBarrier.module.scss';

interface LanguageData {
  countryId: string;
  officialLang: string;
  officialLangEs: string;
  englishLevel: number;
  englishLevelEs: string;
  expats: number;
  businessEnglish: number;
}

const languageData: LanguageData[] = [
  { countryId: 'us', officialLang: 'English', officialLangEs: 'Inglés', englishLevel: 95, englishLevelEs: 'Nativo/C2', expats: 15, businessEnglish: 90 },
  { countryId: 'es', officialLang: 'Spanish', officialLangEs: 'Español', englishLevel: 56, englishLevelEs: 'Intermedio (B1-B2)', expats: 12, businessEnglish: 45 },
  { countryId: 'de', officialLang: 'German', officialLangEs: 'Alemán', englishLevel: 70, englishLevelEs: 'Avanzado (B2-C1)', expats: 15, businessEnglish: 65 },
  { countryId: 'gb', officialLang: 'English', officialLangEs: 'Inglés', englishLevel: 98, englishLevelEs: 'Nativo/C2', expats: 20, businessEnglish: 95 },
  { countryId: 'fr', officialLang: 'French', officialLangEs: 'Francés', englishLevel: 55, englishLevelEs: 'Intermedio (B1-B2)', expats: 12, businessEnglish: 40 },
  { countryId: 'pt', officialLang: 'Portuguese', officialLangEs: 'Portugués', englishLevel: 50, englishLevelEs: 'Intermedio (B1)', expats: 8, businessEnglish: 35 },
  { countryId: 'nl', officialLang: 'Dutch', officialLangEs: 'Neerlandés', englishLevel: 90, englishLevelEs: 'Avanzado (C1)', expats: 18, businessEnglish: 85 },
  { countryId: 'mx', officialLang: 'Spanish', officialLangEs: 'Español', englishLevel: 45, englishLevelEs: 'Básico-Intermedio', expats: 5, businessEnglish: 30 },
  { countryId: 'ca', officialLang: 'English/French', officialLangEs: 'Inglés/Francés', englishLevel: 95, englishLevelEs: 'Nativo/C2', expats: 18, businessEnglish: 90 },
  { countryId: 'au', officialLang: 'English', officialLangEs: 'Inglés', englishLevel: 98, englishLevelEs: 'Nativo/C2', expats: 25, businessEnglish: 95 },
];

const LanguageBarrier: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry, destinationCountry } = useAppStore();

  const originData = useMemo(() => {
    if (!originCountry) return languageData[0];
    return languageData.find(l => l.countryId === originCountry.id) || languageData[0];
  }, [originCountry]);

  const destinationData = useMemo(() => {
    if (!destinationCountry) return null;
    return languageData.find(l => l.countryId === destinationCountry.id);
  }, [destinationCountry]);

  const getLevelClass = (level: number) => {
    if (level >= 80) return styles.excellent;
    if (level >= 60) return styles.good;
    if (level >= 40) return styles.moderate;
    return styles.poor;
  };

  const isEs = i18n.language === 'es';

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          🗣️ {t('language.title', 'Language Barrier')}
        </h3>
        <p className={styles.subtitle}>
          {t('language.subtitle', 'Language considerations for your relocation')}
        </p>
      </div>

      <div className={styles.countriesRow}>
        <div className={styles.countryCard}>
          <span className={styles.cardLabel}>{t('language.current', 'Current')}</span>
          <span className={styles.countryName}>{originCountry?.nameEs || 'US'}</span>
        </div>
        {destinationData && (
          <>
            <div className={styles.arrow}>→</div>
            <div className={styles.countryCard}>
              <span className={styles.cardLabel}>{t('language.destination', 'Destination')}</span>
              <span className={styles.countryName}>{destinationCountry?.nameEs || 'ES'}</span>
            </div>
          </>
        )}
      </div>

      <div className={styles.grid}>
        <div className={styles.section}>
          <h4>{originCountry?.nameEs || 'US'}</h4>
          <div className={styles.metrics}>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>🗣️ {t('language.official', 'Official Language')}</span>
              <span className={styles.metricValue}>{isEs ? originData.officialLangEs : originData.officialLang}</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>📊 {t('language.english', 'English Level')}</span>
              <span className={`${styles.metricValue} ${getLevelClass(originData.englishLevel)}`}>
                {originData.englishLevelEs}
              </span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>🏢 {t('language.business', 'Business English')}</span>
              <span className={styles.metricValue}>{originData.businessEnglish}%</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>🌍 {t('language.expats', 'English Speakers')}</span>
              <span className={styles.metricValue}>{originData.expats}%</span>
            </div>
          </div>
        </div>

        {destinationData && (
          <div className={styles.section}>
            <h4>{destinationCountry?.nameEs || 'ES'}</h4>
            <div className={styles.metrics}>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>🗣️ {t('language.official', 'Official Language')}</span>
                <span className={styles.metricValue}>{isEs ? destinationData.officialLangEs : destinationData.officialLang}</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>📊 {t('language.english', 'English Level')}</span>
                <span className={`${styles.metricValue} ${getLevelClass(destinationData.englishLevel)}`}>
                  {destinationData.englishLevelEs}
                </span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>🏢 {t('language.business', 'Business English')}</span>
                <span className={styles.metricValue}>{destinationData.businessEnglish}%</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>🌍 {t('language.expats', 'English Speakers')}</span>
                <span className={styles.metricValue}>{destinationData.expats}%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {destinationData && destinationData.englishLevel < 70 && (
        <div className={styles.warning}>
          <h4>⚠️ {t('language.consider', 'Consider')}</h4>
          <ul>
            <li>{t('language.learn', `Learning ${isEs ? destinationData.officialLangEs : destinationData.officialLang} will be important for daily life`)}</li>
            <li>{t('language.courses', 'Consider taking language courses before moving')}</li>
            <li>{t('language.expats', 'Look for expat communities in the destination city')}</li>
          </ul>
        </div>
      )}

      {destinationData && destinationData.englishLevel >= 70 && (
        <div className={styles.success}>
          <h4>✅ {t('language.good', 'Good News')}</h4>
          <ul>
            <li>{t('language.easy', 'English is widely spoken - you can get by without local language')}</li>
            <li>{t('language.business', 'Business English is common in professional settings')}</li>
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default LanguageBarrier;
