import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { exportToCSV, exportToPNG } from '../../lib/export';
import { trackEvent } from '../../lib/analytics';
import styles from './ExportButton.module.scss';

const ExportButton: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { calculatedResults, originCountry, salary } = useAppStore();
  const [isExportingCSV, setIsExportingCSV] = useState(false);
  const [isExportingPNG, setIsExportingPNG] = useState(false);

  const handleExportCSV = () => {
    if (calculatedResults.length === 0) return;
    
    setIsExportingCSV(true);
    try {
      exportToCSV(
        calculatedResults,
        originCountry?.nameEs || 'unknown',
        salary,
        i18n.language
      );
      trackEvent('export_csv', { count: calculatedResults.length });
    } finally {
      setIsExportingCSV(false);
    }
  };

  const handleExportPNG = async () => {
    if (calculatedResults.length === 0) return;
    
    setIsExportingPNG(true);
    try {
      await exportToPNG('results-table', 'how-poor-results');
      trackEvent('export_png');
    } finally {
      setIsExportingPNG(false);
    }
  };

  if (calculatedResults.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={handleExportCSV}
        disabled={isExportingCSV}
        title={t('export.csv') || 'Exportar a CSV'}
      >
        {isExportingCSV ? '⏳' : '📊'} {t('export.csv') || 'CSV'}
      </button>
      <button
        className={styles.button}
        onClick={handleExportPNG}
        disabled={isExportingPNG}
        title={t('export.png') || 'Exportar imagen'}
      >
        {isExportingPNG ? '⏳' : '🖼️'} {t('export.png') || 'PNG'}
      </button>
    </div>
  );
};

export default ExportButton;
