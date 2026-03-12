import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import styles from './SafetyIndex.module.scss';

interface SafetyData {
  countryId: string;
  globalScore: number;
  violentCrime: number;
  propertyCrime: number;
  digitalSafety: number;
  naturalDisasters: number;
  health: number;
  politicalStability: number;
}

const safetyData: SafetyData[] = [
  { countryId: 'us', globalScore: 75, violentCrime: 22, propertyCrime: 35, digitalSafety: 80, naturalDisasters: 15, health: 85, politicalStability: 80 },
  { countryId: 'es', globalScore: 85, violentCrime: 8, propertyCrime: 18, digitalSafety: 88, naturalDisasters: 10, health: 90, politicalStability: 82 },
  { countryId: 'de', globalScore: 88, violentCrime: 6, propertyCrime: 15, digitalSafety: 90, naturalDisasters: 12, health: 92, politicalStability: 88 },
  { countryId: 'gb', globalScore: 82, violentCrime: 12, propertyCrime: 25, digitalSafety: 85, naturalDisasters: 10, health: 88, politicalStability: 85 },
  { countryId: 'fr', globalScore: 80, violentCrime: 15, propertyCrime: 28, digitalSafety: 82, naturalDisasters: 12, health: 88, politicalStability: 78 },
  { countryId: 'pt', globalScore: 84, violentCrime: 9, propertyCrime: 16, digitalSafety: 86, naturalDisasters: 8, health: 90, politicalStability: 86 },
  { countryId: 'mx', globalScore: 55, violentCrime: 45, propertyCrime: 40, digitalSafety: 65, naturalDisasters: 20, health: 75, politicalStability: 60 },
  { countryId: 'ca', globalScore: 88, violentCrime: 5, propertyCrime: 14, digitalSafety: 90, naturalDisasters: 12, health: 92, politicalStability: 90 },
  { countryId: 'au', globalScore: 86, violentCrime: 6, propertyCrime: 18, digitalSafety: 88, naturalDisasters: 18, health: 90, politicalStability: 88 },
  { countryId: 'nl', globalScore: 87, violentCrime: 7, propertyCrime: 16, digitalSafety: 90, naturalDisasters: 8, health: 92, politicalStability: 90 },
];

