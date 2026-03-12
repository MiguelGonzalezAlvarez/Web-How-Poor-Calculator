import { useTranslation } from 'react-i18next';
import { useFilters } from '../../hooks';
import styles from './FilterPanel.module.scss';

const FilterPanel: React.FC = () => {
  const { t } = useTranslation();
  const { 
    filters, 
    toggleStatusFilter, 
    handleSort,
    sortBy,
    sortOrder,
    clearFilters 
  } = useFilters();

  return (
    <div className={styles.panel}>
      <div className={styles.section}>
        <h4 className={styles.title}>{t('filters.showOnly')}</h4>
        <div className={styles.buttons}>
          <button
            className={`${styles.filterBtn} ${filters.status?.includes('better') ? styles.active : ''}`}
            onClick={() => toggleStatusFilter('better')}
          >
            {t('filters.statusOptions.better')}
          </button>
          <button
            className={`${styles.filterBtn} ${filters.status?.includes('similar') ? styles.active : ''}`}
            onClick={() => toggleStatusFilter('similar')}
          >
            {t('filters.statusOptions.similar')}
          </button>
          <button
            className={`${styles.filterBtn} ${filters.status?.includes('worse') ? styles.active : ''}`}
            onClick={() => toggleStatusFilter('worse')}
          >
            {t('filters.statusOptions.worse')}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h4 className={styles.title}>{t('filters.sortBy')}</h4>
        <div className={styles.sortButtons}>
          {['ratio', 'salary', 'costOfLiving', 'purchasingPower', 'country'].map(field => (
            <button
              key={field}
              className={`${styles.sortBtn} ${sortBy === field ? styles.active : ''}`}
              onClick={() => handleSort(field)}
            >
              {t(`filters.sortOptions.${field}`)}
              {sortBy === field && (
                <span className={styles.sortIcon}>
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {(filters.status && filters.status.length > 0) && (
        <button className={styles.clearBtn} onClick={clearFilters}>
          {t('input.reset')} filtros
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
