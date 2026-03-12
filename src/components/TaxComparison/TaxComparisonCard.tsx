import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { taxRatesData } from '../../data/taxes';
import { countries } from '../../data/countries';
import styles from './TaxComparisonCard.module.scss';

const TaxComparisonCard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, currency, selectedCountry, originCountry, salaryType } = useAppStore();

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';

  const comparison = useMemo(() => {
    if (!salaryNum || !selectedCountry || !originCountry) return null;

    const originTax = taxRatesData[originCountry.id];
    const destTax = taxRatesData[selectedCountry];
    
    if (!originTax || !destTax) return null;

    let grossSalary: number;
    let netInOrigin: number;
    
    if (isNet) {
      grossSalary = salaryNum / (1 - originTax.total);
      netInOrigin = salaryNum;
    } else {
      grossSalary = salaryNum;
      netInOrigin = salaryNum * (1 - originTax.total);
    }

    const netInDestNet = grossSalary * (1 - destTax.total);

    const originCurrency = originCountry.currency;
    const destCurrency = countries.find(c => c.id === selectedCountry)?.currency || originCurrency;

    const originName = i18n.language === 'es' ? originCountry.nameEs : originCountry.name;
    const destName = i18n.language === 'es' 
      ? countries.find(c => c.id === selectedCountry)?.nameEs 
      : countries.find(c => c.id === selectedCountry)?.name;

    const taxDiff = ((destTax.total - originTax.total) * 100).toFixed(1);
    const netDiff = netInDestNet - netInOrigin;
    const netDiffPct = ((netDiff / netInOrigin) * 100).toFixed(1);

    return {
      origin: {
        name: originName,
        flag: originCountry.flag,
        currency: originCurrency,
        taxRate: originTax.total,
        netSalary: netInOrigin
      },
      destination: {
        name: destName || '',
        flag: countries.find(c => c.id === selectedCountry)?.flag || '',
        currency: destCurrency,
        taxRate: destTax.total,
        netSalary: netInDestNet
      },
      taxDiff: Number(taxDiff),
      netDiff,
      netDiffPct: Number(netDiffPct),
      isNet
    };
  }, [salaryNum, selectedCountry, originCountry, salaryType, i18n.language]);

  if (!comparison) return null;

  const formatSalary = (amount: number, curr: string) => {
    return formatCurrency(Math.round(amount), curr);
  };

  const getBetterLabel = () => {
    if (comparison.netDiff > 0) {
      return { text: t('taxCompare.better') || 'Mejor en destino', class: styles.positive };
    } else if (comparison.netDiff < 0) {
      return { text: t('taxCompare.worse') || 'Peor en destino', class: styles.negative };
    }
    return { text: t('taxCompare.similar') || 'Similar', class: styles.neutral };
  };

  const betterLabel = getBetterLabel();

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          ⚖️ {t('taxCompare.title') || 'Comparación de Impuestos'}
        </h3>
        <p className={styles.subtitle}>
          {t('taxCompare.subtitle') || '¿Cuánto más o menos impuestos pagarías?'}
        </p>
      </div>

      <div className={styles.countriesRow}>
        <div className={styles.countryCard}>
          <span className={styles.flag}>{comparison.origin.flag}</span>
          <span className={styles.countryName}>{comparison.origin.name}</span>
          <div className={styles.taxRate}>
            {(comparison.origin.taxRate * 100).toFixed(0)}%
          </div>
          <div className={styles.netSalary}>
            {formatSalary(comparison.origin.netSalary, comparison.origin.currency)}/año
          </div>
        </div>

        <div className={styles.comparisonSymbol}>
          {comparison.netDiff > 0 ? '📈' : comparison.netDiff < 0 ? '📉' : '➡️'}
          <span className={`${styles.diffBadge} ${betterLabel.class}`}>
            {betterLabel.text}
          </span>
        </div>

        <div className={styles.countryCard}>
          <span className={styles.flag}>{comparison.destination.flag}</span>
          <span className={styles.countryName}>{comparison.destination.name}</span>
          <div className={styles.taxRate}>
            {(comparison.destination.taxRate * 100).toFixed(0)}%
          </div>
          <div className={styles.netSalary}>
            {formatSalary(comparison.destination.netSalary, comparison.destination.currency)}/año
          </div>
        </div>
      </div>

      <div className={styles.analysis}>
        <div className={styles.analysisItem}>
          <span className={styles.analysisLabel}>
            {t('taxCompare.taxDifference') || 'Diferencia en impuestos'}
          </span>
          <span className={`${styles.analysisValue} ${comparison.taxDiff > 0 ? styles.negative : styles.positive}`}>
            {comparison.taxDiff > 0 ? '+' : ''}{comparison.taxDiff}%
          </span>
        </div>
        <div className={styles.analysisItem}>
          <span className={styles.analysisLabel}>
            {t('taxCompare.netDifference') || 'Diferencia en salario NETO'}
          </span>
          <span className={`${styles.analysisValue} ${comparison.netDiff > 0 ? styles.positive : styles.negative}`}>
            {comparison.netDiff > 0 ? '+' : ''}{formatSalary(Math.abs(comparison.netDiff), comparison.origin.currency)}/año
            ({comparison.netDiffPct > 0 ? '+' : ''}{comparison.netDiffPct}%)
          </span>
        </div>
      </div>

      <div className={styles.insight}>
        {comparison.netDiff > 0 ? (
          <p>✅ {t('taxCompare.insightBetter') || `En ${comparison.destination.name} pagarías menos impuestos y tendrías más ingreso neto.`}</p>
        ) : comparison.netDiff < 0 ? (
          <p>⚠️ {t('taxCompare.insightWorse') || `En ${comparison.destination.name} pagarías más impuestos. Considera negociar un salario más alto para compensar.`}</p>
        ) : (
          <p>➖ {t('taxCompare.insightSimilar') || `Ambos países tienen una carga fiscal similar.`}</p>
        )}
      </div>

      <div className={styles.barComparison}>
        <div className={styles.barItem}>
          <span className={styles.barLabel}>{comparison.origin.name}</span>
          <div className={styles.barTrack}>
            <motion.div 
              className={styles.barFill}
              style={{ background: '#3b82f6' }}
              initial={{ width: 0 }}
              animate={{ width: `${comparison.origin.taxRate * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span className={styles.barValue}>{(comparison.origin.taxRate * 100).toFixed(0)}%</span>
        </div>
        <div className={styles.barItem}>
          <span className={styles.barLabel}>{comparison.destination.name}</span>
          <div className={styles.barTrack}>
            <motion.div 
              className={styles.barFill}
              style={{ background: '#ef4444' }}
              initial={{ width: 0 }}
              animate={{ width: `${comparison.destination.taxRate * 100}%` }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
          </div>
          <span className={styles.barValue}>{(comparison.destination.taxRate * 100).toFixed(0)}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TaxComparisonCard;
