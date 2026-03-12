import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './SalaryInsight.module.scss';

const SalaryInsight: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { 
    salary, 
    currency, 
    originCountry, 
    calculatedResults, 
    salaryType,
    selectedCountry 
  } = useAppStore();

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';

  const insights = useMemo(() => {
    if (!calculatedResults.length || !originCountry) return null;

    const better = calculatedResults
      .filter(r => r.status === 'better')
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 3);

    const worse = calculatedResults
      .filter(r => r.status === 'worse')
      .sort((a, b) => a.ratio - b.ratio)
      .slice(0, 3);

    const avgRatio = calculatedResults.reduce((sum, r) => sum + r.ratio, 0) / calculatedResults.length;
    
    const originName = i18n.language === 'es' ? originCountry.nameEs : originCountry.name;

    return {
      better,
      worse,
      avgRatio,
      originName
    };
  }, [calculatedResults, originCountry, i18n.language]);

  if (!insights || !salaryNum) return null;

  const formatInsight = (result: typeof insights.better[0]) => {
    const diff = result.equivalentSalary - salaryNum;
    const percent = Math.round((diff / salaryNum) * 100);
    const sign = diff > 0 ? '+' : '';
    return { diff, percent, sign };
  };

  const bestInsight = insights.better[0] ? formatInsight(insights.better[0]) : null;
  const worstInsight = insights.worse[0] ? formatInsight(insights.worse[0]) : null;

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.mainInsight}>
        <div className={styles.insightIcon}>
          {insights.avgRatio > 1 ? '📈' : insights.avgRatio < 1 ? '📉' : '➡️'}
        </div>
        <div className={styles.insightContent}>
          <h3 className={styles.insightTitle}>
            {insights.avgRatio > 1 
              ? (t('insight.globallyBetter') || `Tu salario tiene más valor internacionalmente`)
              : insights.avgRatio < 1
              ? (t('insight.globallyWorse') || `Tu salario tiene menos valor internacionalmente`)
              : (t('insight.globallySimilar') || `Tu salario está en la media internacional`)
            }
          </h3>
          <p className={styles.insightSubtitle}>
            {t('insight.averageValue') || 'En promedio, tu dinero vale'} {' '}
            <strong>{insights.avgRatio > 1 ? `${((insights.avgRatio - 1) * 100).toFixed(0)}% ${t('insight.more') || 'más'}` : `${((1 - insights.avgRatio) * 100).toFixed(0)}% ${t('insight.less') || 'menos'}`}</strong>
            {' '}{t('insight.globally') || 'que en la mayoría de países analizados'}
          </p>
        </div>
      </div>

      <div className={styles.comparisonGrid}>
        {bestInsight && insights.better[0] && (
          <motion.div 
            className={`${styles.comparisonCard} ${styles.positive}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>✨</span>
              <span className={styles.cardTitle}>
                {t('insight.bestOption') || 'Mejor opción'}
              </span>
            </div>
            <div className={styles.cardContent}>
              <span className={styles.countryFlag}>{insights.better[0].country.flag}</span>
              <span className={styles.countryName}>
                {i18n.language === 'es' ? insights.better[0].country.nameEs : insights.better[0].country.name}
              </span>
              <span className={styles.salaryDiff}>
                {bestInsight.sign}{bestInsight.percent}%
              </span>
            </div>
            <div className={styles.cardFooter}>
              {t('insight.needToEarn') || 'Necesitarías ganar'}
              <strong>
                {formatCurrency(insights.better[0].equivalentSalary, insights.better[0].currency)}
              </strong>
            </div>
          </motion.div>
        )}

        {worstInsight && insights.worse[0] && (
          <motion.div 
            className={`${styles.comparisonCard} ${styles.negative}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className={styles.cardHeader}>
              <span className={styles.cardIcon}>⚠️</span>
              <span className={styles.cardTitle}>
                {t('insight.worstOption') || 'Cuidado'}
              </span>
            </div>
            <div className={styles.cardContent}>
              <span className={styles.countryFlag}>{insights.worse[0].country.flag}</span>
              <span className={styles.countryName}>
                {i18n.language === 'es' ? insights.worse[0].country.nameEs : insights.worse[0].country.name}
              </span>
              <span className={styles.salaryDiff}>
                {worstInsight.sign}{worstInsight.percent}%
              </span>
            </div>
            <div className={styles.cardFooter}>
              {t('insight.needToEarn') || 'Necesitarías ganar'}
              <strong>
                {formatCurrency(insights.worse[0].equivalentSalary, insights.worse[0].currency)}
              </strong>
            </div>
          </motion.div>
        )}
      </div>

      {insights.better.length > 0 && (
        <div className={styles.listSection}>
          <h4 className={styles.listTitle}>
            🌍 {t('insight.countriesBetter') || 'Países donde tu dinero llega más lejos'}
          </h4>
          <div className={styles.countryList}>
            {insights.better.map((result, idx) => {
              const info = formatInsight(result);
              return (
                <div key={idx} className={styles.listItem}>
                  <span className={styles.listFlag}>{result.country.flag}</span>
                  <span className={styles.listName}>
                    {i18n.language === 'es' ? result.country.nameEs : result.country.name}
                  </span>
                  <span className={styles.listValue}>+{info.percent}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {insights.worse.length > 0 && (
        <div className={styles.listSection}>
          <h4 className={styles.listTitle}>
            🚨 {t('insight.countriesWorse') || 'Países donde necesitarías más dinero'}
          </h4>
          <div className={styles.countryList}>
            {insights.worse.map((result, idx) => {
              const info = formatInsight(result);
              return (
                <div key={idx} className={styles.listItem}>
                  <span className={styles.listFlag}>{result.country.flag}</span>
                  <span className={styles.listName}>
                    {i18n.language === 'es' ? result.country.nameEs : result.country.name}
                  </span>
                  <span className={styles.listValueNegative}>{info.sign}{info.percent}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SalaryInsight;