const SafetyIndex: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry, destinationCountry } = useAppStore();

  const originData = useMemo(() => {
    if (!originCountry) return safetyData[0];
    return safetyData.find(s => s.countryId === originCountry.id) || safetyData[0];
  }, [originCountry]);

  const destinationData = useMemo(() => {
    if (!destinationCountry) return null;
    return safetyData.find(s => s.countryId === destinationCountry.id);
  }, [destinationCountry]);

  const getScoreClass = (score: number) => {
    if (score >= 85) return styles.excellent;
    if (score >= 70) return styles.good;
    if (score >= 50) return styles.moderate;
    return styles.poor;
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          🛡️ {t('safety.title', 'Safety Index')}
        </h3>
        <p className={styles.subtitle}>
          {t('safety.subtitle', 'Compare safety between countries')}
        </p>
      </div>

      <div className={styles.countriesRow}>
        <div className={styles.countryCard}>
          <span className={styles.cardLabel}>{t('safety.current', 'Current')}</span>
          <span className={styles.countryName}>{originCountry?.nameEs || 'US'}</span>
        </div>
        {destinationData && (
          <>
            <div className={styles.arrow}>→</div>
            <div className={styles.countryCard}>
              <span className={styles.cardLabel}>{t('safety.destination', 'Destination')}</span>
              <span className={styles.countryName}>{destinationCountry?.nameEs || 'ES'}</span>
            </div>
          </>
        )}
      </div>

      <div className={styles.overallScore}>
        <div className={styles.scoreBox}>
          <span className={styles.scoreLabel}>{originCountry?.nameEs || 'US'}</span>
          <span className={`${styles.scoreValue} ${getScoreClass(originData.globalScore)}`}>
            {originData.globalScore}
          </span>
          <span className={styles.scoreDesc}>{t('safety.score', 'Overall Safety Score')}</span>
        </div>
        {destinationData && (
          <div className={styles.scoreBox}>
            <span className={styles.scoreLabel}>{destinationCountry?.nameEs || 'ES'}</span>
            <span className={`${styles.scoreValue} ${getScoreClass(destinationData.globalScore)}`}>
              {destinationData.globalScore}
            </span>
            <span className={styles.scoreDesc}>{t('safety.score', 'Overall Safety Score')}</span>
          </div>
        )}
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailCard}>
          <span className={styles.detailIcon}>⚔️</span>
          <span className={styles.detailLabel}>{t('safety.violent', 'Violent Crime')}</span>
          <span className={`${styles.detailValue} ${originData.violentCrime < 10 ? styles.good : originData.violentCrime < 25 ? styles.moderate : styles.bad}`}>
            {originData.violentCrime < 10 ? 'Low' : originData.violentCrime < 25 ? 'Moderate' : 'High'}
          </span>
        </div>
        <div className={styles.detailCard}>
          <span className={styles.detailIcon}>🔓</span>
          <span className={styles.detailLabel}>{t('safety.property', 'Property Crime')}</span>
          <span className={`${styles.detailValue} ${originData.propertyCrime < 15 ? styles.good : originData.propertyCrime < 30 ? styles.moderate : styles.bad}`}>
            {originData.propertyCrime < 15 ? 'Low' : originData.propertyCrime < 30 ? 'Moderate' : 'High'}
          </span>
        </div>
        <div className={styles.detailCard}>
          <span className={styles.detailIcon}>💻</span>
          <span className={styles.detailLabel}>{t('safety.digital', 'Digital Safety')}</span>
          <span className={`${styles.detailValue} ${originData.digitalSafety >= 85 ? styles.good : styles.moderate}`}>
            {originData.digitalSafety >= 85 ? 'Excellent' : 'Good'}
          </span>
        </div>
        <div className={styles.detailCard}>
          <span className={styles.detailIcon}>🏥</span>
          <span className={styles.detailLabel}>{t('safety.health', 'Health System')}</span>
          <span className={`${styles.detailValue} ${originData.health >= 85 ? styles.good : styles.moderate}`}>
            {originData.health >= 85 ? 'Excellent' : 'Good'}
          </span>
        </div>
        <div className={styles.detailCard}>
          <span className={styles.detailIcon}>🌍</span>
          <span className={styles.detailLabel}>{t('safety.natural', 'Natural Disasters')}</span>
          <span className={`${styles.detailValue} ${originData.naturalDisasters < 10 ? styles.good : styles.moderate}`}>
            {originData.naturalDisasters < 10 ? 'Low Risk' : 'Moderate'}
          </span>
        </div>
        <div className={styles.detailCard}>
          <span className={styles.detailIcon}>🏛️</span>
          <span className={styles.detailLabel}>{t('safety.political', 'Political Stability')}</span>
          <span className={`${styles.detailValue} ${originData.politicalStability >= 80 ? styles.good : styles.moderate}`}>
            {originData.politicalStability >= 80 ? 'Stable' : 'Moderate'}
          </span>
        </div>
      </div>

      {destinationData && (
        <div className={styles.comparison}>
          {destinationData.globalScore > originData.globalScore + 5 && (
            <div className={styles.better}>
              <h4>✅ {t('safety.safer', 'Safer Destination')}</h4>
              <p>{t('safety.saferDesc', 'The destination country has a higher safety score overall')}</p>
            </div>
          )}
          {destinationData.globalScore < originData.globalScore - 5 && (
            <div className={styles.worse}>
              <h4>⚠️ {t('safety.lessSafe', 'Less Safe Destination')}</h4>
              <p>{t('safety.lessSafeDesc', 'Consider safety precautions when moving to this destination')}</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SafetyIndex;
