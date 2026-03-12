import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import styles from './WorkLifeBalance.module.scss';

interface WorkLifeData {
  countryId: string;
  avgHoursPerWeek: number;
  vacationDays: number;
  remoteWorkScore: number;
  parentalLeave: number;
  workFromHome: number;
  commuteTime: number;
  workLifeBalanceScore: number;
}

const workLifeData: WorkLifeData[] = [
  { countryId: 'us', avgHoursPerWeek: 40, vacationDays: 15, remoteWorkScore: 75, parentalLeave: 12, workFromHome: 30, commuteTime: 30, workLifeBalanceScore: 65 },
  { countryId: 'es', avgHoursPerWeek: 37, vacationDays: 30, remoteWorkScore: 80, parentalLeave: 16, workFromHome: 25, commuteTime: 25, workLifeBalanceScore: 82 },
  { countryId: 'de', avgHoursPerWeek: 38, vacationDays: 30, remoteWorkScore: 70, parentalLeave: 14, workFromHome: 20, commuteTime: 25, workLifeBalanceScore: 85 },
  { countryId: 'gb', avgHoursPerWeek: 39, vacationDays: 28, remoteWorkScore: 72, parentalLeave: 12, workFromHome: 22, commuteTime: 35, workLifeBalanceScore: 72 },
  { countryId: 'fr', avgHoursPerWeek: 36, vacationDays: 30, remoteWorkScore: 68, parentalLeave: 16, workFromHome: 18, commuteTime: 28, workLifeBalanceScore: 84 },
  { countryId: 'pt', avgHoursPerWeek: 38, vacationDays: 25, remoteWorkScore: 85, parentalLeave: 14, workFromHome: 35, commuteTime: 20, workLifeBalanceScore: 80 },
  { countryId: 'nl', avgHoursPerWeek: 37, vacationDays: 28, remoteWorkScore: 75, parentalLeave: 16, workFromHome: 25, commuteTime: 22, workLifeBalanceScore: 86 },
  { countryId: 'ca', avgHoursPerWeek: 40, vacationDays: 18, remoteWorkScore: 78, parentalLeave: 12, workFromHome: 28, commuteTime: 28, workLifeBalanceScore: 70 },
  { countryId: 'au', avgHoursPerWeek: 40, vacationDays: 20, remoteWorkScore: 72, parentalLeave: 12, workFromHome: 20, commuteTime: 30, workLifeBalanceScore: 68 },
  { countryId: 'mx', avgHoursPerWeek: 42, vacationDays: 12, remoteWorkScore: 65, parentalLeave: 12, workFromHome: 15, commuteTime: 35, workLifeBalanceScore: 55 },
  { countryId: 'jp', avgHoursPerWeek: 45, vacationDays: 10, remoteWorkScore: 45, parentalLeave: 14, workFromHome: 10, commuteTime: 40, workLifeBalanceScore: 48 },
  { countryId: 'ae', avgHoursPerWeek: 42, vacationDays: 20, remoteWorkScore: 55, parentalLeave: 10, workFromHome: 8, commuteTime: 35, workLifeBalanceScore: 58 },
];

