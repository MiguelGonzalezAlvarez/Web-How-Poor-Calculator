import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import styles from './HealthcareComparison.module.scss';

interface HealthcareData {
  countryId: string;
  system: string;
  systemEs: string;
  coverage: string;
  coverageEs: string;
  publicQuality: number;
  privateQuality: number;
  waitTime: number;
  outOfPocket: number;
  privateInsurance: number;
}

const healthcareData: HealthcareData[] = [
  { countryId: 'us', system: 'Private', systemEs: 'Privado', coverage: 'Employment-based', coverageEs: 'Basado en empleo', publicQuality: 50, privateQuality: 90, waitTime: 2, outOfPocket: 30, privateInsurance: 250 },
  { countryId: 'es', system: 'Public (Universal)', systemEs: 'Público (Universal)', coverage: 'Universal', coverageEs: 'Universal', publicQuality: 80, privateQuality: 90, waitTime: 30, outOfPocket: 10, privateInsurance: 80 },
  { countryId: 'de', system: 'Public (Dual)', systemEs: 'Público (Dual)', coverage: 'Mandatory', coverageEs: 'Obligatorio', publicQuality: 85, privateQuality: 95, waitTime: 14, outOfPocket: 5, privateInsurance: 150 },
  { countryId: 'gb', system: 'Public (NHS)', systemEs: 'Público (NHS)', coverage: 'Universal', coverageEs: 'Universal', publicQuality: 75, privateQuality: 90, waitTime: 45, outOfPocket: 0, privateInsurance: 100 },
  { countryId: 'fr', system: 'Public', systemEs: 'Público', coverage: 'Universal', coverageEs: 'Universal', publicQuality: 82, privateQuality: 92, waitTime: 10, outOfPocket: 15, privateInsurance: 90 },
  { countryId: 'pt', system: 'Public', systemEs: 'Público', coverage: 'Universal', coverageEs: 'Universal', publicQuality: 75, privateQuality: 85, waitTime: 20, outOfPocket: 15, privateInsurance: 60 },
  { countryId: 'mx', system: 'Mixed', systemEs: 'Mixto', coverage: 'Partial', coverageEs: 'Parcial', publicQuality: 60, privateQuality: 80, waitTime: 15, outOfPocket: 40, privateInsurance: 80 },
  { countryId: 'ca', system: 'Public', systemEs: 'Público', coverage: 'Universal', coverageEs: 'Universal', publicQuality: 78, privateQuality: 88, waitTime: 20, outOfPocket: 5, privateInsurance: 120 },
  { countryId: 'au', system: 'Mixed', systemEs: 'Mixto', coverage: 'Universal + Private', coverageEs: 'Universal + Privado', publicQuality: 75, privateQuality: 90, waitTime: 15, outOfPocket: 10, privateInsurance: 100 },
  { countryId: 'nl', system: 'Public', systemEs: 'Público', coverage: 'Mandatory', coverageEs: 'Obligatorio', publicQuality: 85, privateQuality: 92, waitTime: 7, outOfPocket: 8, privateInsurance: 130 },
];

