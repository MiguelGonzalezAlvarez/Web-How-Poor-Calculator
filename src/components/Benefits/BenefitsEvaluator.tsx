import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { getBenefits, calculateTotalCompensation } from '../../data/benefits';
import styles from './BenefitsEvaluator.module.scss';

interface BenefitOption {
  id: string;
  name: string;
  nameEs: string;
  icon: string;
  type: 'percentage' | 'fixed' | 'boolean';
  defaultValue: number;
  maxValue: number;
  step: number;
}

const benefitOptions: BenefitOption[] = [
  { id: 'bonus', name: 'Annual Bonus', nameEs: 'Bono anual', icon: '💰', type: 'percentage', defaultValue: 0.10, maxValue: 0.50, step: 0.02 },
  { id: 'equity', name: 'Stock/RSU', nameEs: 'Stock/RSU', icon: '📈', type: 'percentage', defaultValue: 0.10, maxValue: 0.30, step: 0.02 },
  { id: 'vacation', name: 'Vacation Days', nameEs: 'Días de vacaciones', icon: '🏖️', type: 'fixed', defaultValue: 20, maxValue: 35, step: 1 },
  { id: 'remoteStipend', name: 'Remote Stipend', nameEs: 'Subsidio remoto', icon: '🏠', type: 'fixed', defaultValue: 50, maxValue: 500, step: 25 },
  { id: 'healthInsurance', name: 'Health Insurance Value', nameEs: 'Valor seguro médico', icon: '🏥', type: 'fixed', defaultValue: 200, maxCostValue: 1000, step: 50 }
];

