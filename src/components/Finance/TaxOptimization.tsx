import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './TaxOptimization.module.scss';

interface TaxOptimization {
  countryId: string;
  retirementContribution: number;
  healthInsurance: number;
  educationCredits: number;
  homeOffice: number;
  professionalDevelopment: number;
}

const taxOptimizations: TaxOptimization[] = [
  { countryId: 'us', retirementContribution: 23000, healthInsurance: 10000, educationCredits: 2500, homeOffice: 1600, professionalDevelopment: 1000 },
  { countryId: 'es', retirementContribution: 10000, healthInsurance: 2500, educationCredits: 1200, homeOffice: 900, professionalDevelopment: 600 },
  { countryId: 'de', retirementContribution: 12000, healthInsurance: 3000, educationCredits: 1000, homeOffice: 800, professionalDevelopment: 500 },
  { countryId: 'gb', retirementContribution: 15000, healthInsurance: 0, educationCredits: 1500, homeOffice: 700, professionalDevelopment: 800 },
  { countryId: 'fr', retirementContribution: 12000, healthInsurance: 2000, educationCredits: 1000, homeOffice: 600, professionalDevelopment: 500 },
  { countryId: 'pt', retirementContribution: 8000, healthInsurance: 1500, educationCredits: 800, homeOffice: 500, professionalDevelopment: 400 },
  { countryId: 'mx', retirementContribution: 5000, healthInsurance: 3000, educationCredits: 600, homeOffice: 400, professionalDevelopment: 300 },
  { countryId: 'ca', retirementContribution: 15000, healthInsurance: 2000, educationCredits: 1500, homeOffice: 600, professionalDevelopment: 500 },
];

const TaxOptimization: React.FC = () => {
  const { t } = useTranslation();
  const { originCountry, salary } = useAppStore();

  const optimizations = useMemo(() => {
    if (!originCountry) return taxOptimizations[0];
    return taxOptimizations.find(o => o.countryId === originCountry.id) || taxOptimizations[0];
  }, [originCountry]);

  const salaryNum = salary ? parseFloat(salary.replace(/[^0-9.-]/g, '')) : 0;
  
  const totalSavings = useMemo(() => {
    if (!salaryNum) return 0;
    const total = optimizations.retirementContribution + 
                  optimizations.healthInsurance + 
                  optimizations.educationCredits + 
                  optimizations.homeOffice + 
                  optimizations.professionalDevelopment;
    const taxRate = originCountry?.id === 'us' ? 0.32 : originCountry?.id === 'gb' ? 0.32 : 0.30;
    return Math.min(total * taxRate, salaryNum * 0.15);
  }, [salaryNum, optimizations, originCountry]);

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
            📋 {t('taxOpt.title', 'Tax Optimization Strategies')}
          </h3>
          <p className={styles.subtitle}>
            {t('taxOpt.selectCountry', 'Select a country to see tax optimization tips')}
          </p>
        </div>
      </motion.div>
    );
  }

  const formatAmount = (value: number) => {
    return formatCurrency(Math.round(value), originCountry.currency);
  };

  const items = [
    { id: 'retirement', icon: '🏦', label: t('taxOpt.retirement', 'Max Retirement Contributions'), amount: optimizations.retirementContribution, desc: t('taxOpt.retirementDesc', '401k, IRA, or pension plan contributions') },
    { id: 'health', icon: '🏥', label: t('taxOpt.health', 'Health Insurance'), amount: optimizations.healthInsurance, desc: t('taxOpt.healthDesc', 'Premium payments and medical expenses') },
    { id: 'education', icon: '🎓', label: t('taxOpt.education', 'Education Credits'), amount: optimizations.educationCredits, desc: t('taxOpt.educationDesc', 'Professional development and certifications') },
    { id: 'homeoffice', icon: '🏠', label: t('taxOpt.homeoffice', 'Home Office'), amount: optimizations.homeOffice, desc: t('taxOpt.homeofficeDesc', 'Equipment and utilities for remote work') },
    { id: 'professional', icon: '📚', label: t('taxOpt.professional', 'Professional Development'), amount: optimizations.professionalDevelopment, desc: t('taxOpt.professionalDesc', 'Courses, conferences, and training') },
  ];

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          📋 {t('taxOpt.title', 'Tax Optimization Strategies')}
        </h3>
        <p className={styles.subtitle}>
          {t('taxOpt.subtitle', `Potential tax savings in ${originCountry.nameEs}`)}
        </p>
      </div>

      {salaryNum > 0 && (
        <div className={styles.savingsCard}>
          <span className={styles.savingsIcon}>💰</span>
          <div className={styles.savingsInfo}>
            <span className={styles.savingsLabel}>{t('taxOpt.potential', 'Potential Annual Savings')}</span>
            <span className={styles.savingsValue}>{formatAmount(totalSavings)}</span>
          </div>
        </div>
      )}

      <div className={styles.optimizationsList}>
        {items.map(item => (
          <div key={item.id} className={styles.optCard}>
            <div className={styles.optIcon}>{item.icon}</div>
            <div className={styles.optInfo}>
              <span className={styles.optLabel}>{item.label}</span>
              <span className={styles.optDesc}>{item.desc}</span>
            </div>
            <span className={styles.optAmount}>{formatAmount(item.amount)}</span>
          </div>
        ))}
      </div>

      <div className={styles.insight}>
        <h4>⚡ {t('taxOpt.important', 'Important Notes')}</h4>
        <ul>
          <li>{t('taxOpt.note1', 'Tax laws vary significantly - consult a local tax professional')}</li>
          <li>{t('taxOpt.note2', 'Contribution limits change annually - verify current limits')}</li>
          <li>{t('taxOpt.note3', 'Some deductions require itemizing - compare standard vs itemized')}</li>
        </ul>
      </div>

      {!salary && (
        <div className={styles.noData}>
          <p>{t('taxOpt.enterSalary', 'Enter your salary to calculate potential savings')}</p>
        </div>
      )}
    </motion.div>
  );
};

export default TaxOptimization;