const HealthcareComparison: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry, destinationCountry } = useAppStore();

  const originData = useMemo(() => {
    if (!originCountry) return healthcareData[0];
    return healthcareData.find(h => h.countryId === originCountry.id) || healthcareData[0];
  }, [originCountry]);

  const destinationData = useMemo(() => {
    if (!destinationCountry) return null;
    return healthcareData.find(h => h.countryId === destinationCountry.id);
  }, [destinationCountry]);

  const getQualityClass = (score: number) => {
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
          🏥 {t('healthcare.title', 'Healthcare Comparison')}
        </h3>
        <p className={styles.subtitle}>
          {t('healthcare.subtitle', 'Compare healthcare systems')}
        </p>
      </div>

      <div className={styles.countriesRow}>
        <div className={styles.countryCard}>
          <span className={styles.cardLabel}>{t('healthcare.current', 'Current')}</span>
          <span className={styles.countryName}>{originCountry?.nameEs || 'US'}</span>
        </div>
        {destinationData && (
          <>
            <div className={styles.arrow}>→</div>
            <div className={styles.countryCard}>
              <span className={styles.cardLabel}>{t('healthcare.destination', 'Destination')}</span>
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
              <span className={styles.metricLabel}>🏥 {t('healthcare.system', 'System')}</span>
              <span className={styles.metricValue}>{i18n.language === 'es' ? originData.systemEs : originData.system}</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>📋 {t('healthcare.coverage', 'Coverage')}</span>
              <span className={styles.metricValue}>{i18n.language === 'es' ? originData.coverageEs : originData.coverage}</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>⭐ {t('healthcare.public', 'Public Quality')}</span>
              <span className={`${styles.metricValue} ${getQualityClass(originData.publicQuality)}`}>{originData.publicQuality}%</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>✨ {t('healthcare.private', 'Private Quality')}</span>
              <span className={`${styles.metricValue} ${getQualityClass(originData.privateQuality)}`}>{originData.privateQuality}%</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>⏱️ {t('healthcare.wait', 'Wait Time (days)')}</span>
              <span className={styles.metricValue}>{originData.waitTime}</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>💸 {t('healthcare.oop', 'Out of Pocket')}</span>
              <span className={styles.metricValue}>{originData.outOfPocket}%</span>
            </div>
            <div className={styles.metricRow}>
              <span className={styles.metricLabel}>🏦 {t('healthcare.insurance', 'Private Insurance/mo')}</span>
              <span className={styles.metricValue}>${originData.privateInsurance}</span>
            </div>
          </div>
        </div>

        {destinationData && (
          <div className={styles.section}>
            <h4>{destinationCountry?.nameEs || 'ES'}</h4>
            <div className={styles.metrics}>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>🏥 {t('healthcare.system', 'System')}</span>
                <span className={styles.metricValue}>{i18n.language === 'es' ? destinationData.systemEs : destinationData.system}</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>📋 {t('healthcare.coverage', 'Coverage')}</span>
                <span className={styles.metricValue}>{i18n.language === 'es' ? destinationData.coverageEs : destinationData.coverage}</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>⭐ {t('healthcare.public', 'Public Quality')}</span>
                <span className={`${styles.metricValue} ${getQualityClass(destinationData.publicQuality)}`}>{destinationData.publicQuality}%</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>✨ {t('healthcare.private', 'Private Quality')}</span>
                <span className={`${styles.metricValue} ${getQualityClass(destinationData.privateQuality)}`}>{destinationData.privateQuality}%</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>⏱️ {t('healthcare.wait', 'Wait Time (days)')}</span>
                <span className={styles.metricValue}>{destinationData.waitTime}</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>💸 {t('healthcare.oop', 'Out of Pocket')}</span>
                <span className={styles.metricValue}>{destinationData.outOfPocket}%</span>
              </div>
              <div className={styles.metricRow}>
                <span className={styles.metricLabel}>🏦 {t('healthcare.insurance', 'Private Insurance/mo')}</span>
                <span className={styles.metricValue}>${destinationData.privateInsurance}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {destinationData && (
        <div className={styles.insight}>
          <h4>{t('healthcare.comparison', 'Key Differences')}</h4>
          {destinationData.privateInsurance < originData.privateInsurance && destinationData.publicQuality > 70 && (
            <p>✅ {t('healthcare.better', 'Better overall value - high quality public system with lower insurance costs')}</p>
          )}
          {destinationData.privateInsurance > originData.privateInsurance && destinationData.publicQuality < 60 && (
            <p>⚠️ {t('healthcare.worse', 'May need private insurance - budget for higher healthcare costs')}</p>
          )}
          {destinationData.waitTime < originData.waitTime && destinationData.publicQuality > 70 && (
            <p>📈 {t('healthcare.faster', 'Faster access to care with public system')}</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default HealthcareComparison;
