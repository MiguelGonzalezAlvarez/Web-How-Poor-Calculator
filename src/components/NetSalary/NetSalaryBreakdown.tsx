import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { taxRatesData } from '../../data/taxes';
import styles from './NetSalaryBreakdown.module.scss';

const NetSalaryBreakdown: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, currency, selectedCountry, salaryType, originCountry, calculatedResults } = useAppStore();

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';

  const breakdown = useMemo(() => {
    if (!salaryNum || !selectedCountry) return null;

    const countryId = originCountry?.id || selectedCountry;
    const taxData = taxRatesData[countryId];
    
    if (!taxData) return null;

    let grossSalary: number;
    let netSalary: number;
    
    if (isNet) {
      grossSalary = salaryNum / (1 - taxData.total);
      netSalary = salaryNum;
    } else {
      grossSalary = salaryNum;
      netSalary = salaryNum * (1 - taxData.total);
    }

    const federalTax = grossSalary * taxData.federal;
    const stateTax = grossSalary * taxData.state;
    const socialTax = grossSalary * taxData.social;

    const monthlyGross = grossSalary / 12;
    const monthlyNet = netSalary / 12;

    return {
      gross: grossSalary,
      net: netSalary,
      federal: federalTax,
      state: stateTax,
      social: socialTax,
      totalTax: grossSalary - netSalary,
      monthlyGross,
      monthlyNet,
      taxRate: taxData.total,
      currency: originCountry?.currency || currency,
      currencySymbol: originCountry?.currencySymbol || '$',
      countryName: i18n.language === 'es' ? originCountry?.nameEs : originCountry?.name
    };
  }, [salaryNum, selectedCountry, originCountry, salaryType, currency, i18n.language, isNet]);

  if (!breakdown) return null;

  const formatAmount = (amount: number) => {
    return formatCurrency(Math.round(amount), breakdown.currency);
  };

  const taxPercentage = (breakdown.taxRate * 100).toFixed(0);
  const federalPct = ((breakdown.federal / breakdown.gross) * 100).toFixed(1);
  const statePct = ((breakdown.state / breakdown.gross) * 100).toFixed(1);
  const socialPct = ((breakdown.social / breakdown.gross) * 100).toFixed(1);

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          🧾 {t('netSalary.title') || 'Desglose de Salario'}
        </h3>
        <p className={styles.subtitle}>
          {isNet ? t('netSalary.subtitleNet') || 'De tu salario NETO a BRUTO' : t('netSalary.subtitleGross') || 'De tu salario BRUTO a NETO'}
        </p>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryRow}>
          <span className={styles.summaryLabel}>
            {isNet ? t('netSalary.yourNet') || 'Tu salario NETO' : t('netSalary.yourGross') || 'Tu salario BRUTO'}
          </span>
          <span className={styles.summaryValue}>
            {formatAmount(isNet ? breakdown.net : breakdown.gross)}
          </span>
        </div>
        
        <div className={styles.arrow}>
          {isNet ? '⬆️' : '⬇️'}
        </div>

        <div className={`${styles.summaryRow} ${styles.target}`}>
          <span className={styles.summaryLabel}>
            {isNet ? t('netSalary.equivalentGross') || 'Equivalente BRUTO' : t('netSalary.yourNetResult') || 'Tu salario NETO'}
          </span>
          <span className={styles.summaryValue}>
            {formatAmount(isNet ? breakdown.gross : breakdown.net)}
          </span>
        </div>
      </div>

      <div className={styles.taxBreakdown}>
        <h4 className={styles.sectionTitle}>
          {t('netSalary.taxBreakdown') || 'Desglose de Impuestos'}
        </h4>
        
        <div className={styles.taxBar}>
          <motion.div 
            className={styles.taxSegment}
            style={{ width: `${Number(federalPct)}%`, background: '#ef4444' }}
            initial={{ width: 0 }}
            animate={{ width: `${Number(federalPct)}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div 
            className={styles.taxSegment}
            style={{ width: `${Number(statePct)}%`, background: '#f59e0b' }}
            initial={{ width: 0 }}
            animate={{ width: `${Number(statePct)}%` }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.div 
            className={styles.taxSegment}
            style={{ width: `${Number(socialPct)}%`, background: '#8b5cf6' }}
            initial={{ width: 0 }}
            animate={{ width: `${Number(socialPct)}%` }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
          <motion.div 
            className={styles.taxSegment}
            style={{ width: `${100 - breakdown.taxRate * 100}%`, background: '#22c55e' }}
            initial={{ width: 0 }}
            animate={{ width: `${100 - breakdown.taxRate * 100}%` }}
            transition={{ duration: 0.5, delay: 0.5 }}
          />
        </div>

        <div className={styles.taxLegend}>
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ background: '#ef4444' }} />
            <span className={styles.legendLabel}>{t('netSalary.federal') || 'Federal'}</span>
            <span className={styles.legendValue}>{formatAmount(breakdown.federal)} ({federalPct}%)</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ background: '#f59e0b' }} />
            <span className={styles.legendLabel}>{t('netSalary.state') || 'Estatal'}</span>
            <span className={styles.legendValue}>{formatAmount(breakdown.state)} ({statePct}%)</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ background: '#8b5cf6' }} />
            <span className={styles.legendLabel}>{t('netSalary.social') || 'Social'}</span>
            <span className={styles.legendValue}>{formatAmount(breakdown.social)} ({socialPct}%)</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendColor} style={{ background: '#22c55e' }} />
            <span className={styles.legendLabel}>{t('netSalary.netResult') || 'NETO'}</span>
            <span className={styles.legendValue}>{formatAmount(breakdown.net)} ({(100 - breakdown.taxRate * 100).toFixed(0)}%)</span>
          </div>
        </div>
      </div>

      <div className={styles.monthlyCard}>
        <div className={styles.monthlyItem}>
          <span className={styles.monthlyLabel}>{t('netSalary.monthlyGross') || 'Mensual BRUTO'}</span>
          <span className={styles.monthlyValue}>{formatAmount(breakdown.monthlyGross)}</span>
        </div>
        <div className={styles.monthlyDivider}>=</div>
        <div className={`${styles.monthlyItem} ${styles.net}`}>
          <span className={styles.monthlyLabel}>{t('netSalary.monthlyNet') || 'Mensual NETO'}</span>
          <span className={styles.monthlyValue}>{formatAmount(breakdown.monthlyNet)}</span>
        </div>
      </div>

      <div className={styles.totalTax}>
        <span>{t('netSalary.totalTax') || 'Total impuestos'}</span>
        <span className={styles.taxAmount}>{formatAmount(breakdown.totalTax)} ({taxPercentage}%)</span>
      </div>

      <div className={styles.note}>
        💡 {t('netSalary.note') || 'Impuestos aproximados. Cifras reales pueden variar según situación personal.'}
      </div>
    </motion.div>
  );
};

export default NetSalaryBreakdown;
