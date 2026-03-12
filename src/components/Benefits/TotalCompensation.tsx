import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { getBenefits } from '../../data/benefits';
import styles from './TotalCompensation.module.scss';

const TotalCompensation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, originCountry, salaryType, calculatedResults } = useAppStore();

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';

  const compensationData = useMemo(() => {
    if (!salaryNum || !originCountry) return null;

    const countryId = originCountry.id;
    const countryBenefits = getBenefits(countryId);
    
    const taxRate = 0.30;
    const grossSalary = isNet ? salaryNum / (1 - taxRate) : salaryNum;

    const bonus = grossSalary * countryBenefits.typicalBonus;
    const equity = grossSalary * countryBenefits.equityTypical;
    const health = countryBenefits.healthInsuranceValue;
    const remote = countryBenefits.remoteStipend * 12;
    const pension = grossSalary * countryBenefits.pensionContribution;

    const total = grossSalary + bonus + equity + health + remote + pension;

    const items = [
      { id: 'base', name: t('compensation.base') || 'Salario base', value: grossSalary, color: '#3b82f6' },
      { id: 'bonus', name: t('compensation.bonus') || 'Bono anual', value: bonus, color: '#22c55e' },
      { id: 'equity', name: t('compensation.equity') || 'Equity/Stock', value: equity, color: '#8b5cf6' },
      { id: 'health', name: t('compensation.health') || 'Seguro médico', value: health, color: '#f59e0b' },
      { id: 'remote', name: t('compensation.remote') || 'Subsidio remoto', value: remote, color: '#ec4899' },
      { id: 'pension', name: t('compensation.pension') || 'Pensión', value: pension, color: '#06b6d4' }
    ].filter(item => item.value > 0);

    const otherResults = calculatedResults.slice(0, 3).map(result => {
      const destBenefits = getBenefits(result.country.id);
      const destGross = result.equivalentSalary;
      const destBonus = destGross * destBenefits.typicalBonus;
      const destEquity = destGross * destBenefits.equityTypical;
      const destHealth = destBenefits.healthInsuranceValue;
      const destRemote = destBenefits.remoteStipend * 12;
      const destPension = destGross * destBenefits.pensionContribution;
      const destTotal = destGross + destBonus + destEquity + destHealth + destRemote + destPension;

      return {
        country: result.country,
        name: i18n.language === 'es' ? result.country.nameEs : result.country.name,
        flag: result.country.flag,
        total: destTotal,
        diff: destTotal - total,
        diffPct: ((destTotal - total) / total) * 100
      };
    });

    return {
      countryName: i18n.language === 'es' ? originCountry.nameEs : originCountry.name,
      currency: originCountry.currency,
      currencySymbol: originCountry.currencySymbol,
      grossSalary,
      items,
      total,
      otherResults,
      bestComp: otherResults.length > 0 ? otherResults.reduce((best, curr) => curr.total > best.total ? curr : best) : null
    };
  }, [salaryNum, originCountry, salaryType, calculatedResults, t, i18n.language]);

  if (!compensationData) return null;

  const formatAmount = (amount: number) => {
    return formatCurrency(Math.round(amount), compensationData.currency);
  };

  const maxValue = Math.max(...compensationData.items.map(i => i.value));

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          💼 {t('compensation.title') || 'Compensación Total'}
        </h3>
        <p className={styles.subtitle}>
          {t('compensation.subtitle') || `Tu paquete completo en ${compensationData.countryName}`}
        </p>
      </div>

      <div className={styles.totalCard}>
        <span className={styles.totalLabel}>{t('compensation.totalPackage') || 'Paquete total'}</span>
        <span className={styles.totalValue}>{formatAmount(compensationData.total)}</span>
        <span className={styles.totalNote}>/año</span>
      </div>

      <div className={styles.chartSection}>
        <div className={styles.chart}>
          {compensationData.items.map((item, index) => (
            <motion.div 
              key={item.id}
              className={styles.chartItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <div className={styles.chartInfo}>
                <span className={styles.chartDot} style={{ background: item.color }} />
                <span className={styles.chartName}>{item.name}</span>
              </div>
              <div className={styles.chartBarContainer}>
                <div className={styles.chartBarTrack}>
                  <motion.div 
                    className={styles.chartBarFill}
                    style={{ background: item.color, width: `${(item.value / maxValue) * 100}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / maxValue) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  />
                </div>
              </div>
              <span className={styles.chartValue}>{formatAmount(item.value)}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.pieSection}>
        <h4 className={styles.sectionTitle}>
          {t('compensation.distribution') || 'Distribución'}
        </h4>
        
        <div className={styles.pieChart}>
          {compensationData.items.map((item, index) => {
            const percentage = (item.value / compensationData.total) * 100;
            const prevPercentage = compensationData.items.slice(0, index).reduce((sum, i) => sum + (i.value / compensationData.total) * 100, 0);
            
            return (
              <motion.div
                key={item.id}
                className={styles.pieSegment}
                style={{
                  background: `conic-gradient(${item.color} ${prevPercentage}% ${prevPercentage + percentage}%)`,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              />
            );
          })}
        </div>

        <div className={styles.pieLegend}>
          {compensationData.items.map(item => (
            <div key={item.id} className={styles.pieLegendItem}>
              <span className={styles.pieLegendDot} style={{ background: item.color }} />
              <span className={styles.pieLegendName}>{item.name}</span>
              <span className={styles.pieLegendValue}>
                {((item.value / compensationData.total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {compensationData.otherResults.length > 0 && (
        <div className={styles.comparisonSection}>
          <h4 className={styles.sectionTitle}>
            🌎 {t('compensation.compare') || 'Comparación internacional'}
          </h4>

          <div className={styles.comparisonList}>
            {compensationData.otherResults.map((result, index) => (
              <motion.div 
                key={result.country.id}
                className={styles.comparisonItem}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className={styles.comparisonInfo}>
                  <span className={styles.comparisonFlag}>{result.flag}</span>
                  <span className={styles.comparisonName}>{result.name}</span>
                </div>
                <div className={styles.comparisonValues}>
                  <span className={styles.comparisonTotal}>{formatAmount(result.total)}</span>
                  <span className={`${styles.comparisonDiff} ${result.diff > 0 ? styles.positive : styles.negative}`}>
                    {result.diff > 0 ? '+' : ''}{result.diffPct.toFixed(1)}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {compensationData.bestComp && compensationData.bestComp.diff > 0 && (
            <div className={styles.bestComp}>
              <span>🎯 {t('compensation.best') || 'Mejor compensación'}: {compensationData.bestComp.name} ({formatAmount(compensationData.bestComp.total)})</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default TotalCompensation;