const BenefitsEvaluator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, originCountry, salaryType } = useAppStore();
  
  const [selectedBenefits, setSelectedBenefits] = useState({
    bonus: 0.10,
    equity: 0.10,
    vacation: 20,
    remoteStipend: 50,
    healthInsurance: 200
  });

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';

  const benefitsData = useMemo(() => {
    if (!salaryNum || !originCountry) return null;

    const countryId = originCountry.id;
    const countryBenefits = getBenefits(countryId);
    
    const taxRate = isNet ? 0.30 : 0.30;
    const grossSalary = isNet ? salaryNum / (1 - taxRate) : salaryNum;

    const bonusValue = grossSalary * selectedBenefits.bonus;
    const equityValue = grossSalary * selectedBenefits.equity;
    const healthValue = selectedBenefits.healthInsurance * 12;
    const remoteValue = selectedBenefits.remoteStipend * 12;
    const vacationValue = selectedBenefits.vacation > countryBenefits.vacationDays 
      ? (selectedBenefits.vacation - countryBenefits.vacationDays) * 50 
      : 0;

    const totalBenefits = bonusValue + equityValue + healthValue + remoteValue + vacationValue;
    const totalCompensation = grossSalary + totalBenefits;

    return {
      countryName: i18n.language === 'es' ? originCountry.nameEs : originCountry.name,
      currency: originCountry.currency,
      currencySymbol: originCountry.currencySymbol,
      baseSalary: grossSalary,
      bonus: bonusValue,
      equity: equityValue,
      health: healthValue,
      remote: remoteValue,
      vacationExtra: vacationValue,
      totalBenefits,
      totalCompensation,
      typicalBonus: countryBenefits.typicalBonus,
      typicalEquity: countryBenefits.equityTypical,
      typicalVacation: countryBenefits.vacationDays,
      typicalRemote: countryBenefits.remoteStipend
    };
  }, [salaryNum, originCountry, salaryType, selectedBenefits, i18n.language]);

  const handleBenefitChange = (benefitId: string, value: number) => {
    setSelectedBenefits(prev => ({
      ...prev,
      [benefitId]: value
    }));
  };

  if (!benefitsData) return null;

  const formatAmount = (amount: number) => {
    return formatCurrency(Math.round(amount), benefitsData.currency);
  };

  const getValueClass = (current: number, typical: number) => {
    if (current >= typical * 1.2) return styles.above;
    if (current >= typical * 0.8) return styles.average;
    return styles.below;
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
          🎁 {t('benefits.title') || 'Evaluador de Beneficios'}
        </h3>
        <p className={styles.subtitle}>
          {t('benefits.subtitle') || `Calcula tu compensación total en ${benefitsData.countryName}`}
        </p>
      </div>

      <div className={styles.summaryCard}>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>{t('benefits.baseSalary') || 'Salario base'}</span>
          <span className={styles.summaryValue}>{formatAmount(benefitsData.baseSalary)}</span>
        </div>
        <div className={styles.summaryDivider}>+</div>
        <div className={styles.summaryItem}>
          <span className={styles.summaryLabel}>{t('benefits.totalBenefits') || 'Beneficios'}</span>
          <span className={styles.summaryValueBenefits}>{formatAmount(benefitsData.totalBenefits)}</span>
        </div>
        <div className={styles.summaryDivider}>=</div>
        <div className={`${styles.summaryItem} ${styles.highlight}`}>
          <span className={styles.summaryLabel}>{t('benefits.totalComp') || 'Compensación total'}</span>
          <span className={styles.summaryValueTotal}>{formatAmount(benefitsData.totalCompensation)}</span>
        </div>
      </div>

      <div className={styles.slidersSection}>
        <h4 className={styles.sectionTitle}>
          {t('benefits.customize') || 'Personaliza tus beneficios'}
        </h4>

        <div className={styles.sliderGroup}>
          <div className={styles.sliderItem}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderIcon}>💰</span>
              <span className={styles.sliderLabel}>{t('benefits.bonus') || 'Bono anual'}</span>
              <span className={`${styles.sliderValue} ${getValueClass(selectedBenefits.bonus, benefitsData.typicalBonus)}`}>
                {(selectedBenefits.bonus * 100).toFixed(0)}% ({formatAmount(benefitsData.bonus)})
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="0.50" 
              step="0.02" 
              value={selectedBenefits.bonus}
              onChange={(e) => handleBenefitChange('bonus', parseFloat(e.target.value))}
              className={styles.slider}
            />
            <span className={styles.sliderHint}>{t('benefits.typical') || 'Típico'}: {(benefitsData.typicalBonus * 100).toFixed(0)}%</span>
          </div>

          <div className={styles.sliderItem}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderIcon}>📈</span>
              <span className={styles.sliderLabel}>{t('benefits.equity') || 'Stock/RSU'}</span>
              <span className={`${styles.sliderValue} ${getValueClass(selectedBenefits.equity, benefitsData.typicalEquity)}`}>
                {(selectedBenefits.equity * 100).toFixed(0)}% ({formatAmount(benefitsData.equity)})
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="0.30" 
              step="0.02" 
              value={selectedBenefits.equity}
              onChange={(e) => handleBenefitChange('equity', parseFloat(e.target.value))}
              className={styles.slider}
            />
            <span className={styles.sliderHint}>{t('benefits.typical') || 'Típico'}: {(benefitsData.typicalEquity * 100).toFixed(0)}%</span>
          </div>

          <div className={styles.sliderItem}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderIcon}>🏖️</span>
              <span className={styles.sliderLabel}>{t('benefits.vacation') || 'Días de vacaciones'}</span>
              <span className={`${styles.sliderValue} ${selectedBenefits.vacation >= benefitsData.typicalVacation ? styles.above : styles.below}`}>
                {selectedBenefits.vacation} días
              </span>
            </div>
            <input 
              type="range" 
              min="10" 
              max="35" 
              step="1" 
              value={selectedBenefits.vacation}
              onChange={(e) => handleBenefitChange('vacation', parseInt(e.target.value))}
              className={styles.slider}
            />
            <span className={styles.sliderHint}>{t('benefits.typical') || 'Típico'}: {benefitsData.typicalVacation} días</span>
          </div>

          <div className={styles.sliderItem}>
            <div className={styles.sliderHeader}>
              <span className={styles.sliderIcon}>🏠</span>
              <span className={styles.sliderLabel}>{t('benefits.remote') || 'Subsidio remoto'}</span>
              <span className={styles.sliderValue}>
                {formatAmount(selectedBenefits.remoteStipend)}/mes
              </span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="500" 
              step="25" 
              value={selectedBenefits.remoteStipend}
              onChange={(e) => handleBenefitChange('remoteStipend', parseInt(e.target.value))}
              className={styles.slider}
            />
            <span className={styles.sliderHint}>{t('benefits.typical') || 'Típico'}: {benefitsData.typicalRemote}/mes</span>
          </div>
        </div>
      </div>

      <div className={styles.breakdownSection}>
        <h4 className={styles.sectionTitle}>
          {t('benefits.breakdown') || 'Desglose de compensación'}
        </h4>
        
        <div className={styles.breakdownBar}>
          <motion.div 
            className={styles.barSegment}
            style={{ width: `${(benefitsData.baseSalary / benefitsData.totalCompensation) * 100}%`, background: '#3b82f6' }}
            initial={{ width: 0 }}
            animate={{ width: `${(benefitsData.baseSalary / benefitsData.totalCompensation) * 100}%` }}
          />
          <motion.div 
            className={styles.barSegment}
            style={{ width: `${(benefitsData.bonus / benefitsData.totalCompensation) * 100}%`, background: '#22c55e' }}
            initial={{ width: 0 }}
            animate={{ width: `${(benefitsData.bonus / benefitsData.totalCompensation) * 100}%` }}
            transition={{ delay: 0.1 }}
          />
          <motion.div 
            className={styles.barSegment}
            style={{ width: `${(benefitsData.equity / benefitsData.totalCompensation) * 100}%`, background: '#8b5cf6' }}
            initial={{ width: 0 }}
            animate={{ width: `${(benefitsData.equity / benefitsData.totalCompensation) * 100}%` }}
            transition={{ delay: 0.2 }}
          />
          <motion.div 
            className={styles.barSegment}
            style={{ width: `${((benefitsData.health + benefitsData.remote) / benefitsData.totalCompensation) * 100}%`, background: '#f59e0b' }}
            initial={{ width: 0 }}
            animate={{ width: `${((benefitsData.health + benefitsData.remote) / benefitsData.totalCompensation) * 100}%` }}
            transition={{ delay: 0.3 }}
          />
        </div>

        <div className={styles.breakdownLegend}>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#3b82f6' }} />
            <span>{t('benefits.base') || 'Base'}: {formatAmount(benefitsData.baseSalary)}</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#22c55e' }} />
            <span>{t('benefits.bonus') || 'Bono'}: {formatAmount(benefitsData.bonus)}</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#8b5cf6' }} />
            <span>{t('benefits.equity') || 'Equity'}: {formatAmount(benefitsData.equity)}</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.legendDot} style={{ background: '#f59e0b' }} />
            <span>{t('benefits.other') || 'Otros'}: {formatAmount(benefitsData.health + benefitsData.remote)}</span>
          </div>
        </div>
      </div>

      <div className={styles.insight}>
        {benefitsData.totalBenefits > benefitsData.baseSalary * 0.25 ? (
          <p>✅ {t('benefits.insightGood') || '¡Excelente paquete de beneficios! Valora el paquete completo al negociar.'}</p>
        ) : benefitsData.totalBenefits > benefitsData.baseSalary * 0.10 ? (
          <p>👍 {t('benefits.insightModerate') || 'Paquete de beneficios promedio. Considera negociar más beneficios.'}</p>
        ) : (
          <p>⚠️ {t('benefits.insightLow') || 'Paquete de beneficios bajo. Enfócate en negociar salary base o beneficios adicionales.'}</p>
        )}
      </div>
    </motion.div>
  );
};

export default BenefitsEvaluator;
