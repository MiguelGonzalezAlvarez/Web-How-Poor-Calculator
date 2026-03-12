import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { countries } from '../../data/countries';
import { taxRatesData } from '../../data/taxes';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './OneClickComparison.module.scss';

const OneClickComparison: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [originId, setOriginId] = useState<string>('es');
  const [destId, setDestId] = useState<string>('us');
  const [salary, setSalary] = useState<string>('30000');

  const comparison = useMemo(() => {
    const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
    if (!salaryNum) return null;

    const origin = countries.find(c => c.id === originId);
    const dest = countries.find(c => c.id === destId);
    if (!origin || !dest) return null;

    const originTax = taxRatesData[origin.id];
    const destTax = taxRatesData[dest.id];

    const grossSalary = salaryNum;
    const originNet = grossSalary * (1 - (originTax?.total || 0.30));
    
    const colFactor = (dest.costOfLivingIndex || 70) / (origin.costOfLivingIndex || 70);
    const ppFactor = (dest.purchasingPowerIndex || 70) / (origin.purchasingPowerIndex || 70);
    const multiplier = colFactor * 0.3 + ppFactor * 0.7;
    
    const destGross = grossSalary * multiplier;
    const destNet = destGross * (1 - (destTax?.total || 0.30));

    const netDiff = destNet - originNet;
    const netDiffPct = ((netDiff / originNet) * 100);

    return {
      origin,
      dest,
      grossSalary,
      originNet,
      destGross,
      destNet,
      netDiff,
      netDiffPct,
      colFactor,
      ppFactor
    };
  }, [originId, destId, salary]);

  if (!comparison) return null;

  const getStatus = () => {
    if (comparison.netDiffPct > 20) return { label: t('oneclick.muchBetter') || 'Mucho mejor', class: styles.muchBetter };
    if (comparison.netDiffPct > 5) return { label: t('oneclick.better') || 'Mejor', class: styles.better };
    if (comparison.netDiffPct > -5) return { label: t('oneclick.similar') || 'Similar', class: styles.similar };
    if (comparison.netDiffPct > -20) return { label: t('oneclick.worse') || 'Peor', class: styles.worse };
    return { label: t('oneclick.muchWorse') || 'Mucho peor', class: styles.muchWorse };
  };

  const status = getStatus();

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          ⚡ {t('oneclick.title') || 'Comparación Rápida'}
        </h3>
        <p className={styles.subtitle}>
          {t('oneclick.subtitle') || 'Compara instantáneamente entre países'}
        </p>
      </div>

      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>{t('oneclick.origin') || 'Origen'}</label>
          <select 
            className={styles.select}
            value={originId}
            onChange={(e) => setOriginId(e.target.value)}
          >
            {countries.map(c => (
              <option key={c.id} value={c.id}>
                {c.flag} {i18n.language === 'es' ? c.nameEs : c.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.salaryInputGroup}>
          <label className={styles.label}>{t('oneclick.salary') || 'Salario'}</label>
          <input
            type="text"
            className={styles.input}
            value={salary}
            onChange={(e) => setSalary(e.target.value.replace(/[^0-9]/g, ''))}
            placeholder="30000"
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>{t('oneclick.destination') || 'Destino'}</label>
          <select 
            className={styles.select}
            value={destId}
            onChange={(e) => setDestId(e.target.value)}
          >
            {countries.filter(c => c.id !== originId).map(c => (
              <option key={c.id} value={c.id}>
                {c.flag} {i18n.language === 'es' ? c.nameEs : c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.result}>
        <div className={styles.countriesDisplay}>
          <div className={styles.countryItem}>
            <span className={styles.flag}>{comparison.origin.flag}</span>
            <span className={styles.countryName}>
              {i18n.language === 'es' ? comparison.origin.nameEs : comparison.origin.name}
            </span>
            <span className={styles.netSalary}>
              {formatCurrency(Math.round(comparison.originNet), comparison.origin.currency)}
            </span>
          </div>

          <div className={styles.arrow}>
            {comparison.netDiff > 0 ? '→' : comparison.netDiff < 0 ? '←' : '↔'}
          </div>

          <div className={styles.countryItem}>
            <span className={styles.flag}>{comparison.dest.flag}</span>
            <span className={styles.countryName}>
              {i18n.language === 'es' ? comparison.dest.nameEs : comparison.dest.name}
            </span>
            <span className={styles.netSalary}>
              {formatCurrency(Math.round(comparison.destNet), comparison.dest.currency)}
            </span>
          </div>
        </div>

        <div className={`${styles.statusBadge} ${status.class}`}>
          {status.label}
        </div>

        <div className={styles.differences}>
          <div className={styles.diffItem}>
            <span className={styles.diffLabel}>{t('oneclick.difference') || 'Diferencia'}</span>
            <span className={`${styles.diffValue} ${comparison.netDiff > 0 ? styles.positive : styles.negative}`}>
              {comparison.netDiff > 0 ? '+' : ''}{formatCurrency(Math.round(comparison.netDiff), comparison.dest.currency)}/año
            </span>
          </div>
          <div className={styles.diffItem}>
            <span className={styles.diffLabel}>{t('oneclick.percentage') || 'Porcentaje'}</span>
            <span className={`${styles.diffValue} ${comparison.netDiffPct > 0 ? styles.positive : styles.negative}`}>
              {comparison.netDiffPct > 0 ? '+' : ''}{comparison.netDiffPct.toFixed(1)}%
            </span>
          </div>
          <div className={styles.diffItem}>
            <span className={styles.diffLabel}>{t('oneclick.colChange') || 'Cambio COL'}</span>
            <span className={styles.diffValue}>
              {comparison.colFactor > 1 ? '+' : ''}{((comparison.colFactor - 1) * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        <div className={styles.quickAdvice}>
          {comparison.netDiffPct > 10 ? (
            <p>✅ {t('oneclick.adviceGood') || '¡Excelente oportunidad! Tu poder adquisitivo aumentaría significativamente.'}</p>
          ) : comparison.netDiffPct > -10 ? (
            <p>➖ {t('oneclick.adviceSimilar') || 'Nivel de vida similar. Considera otros factores como calidad de vida.'}</p>
          ) : (
            <p>⚠️ {t('oneclick.adviceBad') || 'El costo de vida es significativamente mayor. Necesitarías un salary más alto.'}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OneClickComparison;
