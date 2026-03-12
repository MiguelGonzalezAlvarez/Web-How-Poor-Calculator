import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { getRelocationData, getTotalRelocationCost, getMonthlyBuffer } from '../../data/relocation';
import { countries } from '../../data/countries';
import styles from './RelocationCosts.module.scss';

const RelocationCosts: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, selectedCountry, originCountry, calculatedResults } = useAppStore();

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;

  const relocationData = useMemo(() => {
    if (!selectedCountry || !originCountry) return null;

    const data = getRelocationData(selectedCountry);
    const totals = getTotalRelocationCost(selectedCountry);
    const buffer = getMonthlyBuffer(selectedCountry);

    const destCountry = countries.find(c => c.id === selectedCountry);
    if (!destCountry) return null;

    const breakdown = data?.initialCosts.map(item => ({
      category: i18n.language === 'es' ? item.categoryEs : item.category,
      min: item.minCostUSD,
      max: item.maxCostUSD,
      avg: Math.round((item.minCostUSD + item.maxCostUSD) / 2)
    })) || [];

    const monthsOfBuffer = 3;
    const totalInitial = Math.round((totals.min + totals.max) / 2);
    const bufferTotal = Math.round((buffer.min + buffer.max) / 2 * monthsOfBuffer);

    return {
      countryName: i18n.language === 'es' ? destCountry.nameEs : destCountry.name,
      countryFlag: destCountry.flag,
      breakdown,
      totalInitial,
      bufferMonthly: Math.round((buffer.min + buffer.max) / 2),
      bufferTotal,
      totalRelocation: totalInitial + bufferTotal,
      monthsOfBuffer,
      hasVisaData: data?.visas && data.visas.length > 0,
      visas: data?.visas || []
    };
  }, [selectedCountry, originCountry, i18n.language]);

  if (!relocationData) return null;

  const formatUSD = (amount: number) => formatCurrency(amount, 'USD');

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          ✈️ {t('relocation.title') || 'Costos de Relocación'}
        </h3>
        <p className={styles.subtitle}>
          {t('relocation.subtitle') || `¿Cuánto necesitas para mudarte a ${relocationData.countryName}?`}
        </p>
      </div>

      <div className={styles.summaryCards}>
        <motion.div 
          className={styles.summaryCard}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className={styles.cardIcon}>💰</div>
          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>{t('relocation.initialCosts') || 'Costos iniciales'}</span>
            <span className={styles.cardValue}>{formatUSD(relocationData.totalInitial)}</span>
          </div>
        </motion.div>

        <motion.div 
          className={styles.summaryCard}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.cardIcon}>🛡️</div>
          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>{t('relocation.bufferFund') || 'Fondo de seguridad'}</span>
            <span className={styles.cardValue}>{formatUSD(relocationData.bufferTotal)}</span>
            <span className={styles.cardSubtext}>({relocationData.monthsOfBuffer} meses)</span>
          </div>
        </motion.div>

        <motion.div 
          className={`${styles.summaryCard} ${styles.highlight}`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.cardIcon}>🎯</div>
          <div className={styles.cardContent}>
            <span className={styles.cardLabel}>{t('relocation.totalNeeded') || 'Total necesario'}</span>
            <span className={styles.cardValue}>{formatUSD(relocationData.totalRelocation)}</span>
          </div>
        </motion.div>
      </div>

      <div className={styles.breakdownSection}>
        <h4 className={styles.sectionTitle}>
          📋 {t('relocation.breakdown') || 'Desglose de costos'}
        </h4>
        
        <div className={styles.breakdownList}>
          {relocationData.breakdown.map((item, index) => (
            <motion.div 
              key={index}
              className={styles.breakdownItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <span className={styles.itemCategory}>{item.category}</span>
              <div className={styles.itemBar}>
                <motion.div 
                  className={styles.itemBarFill}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((item.avg / relocationData.totalInitial) * 100, 100)}%` }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                />
              </div>
              <span className={styles.itemValue}>{formatUSD(item.avg)}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.advice}>
        <h4 className={styles.adviceTitle}>💡 {t('relocation.advice') || 'Consejos'}</h4>
        <ul className={styles.adviceList}>
          <li>{t('relocation.advice1') || ' negocia ayuda de reubicación con tu nuevo empleador'}</li>
          <li>{t('relocation.advice2') || ' considera ciudades más económicas dentro del país'}</li>
          <li>{t('relocation.advice3') || ' el fondo de seguridad cubre imprevistos iniciales'}</li>
        </ul>
      </div>

      <div className={styles.monthlyNote}>
        📅 {t('relocation.monthlyNote') || `Necesitarás aproximadamente ${formatUSD(relocationData.bufferMonthly)}/mes adicionales mientras te estabilizas`}
      </div>
    </motion.div>
  );
};

export default RelocationCosts;
