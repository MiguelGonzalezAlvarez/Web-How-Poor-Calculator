import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { taxRatesData } from '../../data/taxes';
import { getMonthlyCostByCountry } from '../../data/categories';
import styles from './SavingsPotential.module.scss';

type LifestyleLevel = 'basic' | 'comfort' | 'premium';

const savingsGoals = [
  { id: 'emergency', name: 'Emergency Fund', nameEs: 'Fondo de emergencia', cost: 5000, icon: '🛡️' },
  { id: 'laptop', name: 'New Laptop', nameEs: 'Nueva laptop', cost: 1500, icon: '💻' },
  { id: 'car', name: 'Used Car', nameEs: 'Coche usado', cost: 10000, icon: '🚗' },
  { id: 'vacation', name: 'Vacation', nameEs: 'Vacaciones', cost: 3000, icon: '✈️' },
  { id: 'apartment', name: 'Apartment Deposit', nameEs: 'Depósito apartamento', cost: 15000, icon: '🏠' },
  { id: 'house', name: 'House Down Payment', nameEs: 'Entrada casa', cost: 50000, icon: '🏡' },
];

const lifestyleMultipliers: Record<LifestyleLevel, number> = {
  basic: 0.5,
  comfort: 0.75,
  premium: 1.0
};

const SavingsPotential: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, selectedCountry, originCountry, salaryType, calculatedResults } = useAppStore();
  const [lifestyleLevel, setLifestyleLevel] = useState<LifestyleLevel>('comfort');

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';

  const savingsData = useMemo(() => {
    if (!salaryNum || !originCountry) return null;

    const countryId = originCountry.id;
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

    const monthlyNet = netSalary / 12;
    const lifestyleMultiplier = lifestyleMultipliers[lifestyleLevel];
    
    const baseMonthlyCost = 1500;
    const adjustedCost = baseMonthlyCost * lifestyleMultiplier * (originCountry.costOfLivingIndex / 70);
    
    const monthlySavings = Math.max(0, monthlyNet - adjustedCost);
    const annualSavings = monthlySavings * 12;
    const savingsRate = monthlyNet > 0 ? (monthlySavings / monthlyNet) * 100 : 0;

    const goalsWithTimeline = savingsGoals.map(goal => ({
      ...goal,
      name: i18n.language === 'es' ? goal.nameEs : goal.name,
      monthsToReach: Math.ceil(goal.cost / monthlySavings)
    })).filter(g => g.monthsToReach < 120);

    return {
      monthlyNet,
      monthlyExpenses: adjustedCost,
      monthlySavings,
      annualSavings,
      savingsRate,
      goals: goalsWithTimeline,
      countryName: i18n.language === 'es' ? originCountry.nameEs : originCountry.name,
      currency: originCountry.currency,
      currencySymbol: originCountry.currencySymbol
    };
  }, [salaryNum, originCountry, salaryType, lifestyleLevel, i18n.language]);

  if (!savingsData) return null;

  const formatAmount = (amount: number) => {
    return formatCurrency(Math.round(amount), savingsData.currency);
  };

  const getSavingsGrade = () => {
    if (savingsData.savingsRate >= 30) return { grade: 'A', color: '#22c55e', label: t('savings.excellent') || 'Excelente' };
    if (savingsData.savingsRate >= 20) return { grade: 'B', color: '#3b82f6', label: t('savings.good') || 'Bueno' };
    if (savingsData.savingsRate >= 10) return { grade: 'C', color: '#f59e0b', label: t('savings.moderate') || 'Moderado' };
    return { grade: 'D', color: '#ef4444', label: t('savings.low') || 'Bajo' };
  };

  const grade = getSavingsGrade();

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          💰 {t('savings.title') || 'Potencial de Ahorro'}
        </h3>
        <p className={styles.subtitle}>
          {t('savings.subtitle') || `Cuánto podrías ahorrar en ${savingsData.countryName}`}
        </p>
      </div>

      <div className={styles.lifestyleSelector}>
        <span className={styles.selectorLabel}>{t('savings.lifestyle') || 'Nivel de vida'}:</span>
        <div className={styles.selectorButtons}>
          {(['basic', 'comfort', 'premium'] as LifestyleLevel[]).map(level => (
            <button
              key={level}
              className={`${styles.selectorBtn} ${lifestyleLevel === level ? styles.active : ''}`}
              onClick={() => setLifestyleLevel(level)}
            >
              {level === 'basic' && '🏃'}
              {level === 'comfort' && '🚶'}
              {level === 'premium' && '🏎️'}
              <span>{t(`savings.${level}`) || level}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.mainNumbers}>
        <div className={styles.numberCard}>
          <span className={styles.numberLabel}>{t('savings.monthlyNet') || 'Ingreso mensual'}</span>
          <span className={styles.numberValue}>{formatAmount(savingsData.monthlyNet)}</span>
        </div>
        <div className={styles.numberCard}>
          <span className={styles.numberLabel}>{t('savings.expenses') || 'Gastos'}</span>
          <span className={styles.numberValue}>{formatAmount(savingsData.monthlyExpenses)}</span>
        </div>
        <div className={`${styles.numberCard} ${styles.highlight}`}>
          <span className={styles.numberLabel}>{t('savings.savings') || 'Ahorro'}</span>
          <span className={styles.numberValue}>{formatAmount(savingsData.monthlySavings)}</span>
        </div>
      </div>

      <div className={styles.savingsGauge}>
        <div className={styles.gaugeHeader}>
          <span>{t('savings.rate') || 'Tasa de ahorro'}</span>
          <span className={styles.gaugePercent}>{savingsData.savingsRate.toFixed(1)}%</span>
        </div>
        <div className={styles.gaugeTrack}>
          <motion.div 
            className={styles.gaugeFill}
            style={{ background: grade.color }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(savingsData.savingsRate * 2, 100)}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className={styles.gaugeLabels}>
          <span>0%</span>
          <span className={styles.gradeBadge} style={{ background: grade.color }}>
            {grade.grade} - {grade.label}
          </span>
          <span>50%+</span>
        </div>
      </div>

      <div className={styles.annualSummary}>
        <div className={styles.annualItem}>
          <span className={styles.annualLabel}>{t('savings.annual') || 'Ahorro anual'}</span>
          <span className={styles.annualValue}>{formatAmount(savingsData.annualSavings)}</span>
        </div>
      </div>

      <div className={styles.goalsSection}>
        <h4 className={styles.goalsTitle}>
          🎯 {t('savings.goalsTimeline') || 'Metas y tiempo para alcanzarlas'}
        </h4>
        <div className={styles.goalsList}>
          {savingsData.goals.slice(0, 4).map((goal, index) => (
            <motion.div 
              key={goal.id}
              className={styles.goalItem}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <span className={styles.goalIcon}>{goal.icon}</span>
              <span className={styles.goalName}>{goal.name}</span>
              <span className={styles.goalTime}>
                {goal.monthsToReach <= 1 
                  ? t('savings.immediate') || '1 mes'
                  : `${goal.monthsToReach} ${t('savings.months') || 'meses'}`
                }
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className={styles.insight}>
        {savingsData.savingsRate >= 20 ? (
          <p>✅ {t('savings.insightGood') || '¡Excelente! Con este nivel de ahorro podrías acumular un fondo significativo rápidamente.'}</p>
        ) : savingsData.savingsRate >= 10 ? (
          <p>👍 {t('savings.insightModerate') || 'Un ahorro moderado. Considera ajustar tu estilo de vida para maximizar el ahorro.'}</p>
        ) : (
          <p>⚠️ {t('savings.insightLow') || 'El ahorro es bajo. Explora oportunidades para aumentar ingresos o reducir gastos.'}</p>
        )}
      </div>
    </motion.div>
  );
};

export default SavingsPotential;
