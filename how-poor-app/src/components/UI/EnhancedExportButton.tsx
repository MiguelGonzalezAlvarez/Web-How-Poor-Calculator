import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { generatePDFReport, generateQuickPDF } from '../../lib/pdfGenerator';
import { exportToCSV, exportToPNG } from '../../lib/export';
import styles from './EnhancedExportButton.module.scss';

type ExportFormat = 'pdf' | 'csv' | 'png' | 'json';

interface ExportOption {
  id: ExportFormat;
  label: string;
  icon: string;
  description: string;
}

const EnhancedExportButton: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const {
    salary,
    currency,
    calculatedResults,
    originCountry,
    originRegion,
    selectedDetailCountry,
    language
  } = useAppStore();

  const exportOptions: ExportOption[] = [
    {
      id: 'pdf',
      label: t('export.pdf', 'PDF Completo'),
      icon: '📄',
      description: t('export.pdfDesc', 'Informe detallado con gráficos')
    },
    {
      id: 'csv',
      label: t('export.csv', 'CSV'),
      icon: '📊',
      description: t('export.csvDesc', 'Para Excel/Google Sheets')
    },
    {
      id: 'png',
      label: t('export.png', 'Imagen'),
      icon: '🖼️',
      description: t('export.pngDesc', 'Captura de pantalla')
    },
    {
      id: 'json',
      label: t('export.json', 'JSON'),
      icon: '💾',
      description: t('export.jsonDesc', 'Datos para backup')
    }
  ];

  const salaryNum = salary ? parseFloat(salary.replace(/[^0-9.-]/g, '')) : 0;

  const handleExport = async (format: ExportFormat) => {
    setSelectedFormat(format);
    setIsExporting(true);

    try {
      switch (format) {
        case 'pdf':
          if (calculatedResults.length > 0 && originCountry) {
            await generatePDFReport(
              salaryNum,
              currency,
              originCountry,
              calculatedResults,
              {
                language: language as 'es' | 'en',
                includeCharts: true,
                includeDetailed: true
              }
            );
          }
          break;
          
        case 'csv':
          if (calculatedResults.length > 0 && originCountry) {
            exportToCSV(
              calculatedResults,
              originCountry.id,
              salary,
              language
            );
          }
          break;
          
        case 'png':
          const mainContent = document.getElementById('results-section');
          if (mainContent) {
            await exportToPNG('results-section', 'how-poor-results');
          }
          break;
          
        case 'json':
          if (calculatedResults.length > 0 && originCountry) {
            const data = {
              exportDate: new Date().toISOString(),
              salary: salaryNum,
              currency,
              originCountry: originCountry.id,
              results: calculatedResults.map(r => ({
                country: r.country.id,
                region: r.region.id,
                equivalentSalary: r.equivalentSalary,
                costOfLivingIndex: r.costOfLivingIndex,
                purchasingPowerIndex: r.purchasingPowerIndex,
                status: r.status
              }))
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `how-poor-export-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);
          }
          break;
      }
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
      setIsOpen(false);
    }
  };

  const canExport = calculatedResults.length > 0 && salaryNum > 0;

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        className={`${styles.mainButton} ${canExport ? styles.active : styles.disabled}`}
        onClick={() => canExport && setIsOpen(!isOpen)}
        disabled={!canExport}
      >
        <span className={styles.icon}>📥</span>
        <span className={styles.label}>
          {t('export.title', 'Exportar')}
        </span>
        <span className={`${styles.chevron} ${isOpen ? styles.open : ''}`}>▼</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.dropdown}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className={styles.header}>
              <span className={styles.headerTitle}>
                {t('export.choose', 'Elegir formato')}
              </span>
            </div>
            
            <div className={styles.options}>
              {exportOptions.map((option) => (
                <button
                  key={option.id}
                  className={`${styles.option} ${isExporting && selectedFormat === option.id ? styles.loading : ''}`}
                  onClick={() => !isExporting && handleExport(option.id)}
                  disabled={isExporting}
                >
                  <span className={styles.optionIcon}>{option.icon}</span>
                  <div className={styles.optionContent}>
                    <span className={styles.optionLabel}>{option.label}</span>
                    <span className={styles.optionDesc}>{option.description}</span>
                  </div>
                  {isExporting && selectedFormat === option.id && (
                    <span className={styles.spinner}>⏳</span>
                  )}
                </button>
              ))}
            </div>
            
            <div className={styles.footer}>
              <span className={styles.footerText}>
                {t('export.footer', 'Los datos son aproximados')}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default EnhancedExportButton;
