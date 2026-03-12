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
    originRegion,
    salaryType
  } = useAppStore();

  if (!calculatedResults.length || !salary || !originCountry) {
    return null;
  }

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';
  const bestResult = calculatedResults[0];
  const totalDestinations = calculatedResults.length;
  
  const betterThanCount = calculatedResults.filter(r => r.status === 'better').length;
  const similarCount = calculatedResults.filter(r => r.status === 'similar').length;
  const worseCount = calculatedResults.filter(r => r.status === 'worse').length;

  const ranking = 1 + calculatedResults.findIndex(r => r.ratio < 1);

  const originCOL = originRegion?.costOfLivingIndex || originCountry.costOfLivingIndex;
  const originRent = originRegion?.rentIndex || originCOL * 0.8;
  
  const monthlySalary = salaryNum / 12;
  const monthlyNet = isNet ? monthlySalary : monthlySalary * 0.75;
  const currentRent = (originRent / 100) * 1500;
  const currentExpenses = (originCOL / 100) * 2000;
  const currentSavings = monthlyNet - currentRent - currentExpenses;

  const destCOL = bestResult.costOfLivingIndex;
  const destRent = bestResult.rentIndex;
  const destMonthlyRent = (destRent / 100) * 1500;
  const destMonthlyExpenses = (destCOL / 100) * 2000;
  const equivalentMonthly = bestResult.equivalentSalary / 12;
  const destMonthlyNet = isNet ? equivalentMonthly : equivalentMonthly * 0.75;
  const destSavings = destMonthlyNet - destMonthlyRent - destMonthlyExpenses;
  
  const savingsDiff = currentSavings > 0 ? ((destSavings - currentSavings) / currentSavings) * 100 : 0;
  const isBetterForSavings = savingsDiff > 0;

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
          {currentSavings > 0 && (
            <div className={`${styles.savingsNote} ${isBetterForSavings ? styles.positive : styles.negative}`}>
              <span className={styles.savingsIcon}>{isBetterForSavings ? '📈' : '📉'}</span>
              <span className={styles.savingsText}>
                {i18n.language === 'es' 
                  ? isBetterForSavings 
                    ? `Tus ahorros mejorarían un ${Math.round(savingsDiff)}%`
                    : `Tus ahorros bajaría un ${Math.round(Math.abs(savingsDiff))}%`
                  : isBetterForSavings
                    ? `Your savings would improve by ${Math.round(savingsDiff)}%`
                    : `Your savings would drop by ${Math.round(Math.abs(savingsDiff))}%`
                }
              </span>
            </div>
          )}
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
