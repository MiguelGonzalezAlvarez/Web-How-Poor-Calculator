import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import styles from './QuickActions.module.scss';

type FilterType = 'all' | 'salary' | 'quality' | 'rent' | 'safety';

const QuickActions: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { calculatedResults } = useAppStore();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  if (!calculatedResults.length) {
    return null;
  }

  const filters: { id: FilterType; icon: string; labelEs: string; labelEn: string; sortFn: (a: any, b: any) => number }[] = [
    { 
      id: 'salary', 
      icon: '💰', 
      labelEs: 'Mejor Salary', 
      labelEn: 'Best Salary',
      sortFn: (a: any, b: any) => b.equivalentSalary - a.equivalentSalary 
    },
    { 
      id: 'quality', 
      icon: '🏆', 
      labelEs: 'Mejor Calidad de Vida', 
      labelEn: 'Best Quality',
      sortFn: (a: any, b: any) => (b.country.qualityOfLife?.healthcare || 0) - (a.country.qualityOfLife?.healthcare || 0)
    },
    { 
      id: 'rent', 
      icon: '🏠', 
      labelEs: 'Mejor Alquiler', 
      labelEn: 'Best Rent',
      sortFn: (a: any, b: any) => a.rentIndex - b.rentIndex
    },
    { 
      id: 'safety', 
      icon: '🛡️', 
      labelEs: 'Mejor Seguridad', 
      labelEn: 'Best Safety',
      sortFn: (a: any, b: any) => (b.country.qualityOfLife?.safety || 0) - (a.country.qualityOfLife?.safety || 0)
    },
  ];

  const handleFilter = (filterId: FilterType) => {
    setActiveFilter(filterId);
  };

  return (
    <div className={styles.quickActions}>
      <span className={styles.label}>
        {i18n.language === 'es' ? 'Ver:' : 'View:'}
      </span>
      <div className={styles.buttons}>
        {filters.map((filter) => (
          <button
            key={filter.id}
            className={`${styles.button} ${activeFilter === filter.id ? styles.active : ''}`}
            onClick={() => handleFilter(filter.id)}
          >
            <span className={styles.icon}>{filter.icon}</span>
            <span className={styles.text}>
              {i18n.language === 'es' ? filter.labelEs : filter.labelEn}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
