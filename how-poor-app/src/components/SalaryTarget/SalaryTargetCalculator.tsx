import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { taxRatesData } from '../../data/taxes';
import { getPercentilesByIndustry } from '../../data/salaryTrends';
import { countries } from '../../data/countries';
import styles from './SalaryTargetCalculator.module.scss';

const SalaryTargetCalculator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { 
    salary, 
    currency, 
    selectedCountry, 
    industry, 
    salaryType,
    originCountry 
  } = useAppStore();

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  
  const targetResults = useMemo(() => {
    if (!salaryNum || !selectedCountry || !originCountry) return null;

    const originCountryData = countries.find(c => c.id === selectedCountry);
    const destCountryData = originCountry;
    
    if (!originCountryData || !destCountryData) return null;

    const originCOL = originCountryData.costOfLivingIndex || 70;
    const destCOL = destCountryData.costOfLivingIndex || 70;
    const originPP = originCountryData.purchasingPowerIndex || 70;
    const destPP = destCountryData.purchasingPowerIndex || 70;

    const colFactor = destCOL / originCOL;
    const ppFactor = destPP / originPP;
    
    const baseMultiplier = (colFactor * 0.4 + ppFactor * 0.6);
    
    const min = Math.round(salaryNum * baseMultiplier * 0.85);
    const recommended = Math.round(salaryNum * baseMultiplier);
    const optimal = Math.round(salaryNum * baseMultiplier * 1.25);

    const originTax = taxRatesData[selectedCountry];
    const destTax = taxRatesData[originCountry.id];
    
    const isNet = salaryType === 'net';
    const grossMultiplier = isNet ? (1 / (1 - (originTax?.total || 0.30))) : 1;
    
    const salaryAsGross = salaryNum * grossMultiplier;
    
    const minGross = Math.round(min * (1 / (1 - (destTax?.total || 0.30))));
    const recommendedGross = Math.round(recommended * (1 / (1 - (destTax?.total || 0.30))));
    const optimalGross = Math.round(optimal * (1 / (1 - (destTax?.total || 0.30))));

    const percentiles = getPercentilesByIndustry(originCountry.id, industry);
    const marketMedian = percentiles?.p50 || recommendedGross;

    return {
      minimum: isNet ? min : minGross,
      recommended: isNet ? recommended : recommendedGross,
      optimal: isNet ? optimal : optimalGross,
      marketMedian,
      currency: destCountryData.currency,
      currencySymbol: destCountryData.currencySymbol,
      colFactor: ((colFactor - 1) * 100).toFixed(0),
      ppFactor: ((ppFactor - 1) * 100).toFixed(0),
      isNet
    };
  }, [salaryNum, selectedCountry, originCountry, industry, salaryType]);

  if (!targetResults) return null;

  const getDifference = (value: number) => {
    const diff = value - salaryNum;
    const percent = ((diff / salaryNum) * 100).toFixed(0);
    return { diff, percent: Math.round(Number(percent)) };
  };

  const minDiff = getDifference(targetResults.minimum);
  const recDiff = getDifference(targetResults.recommended);
  const optDiff = getDifference(targetResults.optimal);

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          💰 {t('salaryTarget.title') || '¿Cuánto deberías pedir?'}
        </h3>
        <p className={styles.subtitle}>
          {t('salaryTarget.subtitle') || `Basado en tu salario actual de ${formatCurrency(salaryNum, currency)}`}
        </p>
      </div>

      <div className={styles.cardsGrid}>
        <motion.div 
          className={`${styles.card} ${styles.minimum}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.cardBadge}>{t('salaryTarget.minimum') || 'Mínimo'}</div>
          <div className={styles.cardValue}>
            {formatCurrency(targetResults.minimum, targetResults.currency)}
          </div>
          <div className={styles.cardDiff}>
            <span className={minDiff.diff >= 0 ? styles.positive : styles.negative}>
              {minDiff.diff >= 0 ? '+' : ''}{minDiff.percent}%
            </span>
            <span className={styles.diffLabel}>
              {minDiff.diff >= 0 ? t('salaryTarget.more') : t('salaryTarget.less')}
            </span>
          </div>
          <p className={styles.cardDesc}>
            {t('salaryTarget.minimumDesc') || 'Para mantener tu nivel de vida actual'}
          </p>
        </motion.div>

        <motion.div 
          className={`${styles.card} ${styles.recommended}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.cardBadge}>{t('salaryTarget.recommended') || 'Recomendado'}</div>
          <div className={styles.cardValue}>
            {formatCurrency(targetResults.recommended, targetResults.currency)}
          </div>
          <div className={styles.cardDiff}>
            <span className={recDiff.diff >= 0 ? styles.positive : styles.negative}>
              {recDiff.diff >= 0 ? '+' : ''}{recDiff.percent}%
            </span>
            <span className={styles.diffLabel}>
              {recDiff.diff >= 0 ? t('salaryTarget.more') : t('salaryTarget.less')}
            </span>
          </div>
          <p className={styles.cardDesc}>
            {t('salaryTarget.recommendedDesc') || 'Para mejorar tu poder adquisitivo'}
          </p>
        </motion.div>

        <motion.div 
          className={`${styles.card} ${styles.optimal}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.cardBadge}>{t('salaryTarget.optimal') || 'Óptimo'}</div>
          <div className={styles.cardValue}>
            {formatCurrency(targetResults.optimal, targetResults.currency)}
          </div>
          <div className={styles.cardDiff}>
            <span className={optDiff.diff >= 0 ? styles.positive : styles.negative}>
              {optDiff.diff >= 0 ? '+' : ''}{optDiff.percent}%
            </span>
            <span className={styles.diffLabel}>
              {optDiff.diff >= 0 ? t('salaryTarget.more') : t('salaryTarget.less')}
            </span>
          </div>
          <p className={styles.cardDesc}>
            {t('salaryTarget.optimalDesc') || 'Para maximizar tu compensación'}
          </p>
        </motion.div>
      </div>

      <div className={styles.marketContext}>
        <div className={styles.marketItem}>
          <span className={styles.marketLabel}>
            {t('salaryTarget.medianMarket') || 'Mediana del mercado'}:
          </span>
          <span className={styles.marketValue}>
            {formatCurrency(targetResults.marketMedian, targetResults.currency)}
          </span>
        </div>
        <div className={styles.marketItem}>
          <span className={styles.marketLabel}>
            {t('salaryTarget.colDifference') || 'Diferencia costo de vida'}:
          </span>
          <span className={`${styles.marketValue} ${Number(targetResults.colFactor) > 0 ? styles.negative : styles.positive}`}>
            {Number(targetResults.colFactor) > 0 ? '+' : ''}{targetResults.colFactor}%
          </span>
        </div>
      </div>

      {targetResults.isNet && (
        <p className={styles.netNote}>
          💡 {t('salaryTarget.netNote') || 'Cifras en salario NETO (después de impuestos)'}
        </p>
      )}

      <div className={styles.tips}>
        <h4 className={styles.tipsTitle}>
          🎯 {t('salaryTarget.tips') || 'Consejos para negociar'}
        </h4>
        <ul className={styles.tipsList}>
          <li>{t('salaryTarget.tip1') || 'Usa el rango recomendado como punto de partida'}</li>
          <li>{t('salaryTarget.tip2') || 'Investiga beneficios adicionales que puedas negociar'}</li>
          <li>{t('salaryTarget.tip3') || 'Considera el costo de vida real, no solo el salario'}</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SalaryTargetCalculator;
