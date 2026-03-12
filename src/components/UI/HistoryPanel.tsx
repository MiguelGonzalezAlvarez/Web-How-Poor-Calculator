import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { format } from 'date-fns';
import { es, enUS } from 'date-fns/locale';
import styles from './HistoryPanel.module.scss';

const HistoryPanel: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { searchHistory, clearHistory, setSalary, setCurrency, setSelectedCountry, setSelectedRegion, calculateEquivalences } = useAppStore();

  const dateLocale = i18n.language === 'es' ? es : enUS;

  const handleSelectHistory = (item: typeof searchHistory[0]) => {
    setSalary(item.salary);
    setCurrency(item.currency);
    setSelectedCountry(item.country);
    setSelectedRegion(item.region);
    
    setTimeout(() => {
      calculateEquivalences();
    }, 100);
  };

  const formatDate = (timestamp: number) => {
    return format(new Date(timestamp), 'PPp', { locale: dateLocale });
  };

  if (searchHistory.length === 0) {
    return null;
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3 className={styles.title}>{t('history.title') || 'Historial de búsquedas'}</h3>
        <button className={styles.clearButton} onClick={clearHistory}>
          {t('history.clear') || 'Limpiar'}
        </button>
      </div>

      <div className={styles.list}>
        {searchHistory.map((item) => (
          <button
            key={item.id}
            className={styles.item}
            onClick={() => handleSelectHistory(item)}
          >
            <div className={styles.itemMain}>
              <span className={styles.salary}>
                {formatCurrency(parseFloat(item.salary), item.currency)}
              </span>
              <span className={styles.country}>{item.country}</span>
            </div>
            <div className={styles.itemMeta}>
              <span className={styles.date}>{formatDate(item.timestamp)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
