import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './QuickPreview.module.scss';

const QuickPreview: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, currency, selectedCountry, selectedRegion, isCalculated } = useAppStore();

  const salaryNum = useMemo(() => {
    if (!salary) return 0;
    const parsed = parseFloat(salary.replace(/[^0-9.-]/g, ''));
    return isNaN(parsed) ? 0 : parsed;
  }, [salary]);

  if (!selectedCountry || !selectedRegion || isCalculated) {
    return null;
  }

  const getSalaryLevel = (salary: number, country: string) => {
    const thresholds: Record<string, { low: number; high: number }> = {
      es: { low: 25000, high: 60000 },
      us: { low: 50000, high: 120000 },
      gb: { low: 35000, high: 80000 },
      de: { low: 40000, high: 90000 },
      fr: { low: 35000, high: 80000 },
    };

    const threshold = thresholds[country] || { low: 30000, high: 70000 };

    if (salary < threshold.low) return { level: 'low', key: 'quickPreview.low' };
    if (salary > threshold.high) return { level: 'high', key: 'quickPreview.high' };
    return { level: 'medium', key: 'quickPreview.medium' };
  };

  const { level, key } = getSalaryLevel(salaryNum, selectedCountry);

  return (
    <div className={styles.preview}>
      <span className={`${styles.badge} ${styles[level]}`}>
        {t(key)}
      </span>
      {salaryNum > 0 && (
        <span className={styles.salaryPreview}>
          {t('quickPreview.withSalary', { 
            salary: formatCurrency(salaryNum, currency),
            country: selectedRegion 
          })}
        </span>
      )}
    </div>
  );
};

export default QuickPreview;
