import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency, getStatusColor, sortResults, filterResults } from '../../services/utils/formatters';
import { CalculationResult, Filters } from '../../types';
import styles from './ComparisonTable.module.scss';

type SortField = 'country' | 'salary' | 'costOfLiving' | 'purchasingPower' | 'ratio';
type SortOrder = 'asc' | 'desc';

const ComparisonTable: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { calculatedResults, setSelectedDetailCountry } = useAppStore();
  const [sortBy, setSortBy] = useState<SortField>('ratio');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filters, setFilters] = useState<Filters>({
    status: []
  });

  const handleSort = (field: SortField) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const toggleFilter = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status?.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...(prev.status || []), status]
    }));
  };

  const filteredResults = filterResults(calculatedResults, filters);
  const sortedResults = sortResults(filteredResults, sortBy, sortOrder);

  const getSortIcon = (field: SortField): string => {
    if (sortBy !== field) return '↕';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const handleRowClick = (result: CalculationResult) => {
    setSelectedDetailCountry(result.country.id);
  };

  const getCountryName = (result: CalculationResult): string => {
    return i18n.language === 'es' ? result.country.nameEs : result.country.name;
  };

  const getRegionName = (result: CalculationResult): string => {
    return i18n.language === 'es' ? result.region.nameEs : result.region.name;
  };

  if (sortedResults.length === 0) {
    return (
      <div className={styles.noResults}>
        <p>{t('results.noResults')}</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer} id="results-table">
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>{t('filters.showOnly')}:</span>
          <button
            className={`${styles.filterButton} ${filters.status?.includes('better') ? styles.active : ''}`}
            onClick={() => toggleFilter('better')}
          >
            {t('filters.statusOptions.better')}
          </button>
          <button
            className={`${styles.filterButton} ${filters.status?.includes('similar') ? styles.active : ''}`}
            onClick={() => toggleFilter('similar')}
          >
            {t('filters.statusOptions.similar')}
          </button>
          <button
            className={`${styles.filterButton} ${filters.status?.includes('worse') ? styles.active : ''}`}
            onClick={() => toggleFilter('worse')}
          >
            {t('filters.statusOptions.worse')}
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => handleSort('country')} className={styles.sortable}>
                {t('results.columns.country')} {getSortIcon('country')}
              </th>
              <th>{t('results.columns.region')}</th>
              <th onClick={() => handleSort('salary')} className={styles.sortable}>
                {t('results.columns.salary')} {getSortIcon('salary')}
              </th>
              <th onClick={() => handleSort('costOfLiving')} className={styles.sortable}>
                {t('results.columns.costOfLiving')} {getSortIcon('costOfLiving')}
              </th>
              <th onClick={() => handleSort('purchasingPower')} className={styles.sortable}>
                {t('results.columns.purchasingPower')} {getSortIcon('purchasingPower')}
              </th>
              <th onClick={() => handleSort('ratio')} className={styles.sortable}>
                {t('results.columns.status')} {getSortIcon('ratio')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedResults.map((result, index) => (
              <motion.tr 
                key={`${result.country.id}-${result.region.id}-${index}`}
                onClick={() => handleRowClick(result)}
                className={styles.clickable}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.02 }}
                layout
              >
                <td>
                  <div className={styles.countryCell}>
                    <span className={styles.flag}>{result.country.flag}</span>
                    <span className={styles.countryName}>{getCountryName(result)}</span>
                  </div>
                </td>
                <td>{getRegionName(result)}</td>
                <td>
                  <div className={styles.salaryCell}>
                    <span className={styles.salary}>
                      {formatCurrency(result.equivalentSalary, result.currency)}
                    </span>
                    <span className={styles.salaryYear}>/{t('results.perYear').replace('/', '')}</span>
                  </div>
                </td>
                <td>
                  <div className={styles.indexCell}>
                    <span className={styles.indexValue}>{result.costOfLivingIndex}</span>
                    <div className={styles.indexBar}>
                      <div 
                        className={styles.indexFill} 
                        style={{ width: `${Math.min(result.costOfLivingIndex, 100)}%` }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.indexCell}>
                    <span className={styles.indexValue}>{result.purchasingPowerIndex}</span>
                    <div className={styles.indexBar}>
                      <div 
                        className={styles.indexFill} 
                        style={{ width: `${Math.min(result.purchasingPowerIndex, 100)}%`, background: '#22c55e' }}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <span 
                    className={styles.statusBadge}
                    style={{ background: getStatusColor(result.status) }}
                  >
                    {t(`results.status.${result.status}`)}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
