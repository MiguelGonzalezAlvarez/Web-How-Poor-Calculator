import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { categoryWeights, getCategoryAdjustment } from '../../data/categories';
import { getTaxRate, getTaxBreakdown } from '../../data/taxes';
import styles from './CostBreakdown.module.scss';

const CostBreakdown: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, currency, originCountry, originRegion, salaryType } = useAppStore();

  if (!originCountry || !originRegion) return null;

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';
  
  const originTax = getTaxRate(originCountry.code);
  const taxBreakdown = getTaxBreakdown(salaryNum, originCountry.code);
  
  const monthlySalary = salaryNum / 12;
  const netMonthly = isNet ? monthlySalary : taxBreakdown.netSalary / 12;
  
  const getDestCost = (destCountryId: string, category: string): number => {
    const adjustment = getCategoryAdjustment(destCountryId, category);
    return netMonthly * adjustment;
  };

  const originCost = (cat: typeof categoryWeights[0]) => {
    const adjustment = getCategoryAdjustment(originCountry.id, cat.category);
    return netMonthly * cat.weight * adjustment;
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          📊 {t('costBreakdown.title') || 'Desglose de gastos mensuales'}
        </h3>
        <p className={styles.subtitle}>
          {t('costBreakdown.subtitle') || `Basado en tu salario ${isNet ? 'neto' : 'bruto'} de ${formatCurrency(salaryNum, currency)}`}
        </p>
      </div>

      {!isNet && (
        <div className={styles.taxSection}>
          <h4 className={styles.sectionTitle}>💸 Impuestos en {originCountry.nameEs}</h4>
          <div className={styles.taxGrid}>
            <div className={styles.taxItem}>
              <span className={styles.taxLabel}>{t('costBreakdown.gross') || 'Bruto'}</span>
              <span className={styles.taxValue}>{formatCurrency(taxBreakdown.gross, currency)}</span>
            </div>
            <div className={styles.taxItem}>
              <span className={styles.taxLabel}>{t('costBreakdown.federalTax') || 'Impuestos'}</span>
              <span className={styles.taxValue}>-{formatCurrency(taxBreakdown.totalTax, currency)}</span>
            </div>
            <div className={`${styles.taxItem} ${styles.highlight}`}>
              <span className={styles.taxLabel}>{t('costBreakdown.net') || 'Neto'}</span>
              <span className={styles.taxValue}>{formatCurrency(taxBreakdown.netSalary, currency)}</span>
            </div>
          </div>
          <p className={styles.taxNote}>
            Tasa efectiva: {(originTax.total * 100).toFixed(0)}%
          </p>
        </div>
      )}

      <div className={styles.categories}>
        <h4 className={styles.sectionTitle}>
          🏠 {t('costBreakdown.monthlyExpenses') || 'Gastos mensuales estimados'}
        </h4>
        {categoryWeights.map((cat, index) => (
          <motion.div 
            key={cat.category}
            className={styles.category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className={styles.categoryHeader}>
              <span className={styles.categoryIcon}>{cat.icon}</span>
              <span className={styles.categoryName}>
                {i18n.language === 'es' ? cat.categoryEs : cat.category}
              </span>
              <span className={styles.categoryAmount}>
                {formatCurrency(originCost(cat), currency)}
              </span>
            </div>
            <div className={styles.categoryBar}>
              <motion.div 
                className={styles.categoryFill}
                initial={{ width: 0 }}
                animate={{ width: `${cat.weight * 100}%` }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ background: getCategoryColor(cat.category) }}
              />
            </div>
            <span className={styles.categoryPercent}>
              {(cat.weight * 100).toFixed(0)}%
            </span>
          </motion.div>
        ))}
      </div>

      <div className={styles.totalSection}>
        <div className={styles.totalItem}>
          <span className={styles.totalLabel}>
            {t('costBreakdown.monthlyNet') || 'Neto mensual'}
          </span>
          <span className={styles.totalValue}>
            {formatCurrency(netMonthly, currency)}
          </span>
        </div>
        <div className={styles.totalItem}>
          <span className={styles.totalLabel}>
            {t('costBreakdown.annualNet') || 'Neto anual'}
          </span>
          <span className={styles.totalValue}>
            {formatCurrency(taxBreakdown.netSalary, currency)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    housing: '#3b82f6',
    food: '#22c55e',
    transport: '#f59e0b',
    entertainment: '#8b5cf6',
    fashion: '#ec4899',
    services: '#06b6d4'
  };
  return colors[category] || '#6b7280';
};

export default CostBreakdown;
