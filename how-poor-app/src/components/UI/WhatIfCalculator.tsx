import { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './WhatIfCalculator.module.scss';

const WhatIfCalculator: React.FC = () => {
  const { t } = useTranslation();
  const { 
    salary, 
    currency,
    calculatedResults, 
    originCountry,
    originRegion,
    isCalculated 
  } = useAppStore();

  const [whatIfSalary, setWhatIfSalary] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [salaryMultiplier, setSalaryMultiplier] = useState(1);

  const originalSalary = useMemo(() => {
    const num = parseFloat(salary.replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? 0 : num;
  }, [salary]);

  useEffect(() => {
    setWhatIfSalary(salary);
    setSalaryMultiplier(1);
  }, [salary]);

  const displaySalary = useMemo(() => {
    const num = parseFloat(whatIfSalary.replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? 0 : num;
  }, [whatIfSalary]);

  const adjustedResults = useMemo(() => {
    if (!calculatedResults.length || !originalSalary || !displaySalary) {
      return calculatedResults;
    }

    const ratio = displaySalary / originalSalary;
    
    return calculatedResults.map(result => ({
      ...result,
      equivalentSalary: Math.round(result.equivalentSalary * ratio),
      salaryInOriginCurrency: Math.round(result.salaryInOriginCurrency * ratio),
      ratio: result.ratio
    }));
  }, [calculatedResults, originalSalary, displaySalary]);

  const topResults = useMemo(() => {
    return [...adjustedResults]
      .sort((a, b) => b.ratio - a.ratio)
      .slice(0, 3);
  }, [adjustedResults]);

  const percentageChange = useMemo(() => {
    if (!originalSalary) return 0;
    return ((displaySalary - originalSalary) / originalSalary) * 100;
  }, [originalSalary, displaySalary]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const multiplier = parseFloat(e.target.value);
    setSalaryMultiplier(multiplier);
    setWhatIfSalary(Math.round(originalSalary * multiplier).toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWhatIfSalary(e.target.value);
    setSalaryMultiplier(1);
  };

  const quickAdjust = (percent: number) => {
    const newSalary = Math.round(originalSalary * (1 + percent / 100));
    setWhatIfSalary(newSalary.toString());
    setSalaryMultiplier(1 + percent / 100);
  };

  if (!calculatedResults.length || !isCalculated) {
    return null;
  }

  return (
    <div className={styles.panel}>
      <button 
        className={styles.header}
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <div className={styles.headerLeft}>
          <svg 
            className={`${styles.icon} ${isExpanded ? styles.iconExpanded : ''}`}
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <h3 className={styles.title}>{t('whatIf.title')}</h3>
        </div>
        {percentageChange !== 0 && (
          <span className={`${styles.badge} ${percentageChange > 0 ? styles.badgePositive : styles.badgeNegative}`}>
            {percentageChange > 0 ? '+' : ''}{Math.round(percentageChange)}%
          </span>
        )}
        <svg 
          className={`${styles.chevron} ${isExpanded ? styles.chevronExpanded : ''}`}
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isExpanded && (
        <div className={styles.content}>
          <div className={styles.currentSalary}>
            <span className={styles.label}>{t('whatIf.currentSalary')}</span>
            <span className={styles.value}>{formatCurrency(originalSalary, currency)}</span>
          </div>

          <div className={styles.inputSection}>
            <label className={styles.label}>{t('whatIf.newSalary')}</label>
            <div className={styles.inputWrapper}>
              <span className={styles.currencySymbol}>
                {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency}
              </span>
              <input
                type="text"
                className={styles.input}
                value={whatIfSalary}
                onChange={handleInputChange}
                placeholder={t('whatIf.enterSalary')}
              />
            </div>
          </div>

          <div className={styles.sliderSection}>
            <input
              type="range"
              className={styles.slider}
              min="0.5"
              max="2"
              step="0.05"
              value={salaryMultiplier}
              onChange={handleSliderChange}
            />
            <div className={styles.sliderLabels}>
              <span>-50%</span>
              <span className={styles.sliderCurrent}>
                {Math.round(salaryMultiplier * 100)}%
              </span>
              <span>+100%</span>
            </div>
          </div>

          <div className={styles.quickButtons}>
            <button 
              className={styles.quickButton}
              onClick={() => quickAdjust(-10)}
            >
              -10%
            </button>
            <button 
              className={styles.quickButton}
              onClick={() => quickAdjust(-5)}
            >
              -5%
            </button>
            <button 
              className={`${styles.quickButton} ${styles.quickButtonReset}`}
              onClick={() => quickAdjust(0)}
            >
              {t('whatIf.reset')}
            </button>
            <button 
              className={styles.quickButton}
              onClick={() => quickAdjust(5)}
            >
              +5%
            </button>
            <button 
              className={styles.quickButton}
              onClick={() => quickAdjust(10)}
            >
              +10%
            </button>
          </div>

          {topResults.length > 0 && (
            <div className={styles.preview}>
              <h4 className={styles.previewTitle}>{t('whatIf.quickPreview')}</h4>
              <div className={styles.previewList}>
                {topResults.map((result, index) => (
                  <div key={result.country.id} className={styles.previewItem}>
                    <div className={styles.previewRank}>#{index + 1}</div>
                    <div className={styles.previewInfo}>
                      <span className={styles.previewCountry}>
                        {result.country.flag} {result.region?.name || result.country.name}
                      </span>
                      <span className={styles.previewSalary}>
                        {formatCurrency(result.equivalentSalary, result.currency)}
                      </span>
                    </div>
                    <div className={`${styles.previewStatus} ${styles[result.status]}`}>
                      {t(`results.status.${result.status}`)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {originCountry && (
            <div className={styles.originInfo}>
              <span className={styles.originLabel}>{t('whatIf.basedOn')}:</span>
              <span className={styles.originValue}>
                {originCountry.flag} {originRegion?.name || originCountry.name}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WhatIfCalculator;
