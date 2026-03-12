import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './RealSavingsCard.module.scss';

const RealSavingsCard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { calculatedResults, originCountry, originRegion, salary, salaryType, currency } = useAppStore();
  
  if (!calculatedResults.length || !originCountry || !originRegion || !salary) {
    return null;
  }

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';
  
  const originCOL = originRegion.costOfLivingIndex || originCountry.costOfLivingIndex;
  const originRent = originRegion.rentIndex || originCOL * 0.8;
  
  const estimatedMonthlyRent = (originRent / 100) * 1500;
  const estimatedMonthlyExpenses = (originCOL / 100) * 2000;
  
  const monthlySalary = salaryNum / 12;
  const monthlyNet = isNet ? monthlySalary : monthlySalary * 0.75;
  const currentSavings = monthlyNet - estimatedMonthlyRent - estimatedMonthlyExpenses;

  const getResultForRegion = (regionId: string) => {
    return calculatedResults.find(r => r.region.id === regionId);
  };

  const topResults = calculatedResults.slice(0, 5).map((result, index) => {
    const destCOL = result.costOfLivingIndex;
    const destRent = result.rentIndex;
    
    const destMonthlyRent = (destRent / 100) * 1500;
    const destMonthlyExpenses = (destCOL / 100) * 2000;
    
    const equivalentMonthly = result.equivalentSalary / 12;
    const destMonthlyNet = isNet ? equivalentMonthly : equivalentMonthly * 0.75;
    const destSavings = destMonthlyNet - destMonthlyRent - destMonthlyExpenses;
    
    const savingsDiff = currentSavings > 0 ? ((destSavings - currentSavings) / currentSavings) * 100 : 0;
    
    const equivalentOffer = salaryNum * result.ratio;
    
    return {
      ...result,
      index,
      monthlyRent: destMonthlyRent,
      monthlyExpenses: destMonthlyExpenses,
      savings: destSavings,
      savingsDiff,
      equivalentOffer
    };
  });

  const bestOption = topResults.find(r => r.savingsDiff > 0) || topResults[0];
  const worstOption = topResults.find(r => r.savingsDiff < -20);

  return (
    <motion.section 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>💰 {t('realSavings.title')}</h2>
        <p className={styles.subtitle}>{t('realSavings.subtitle')}</p>
      </div>

      <div className={styles.currentStatus}>
        <h3 className={styles.sectionTitle}>🏠 {t('realSavings.currentStatus')}</h3>
        <div className={styles.metricsGrid}>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>{t('realSavings.currentSalary')}</span>
            <span className={styles.metricValue}>{formatCurrency(salaryNum, currency)}/{t('common.year')}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>{t('realSavings.estimatedNet')}</span>
            <span className={styles.metricValue}>{formatCurrency(monthlyNet * 12, currency)}</span>
          </div>
          <div className={styles.metric}>
            <span className={styles.metricLabel}>{t('realSavings.estimatedRent')}</span>
            <span className={styles.metricValue}>{formatCurrency(estimatedMonthlyRent, currency)}/mes</span>
          </div>
          <div className={`${styles.metric} ${styles.highlight}`}>
            <span className={styles.metricLabel}>{t('realSavings.potentialSavings')}</span>
            <span className={styles.metricValue}>
              {formatCurrency(currentSavings, currency)}/mes
            </span>
          </div>
        </div>
      </div>

      <div className={styles.destinations}>
        <h3 className={styles.sectionTitle}>✈️ {t('realSavings.destinations')}</h3>
        
        {bestOption && (
          <div className={`${styles.bestOption} ${styles.alert}`}>
            <div className={styles.alertIcon}>✅</div>
            <div className={styles.alertContent}>
              <h4>{bestOption.country.flag} {i18n.language === 'es' ? bestOption.country.nameEs : bestOption.country.name}</h4>
              <p>
                {t('realSavings.bestOption', { 
                  savings: formatCurrency(bestOption.savings, bestOption.currency),
                  diff: Math.round(bestOption.savingsDiff)
                })}
              </p>
            </div>
          </div>
        )}

        <div className={styles.resultsList}>
          {topResults.map((result) => (
            <div 
              key={result.region.id} 
              className={`${styles.resultItem} ${result.savingsDiff < 0 ? styles.negative : styles.positive}`}
            >
              <div className={styles.resultRank}>#{result.index + 1}</div>
              <div className={styles.resultInfo}>
                <span className={styles.resultFlag}>{result.country.flag}</span>
                <span className={styles.resultName}>
                  {i18n.language === 'es' ? result.region.nameEs : result.region.name}
                </span>
              </div>
              <div className={styles.resultMetrics}>
                <div className={styles.resultEquivalent}>
                  <span className={styles.resultLabel}>{t('realSavings.equivalent')}</span>
                  <span className={styles.resultValue}>
                    {formatCurrency(result.equivalentSalary, result.currency)}
                  </span>
                </div>
                <div className={styles.resultSavings}>
                  <span className={styles.resultLabel}>{t('realSavings.savings')}</span>
                  <span className={`${styles.resultValue} ${result.savingsDiff < 0 ? styles.negativeValue : styles.positiveValue}`}>
                    {formatCurrency(result.savings, result.currency)}/mes
                  </span>
                </div>
                <div className={styles.resultDiff}>
                  <span className={`${styles.diffBadge} ${result.savingsDiff >= 0 ? styles.positiveBadge : styles.negativeBadge}`}>
                    {result.savingsDiff >= 0 ? '+' : ''}{Math.round(result.savingsDiff)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {worstOption && worstOption.savingsDiff < -20 && (
          <div className={styles.warningBox}>
            <span className={styles.warningIcon}>⚠️</span>
            <p>
              {t('realSavings.warning', { 
                country: worstOption.country.flag,
                diff: Math.round(Math.abs(worstOption.savingsDiff))
              })}
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default RealSavingsCard;
