import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { getTrendsByCountry, getLatestTrends, calculateChange } from '../../data/costOfLivingTrends';
import styles from './CostOfLivingTrends.module.scss';

const CostOfLivingTrends: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry } = useAppStore();

  const trends = useMemo(() => {
    if (!originCountry) return [];
    return getTrendsByCountry(originCountry.id);
  }, [originCountry]);

  const latest = useMemo(() => {
    if (!originCountry) return null;
    return getLatestTrends(originCountry.id);
  }, [originCountry]);

  const changes = useMemo(() => {
    if (!originCountry) return [];
    return calculateChange(originCountry.id, 5);
  }, [originCountry]);

  if (!originCountry || !latest) {
    return (
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>
            {t('colTrends.title', '📊 Cost of Living Trends')}
          </h3>
          <p className={styles.subtitle}>
            {t('colTrends.selectCountry', 'Select a country to see historical trends')}
          </p>
        </div>
      </motion.div>
    );
  }

  const categoryLabels: Record<string, string> = {
    groceries: i18n.language === 'es' ? 'Comida' : 'Groceries',
    housing: i18n.language === 'es' ? 'Vivienda' : 'Housing',
    utilities: i18n.language === 'es' ? 'Servicios' : 'Utilities',
    transport: i18n.language === 'es' ? 'Transporte' : 'Transport',
    restaurants: i18n.language === 'es' ? 'Restaurantes' : 'Restaurants',
    overall: i18n.language === 'es' ? 'General' : 'Overall',
  };

  const maxValue = Math.max(...trends.map(t => t.overall));

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          {t('colTrends.title', '📊 Cost of Living Trends')}
        </h3>
        <p className={styles.subtitle}>
          {t('colTrends.subtitle', `Historical trends in ${originCountry.nameEs} (2019-2024)`)}
        </p>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chart}>
          {trends.map((trend) => (
            <div key={trend.year} className={styles.chartBar}>
              <div className={styles.barContainer}>
                <div 
                  className={styles.bar}
                  style={{ height: `${(trend.overall / maxValue) * 100}%` }}
                >
                  <span className={styles.barValue}>{trend.overall}</span>
                </div>
              </div>
              <span className={styles.barYear}>{trend.year}</span>
            </div>
          ))}
        </div>
        <div className={styles.chartLabel}>{i18n.language === 'es' ? 'Índice (2019=100)' : 'Index (2019=100)'}</div>
      </div>

      <div className={styles.changesSection}>
        <h4>{i18n.language === 'es' ? 'Cambio en 5 años' : '5-Year Change'}</h4>
        <div className={styles.changesGrid}>
          {changes.map(item => (
            <div key={item.category} className={styles.changeCard}>
              <span className={styles.changeLabel}>{categoryLabels[item.category]}</span>
              <span className={`${styles.changeValue} ${item.change > 20 ? styles.high : item.change > 10 ? styles.medium : styles.low}`}>
                {item.change > 0 ? '+' : ''}{item.change.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.currentSection}>
        <h4>{i18n.language === 'es' ? 'Detalles actuales (2024)' : 'Current Details (2024)'}</h4>
        <div className={styles.detailsGrid}>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>🛒</span>
            <span className={styles.detailLabel}>{categoryLabels.groceries}</span>
            <span className={styles.detailValue}>{latest.groceries}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>🏠</span>
            <span className={styles.detailLabel}>{categoryLabels.housing}</span>
            <span className={styles.detailValue}>{latest.housing}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>💡</span>
            <span className={styles.detailLabel}>{categoryLabels.utilities}</span>
            <span className={styles.detailValue}>{latest.utilities}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>🚌</span>
            <span className={styles.detailLabel}>{categoryLabels.transport}</span>
            <span className={styles.detailValue}>{latest.transport}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>🍽️</span>
            <span className={styles.detailLabel}>{categoryLabels.restaurants}</span>
            <span className={styles.detailValue}>{latest.restaurants}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailIcon}>📈</span>
            <span className={styles.detailLabel}>{categoryLabels.overall}</span>
            <span className={styles.detailValueHighlight}>{latest.overall}</span>
          </div>
        </div>
      </div>

      <div className={styles.insight}>
        <h4>{t('colTrends.insight', 'Key Insights')}</h4>
        <ul>
          {changes.find(c => c.category === 'housing')?.change > 25 && (
            <li>{t('colTrends.housingHigh', 'Housing costs have increased significantly - consider this when planning relocation')}</li>
          )}
          {changes.find(c => c.category === 'groceries')?.change > 20 && (
            <li>{t('colTrends.groceriesHigh', 'Food prices have risen substantially - factor this into your budget')}</li>
          )}
          {changes.find(c => c.category === 'overall')?.change < 15 && (
            <li>{t('colTrends.stable', 'Relatively stable cost of living compared to other countries')}</li>
          )}
          {changes.find(c => c.category === 'overall')?.change > 30 && (
            <li>{t('colTrends.highIncrease', 'Cost of living has increased significantly in recent years')}</li>
          )}
        </ul>
      </div>
    </motion.div>
  );
};

export default CostOfLivingTrends;