const WorkLifeBalance: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry, destinationCountry } = useAppStore();

  const originData = useMemo(() => {
    if (!originCountry) return workLifeData.find(d => d.countryId === 'us');
    return workLifeData.find(d => d.countryId === originCountry.id) || workLifeData[0];
  }, [originCountry]);

  const destinationData = useMemo(() => {
    if (!destinationCountry) return null;
    return workLifeData.find(d => d.countryId === destinationCountry.id);
  }, [destinationCountry]);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return styles.excellent;
    if (score >= 65) return styles.good;
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
          ⚖️ {t('workLife.title', 'Work-Life Balance')}
        </h3>
        <p className={styles.subtitle}>
          {t('workLife.subtitle', 'Compare work-life balance between countries')}
        </p>
      </div>

      <div className={styles.countriesRow}>
        <div className={styles.countryCard}>
          <span className={styles.cardLabel}>{t('workLife.current', 'Current')}</span>
          <span className={styles.countryName}>{originCountry?.nameEs || 'US'}</span>
        </div>
        {destinationData && (
          <>
            <div className={styles.arrow}>→</div>
            <div className={styles.countryCard}>
              <span className={styles.cardLabel}>{t('workLife.destination', 'Destination')}</span>
              <span className={styles.countryName}>{destinationCountry?.nameEs || 'ES'}</span>
            </div>
          </>
        )}
      </div>

      <div className={styles.comparisonGrid}>
        <div className={`${styles.scoreCard} ${getScoreColor(originData.workLifeBalanceScore)}`}>
          <span className={styles.scoreIcon}>⚖️</span>
          <span className={styles.scoreLabel}>{t('workLife.balance', 'Work-Life Balance')}</span>
          <span className={styles.scoreValue}>{originData.workLifeBalanceScore}/100</span>
        </div>

        {destinationData && (
          <div className={`${styles.scoreCard} ${getScoreColor(destinationData.workLifeBalanceScore)}`}>
            <span className={styles.scoreIcon}>⚖️</span>
            <span className={styles.scoreLabel}>{t('workLife.balance', 'Work-Life Balance')}</span>
            <span className={styles.scoreValue}>{destinationData.workLifeBalanceScore}/100</span>
          </div>
        )}
      </div>

      <div className={styles.metricsSection}>
        <h4>{t('workLife.metrics', 'Key Metrics')}</h4>
        
        <div className={styles.metricRow}>
          <div className={styles.metricLabel}>⏱️ {t('workLife.hours', 'Weekly Hours')}</div>
          <div className={styles.metricValues}>
            <span className={styles.originValue}>{originData.avgHoursPerWeek}h</span>
            {destinationData && <span className={styles.destValue}>{destinationData.avgHoursPerWeek}h</span>}
          </div>
        </div>

        <div className={styles.metricRow}>
          <div className={styles.metricLabel}>🏖️ {t('workLife.vacation', 'Vacation Days')}</div>
          <div className={styles.metricValues}>
            <span className={styles.originValue}>{originData.vacationDays}</span>
            {destinationData && <span className={styles.destValue}>{destinationData.vacationDays}</span>}
          </div>
        </div>

        <div className={styles.metricRow}>
          <div className={styles.metricLabel}>🏠 {t('workLife.remote', 'Remote Work Score')}</div>
          <div className={styles.metricValues}>
            <span className={styles.originValue}>{originData.remoteWorkScore}%</span>
            {destinationData && <span className={styles.destValue}>{destinationData.remoteWorkScore}%</span>}
          </div>
        </div>

        <div className={styles.metricRow}>
          <div className={styles.metricLabel}>👶 {t('workLife.parental', 'Parental Leave (weeks)')}</div>
          <div className={styles.metricValues}>
            <span className={styles.originValue}>{originData.parentalLeave}</span>
            {destinationData && <span className={styles.destValue}>{destinationData.parentalLeave}</span>}
          </div>
        </div>

        <div className={styles.metricRow}>
          <div className={styles.metricLabel}>🏡 {t('workLife.wfh', 'Work From Home')}</div>
          <div className={styles.metricValues}>
            <span className={styles.originValue}>{originData.workFromHome}%</span>
            {destinationData && <span className={styles.destValue}>{destinationData.workFromHome}%</span>}
          </div>
        </div>

        <div className={styles.metricRow}>
          <div className={styles.metricLabel}>🚗 {t('workLife.commute', 'Avg Commute')}</div>
          <div className={styles.metricValues}>
            <span className={styles.originValue}>{formatTime(originData.commuteTime)}</span>
            {destinationData && <span className={styles.destValue}>{formatTime(destinationData.commuteTime)}</span>}
          </div>
        </div>
      </div>

      {destinationData && (
        <div className={styles.insight}>
          <h4>{t('workLife.comparison', 'Comparison')}</h4>
          {destinationData.workLifeBalanceScore > originData.workLifeBalanceScore && (
            <p>✅ {t('workLife.better', 'The destination country offers better work-life balance')}</p>
          )}
          {destinationData.workLifeBalanceScore < originData.workLifeBalanceScore && (
            <p>⚠️ {t('workLife.worse', 'The destination country has lower work-life balance than your current country')}</p>
          )}
          {destinationData.workLifeBalanceScore === originData.workLifeBalanceScore && (
            <p>➖ {t('workLife.similar', 'Both countries have similar work-life balance')}</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default WorkLifeBalance;
