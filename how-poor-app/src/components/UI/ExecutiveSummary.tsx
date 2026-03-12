import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './ExecutiveSummary.module.scss';

const ExecutiveSummary: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { 
    salary, 
    currency, 
    calculatedResults, 
    originCountry,
    originRegion 
  } = useAppStore();

  if (!calculatedResults.length || !salary || !originCountry) {
    return null;
  }

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const bestResult = calculatedResults[0];
  const totalDestinations = calculatedResults.length;
  
  const betterThanCount = calculatedResults.filter(r => r.status === 'better').length;
  const similarCount = calculatedResults.filter(r => r.status === 'similar').length;
  const worseCount = calculatedResults.filter(r => r.status === 'worse').length;

  const ranking = 1 + calculatedResults.findIndex(r => r.ratio < 1);

  return (
    <div className={styles.summary}>
      <div className={styles.mainCard}>
        <div className={styles.icon}>💰</div>
        <div className={styles.content}>
          <h3 className={styles.title}>
            {i18n.language === 'es' 
              ? `Con ${formatCurrency(salaryNum, currency)} en ${originRegion?.nameEs || originCountry.nameEs} equivalen a...`
              : `With ${formatCurrency(salaryNum, currency)} in ${originRegion?.name || originCountry.name} equals...`
            }
          </h3>
          <div className={styles.highlight}>
            <span className={styles.amount}>
              {formatCurrency(bestResult.equivalentSalary, bestResult.currency)}
            </span>
            <span className={styles.location}>
              {bestResult.country.flag} {i18n.language === 'es' ? bestResult.region?.nameEs : bestResult.region?.name}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>#{ranking}</span>
          <span className={styles.statLabel}>
            {i18n.language === 'es' ? 'de' : 'of'} {totalDestinations}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.better}`}>{betterThanCount}</span>
          <span className={styles.statLabel}>
            {i18n.language === 'es' ? 'Mejores' : 'Better'}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.similar}`}>{similarCount}</span>
          <span className={styles.statLabel}>
            {i18n.language === 'es' ? 'Similares' : 'Similar'}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} ${styles.worse}`}>{worseCount}</span>
          <span className={styles.statLabel}>
            {i18n.language === 'es' ? 'Peores' : 'Worse'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;
