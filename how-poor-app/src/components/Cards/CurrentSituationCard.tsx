import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './CurrentSituationCard.module.scss';

const CurrentSituationCard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, currency, originCountry, originRegion, salaryInUSD, isCalculated } = useAppStore();

  if (!isCalculated || !originCountry || !originRegion) {
    return null;
  }

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const avgSalary = originRegion.avgNetSalary || originCountry.gdpPppPerCapita * 0.4;
  const percentile = Math.min(95, Math.max(5, Math.round((salaryNum / avgSalary) * 50 + 25)));

  const regionName = i18n.language === 'es' ? originRegion.nameEs : originRegion.name;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('results.yourSalary')}</h3>
        <span className={styles.badge}>
          {originCountry.flag} {regionName}
        </span>
      </div>

      <div className={styles.salaryDisplay}>
        <span className={styles.salaryValue}>
          {formatCurrency(salaryNum, currency)}
        </span>
        <span className={styles.salaryPeriod}>/{t('results.perYear').replace('/', '')}</span>
      </div>

      <div className={styles.conversion}>
        <span className={styles.conversionLabel}>{t('results.inUsd')}:</span>
        <span className={styles.conversionValue}>
          {formatCurrency(salaryInUSD, 'USD')}
        </span>
      </div>

      <div className={styles.percentile}>
        <div className={styles.percentileLabel}>
          <span>{t('results.percentile') || 'Percentil estimado'}</span>
          <span className={styles.percentileValue}>{percentile}%</span>
        </div>
        <div className={styles.percentileBar}>
          <div 
            className={styles.percentileFill} 
            style={{ width: `${percentile}%` }}
          />
          <div 
            className={styles.percentileMarker} 
            style={{ left: `${percentile}%` }}
          />
        </div>
        <div className={styles.percentileLegend}>
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <div className={styles.originInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>{t('results.costOfLiving') || 'Coste de vida'}</span>
          <span className={styles.infoValue}>{originRegion.costOfLivingIndex}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>{t('results.purchasingPower') || 'Poder adquisitivo'}</span>
          <span className={styles.infoValue}>{originRegion.purchasingPowerIndex}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>{t('results.rentIndex') || 'Índice de alquiler'}</span>
          <span className={styles.infoValue}>{originRegion.rentIndex}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentSituationCard;
