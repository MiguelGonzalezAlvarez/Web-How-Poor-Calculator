import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './EmergencyFundCalculator.module.scss';

interface ExpenseCategory {
  id: string;
  name: string;
  nameEs: string;
  percentage: number;
}

const expenseCategories: ExpenseCategory[] = [
  { id: 'housing', name: 'Housing (Rent/Mortgage)', nameEs: 'Vivienda', percentage: 35 },
  { id: 'utilities', name: 'Utilities', nameEs: 'Servicios', percentage: 10 },
  { id: 'food', name: 'Food & Groceries', nameEs: 'Comida', percentage: 15 },
  { id: 'transport', name: 'Transportation', nameEs: 'Transporte', percentage: 10 },
  { id: 'insurance', name: 'Insurance', nameEs: 'Seguro', percentage: 10 },
  { id: 'debt', name: 'Debt Payments', nameEs: 'Deudas', percentage: 10 },
  { id: 'other', name: 'Other Essentials', nameEs: 'Otros', percentage: 10 },
];

const EmergencyFundCalculator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry, salary } = useAppStore();
  
  const [monthsTarget, setMonthsTarget] = useState(6);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number | null>(null);
  const [customExpenses, setCustomExpenses] = useState(false);

  const salaryNum = salary ? parseFloat(salary.replace(/[^0-9.-]/g, '')) : 0;
  const annualSalary = salaryNum;
  
  const estimatedMonthlyExpenses = useMemo(() => {
    if (monthlyExpenses) return monthlyExpenses;
    return annualSalary * 0.7 / 12;
  }, [annualSalary, monthlyExpenses]);

  const targetFund = monthsTarget * estimatedMonthlyExpenses;
  const currentSavings = annualSalary * 0.2;
  const progress = Math.min((currentSavings / targetFund) * 100, 100);
  const monthsCovered = currentSavings / estimatedMonthlyExpenses;

  const breakdown = useMemo(() => {
    return expenseCategories.map(cat => ({
      ...cat,
      amount: estimatedMonthlyExpenses * (cat.percentage / 100)
    }));
  }, [estimatedMonthlyExpenses]);

  if (!originCountry) {
    return (
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>
            {t('emergency.title', '💰 Emergency Fund Calculator')}
          </h3>
          <p className={styles.subtitle}>
            {t('emergency.selectCountry', 'Select a country to calculate your emergency fund')}
          </p>
        </div>
      </motion.div>
    );
  }

  const formatAmount = (value: number) => {
    return formatCurrency(Math.round(value), originCountry.currency);
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
          {t('emergency.title', '💰 Emergency Fund Calculator')}
        </h3>
        <p className={styles.subtitle}>
          {t('emergency.subtitle', `How much do you need saved in ${originCountry.nameEs}?`)}
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.toggleGroup}>
          <label className={styles.label}>{t('emergency.calculateFrom', 'Calculate from')}</label>
          <div className={styles.toggleButtons}>
            <button
              className={`${styles.toggleBtn} ${!customExpenses ? styles.active : ''}`}
              onClick={() => { setCustomExpenses(false); setMonthlyExpenses(null); }}
            >
              {t('emergency.salary', 'Salary')}
            </button>
            <button
              className={`${styles.toggleBtn} ${customExpenses ? styles.active : ''}`}
              onClick={() => setCustomExpenses(true)}
            >
              {t('emergency.custom', 'Custom')}
            </button>
          </div>
        </div>

        {customExpenses && (
          <div className={styles.inputGroup}>
            <label className={styles.label}>{t('emergency.monthlyExpenses', 'Monthly Expenses')}</label>
            <input
              type="number"
              className={styles.input}
              value={monthlyExpenses || ''}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              placeholder={formatAmount(estimatedMonthlyExpenses)}
            />
          </div>
        )}

        <div className={styles.sliderGroup}>
          <label className={styles.label}>
            {t('emergency.targetMonths', 'Target: {months} months', { months: monthsTarget })}
          </label>
          <input
            type="range"
            min="1"
            max="12"
            value={monthsTarget}
            onChange={(e) => setMonthsTarget(Number(e.target.value))}
            className={styles.slider}
          />
          <div className={styles.sliderLabels}>
            <span>1</span>
            <span>3</span>
            <span>6</span>
            <span>9</span>
            <span>12</span>
          </div>
        </div>
      </div>

      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <span className={styles.cardIcon}>💵</span>
          <span className={styles.cardLabel}>{t('emergency.targetFund', 'Target Fund')}</span>
          <span className={styles.cardValue}>{formatAmount(targetFund)}</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.cardIcon}>🏦</span>
          <span className={styles.cardLabel}>{t('emergency.currentSavings', 'Current Savings')}</span>
          <span className={styles.cardValue}>{formatAmount(currentSavings)}</span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.cardIcon}>📅</span>
          <span className={styles.cardLabel}>{t('emergency.monthsCovered', 'Months Covered')}</span>
          <span className={styles.cardValue}>{monthsCovered.toFixed(1)}</span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span>{t('emergency.progress', 'Progress to Goal')}</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className={styles.progressHint}>
          {progress >= 100 
            ? t('emergency.goalReached', 'Congratulations! You have reached your emergency fund goal!')
            : t('emergency.goalRemaining', `You need ${formatAmount(targetFund - currentSavings)} more to reach your goal`)}
        </p>
      </div>

      <div className={styles.breakdownSection}>
        <h4>{t('emergency.monthlyBreakdown', 'Monthly Expense Breakdown')}</h4>
        <div className={styles.breakdownList}>
          {breakdown.map(cat => (
            <div key={cat.id} className={styles.breakdownRow}>
              <div className={styles.breakdownInfo}>
                <span className={styles.breakdownName}>
                  {i18n.language === 'es' ? cat.nameEs : cat.name}
                </span>
                <span className={styles.breakdownPercent}>{cat.percentage}%</span>
              </div>
              <span className={styles.breakdownAmount}>{formatAmount(cat.amount)}</span>
              <div className={styles.breakdownBar}>
                <div 
                  className={styles.breakdownFill}
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.totalRow}>
          <span>{t('emergency.total', 'Total Monthly Expenses')}</span>
          <span>{formatAmount(estimatedMonthlyExpenses)}</span>
        </div>
      </div>

      <div className={styles.insight}>
        <h4>{t('emergency.recommendations', 'Recommendations')}</h4>
        <ul>
          {monthsTarget < 3 && (
            <li>{t('emergency.minimum', 'Financial experts recommend at least 3-6 months of expenses')}</li>
          )}
          {monthsCovered < 3 && (
            <li>{t('emergency.priority', 'Building an emergency fund should be your top financial priority')}</li>
          )}
          {monthsCovered >= 6 && (
            <li>{t('emergency.excellent', 'Excellent! You have a solid emergency fund in place')}</li>
          )}
          <li>{t('emergency.invest', 'Keep your emergency fund in a high-yield savings account for easy access')}</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default EmergencyFundCalculator;
