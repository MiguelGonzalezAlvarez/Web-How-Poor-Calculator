import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { getLatestInflation, getForecastInflation } from '../../data/inflation';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './InflationAdjusted.module.scss';

const InflationAdjusted: React.FC = () => {
  const { t } = useTranslation();
  const { originCountry, salary } = useAppStore();
  
  const [projectionYears, setProjectionYears] = useState(5);

  const currentInflation = useMemo(() => {
    if (!originCountry) return null;
    return getLatestInflation(originCountry.id);
  }, [originCountry]);

  const forecastInflation = useMemo(() => {
    if (!originCountry) return null;
    return getForecastInflation(originCountry.id);
  }, [originCountry]);

  const projectedValues = useMemo(() => {
    if (!salary || !currentInflation) return null;
    
    const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, ''));
    const currentRate = currentInflation.inflationRate / 100;
    const forecastRate = forecastInflation ? forecastInflation.inflationRate / 100 : currentRate;
    
    const projections = [];
    let currentSalary = salaryNum;
    
    for (let year = 1; year <= projectionYears; year++) {
      const rate = year <= 2 ? currentRate : forecastRate;
      currentSalary = currentSalary * (1 + rate);
      projections.push({
        year: new Date().getFullYear() + year,
        salary: Math.round(currentSalary),
        cumulative: Math.round(currentSalary - salaryNum)
      });
    }
    
    return projections;
  }, [salary, currentInflation, forecastInflation, projectionYears]);

  const salaryNum = salary ? parseFloat(salary.replace(/[^0-9.-]/g, '')) : 0;

  if (!originCountry || !currentInflation) {
    return (
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>
            {t('inflation.title', '📈 Inflation Adjusted')}
          </h3>
          <p className={styles.subtitle}>
            {t('inflation.selectCountry', 'Select a country to see inflation projections')}
          </p>
        </div>
      </motion.div>
    );
  }

  const formatSalary = (value: number) => {
    return formatCurrency(Math.round(value), originCountry.currency);
  };

  const lossKey = 'inflation.loss';
  const lossDefault = 'Purchasing Power Loss';

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          {t('inflation.title', '📈 Inflation Adjusted Salary')}
        </h3>
        <p className={styles.subtitle}>
          {t('inflation.subtitle', `How inflation affects your purchasing power in ${originCountry.nameEs}`)}
        </p>
      </div>

      <div className={styles.currentRates}>
        <div className={styles.rateCard}>
          <span className={styles.rateIcon}>📊</span>
          <div className={styles.rateInfo}>
            <span className={styles.rateLabel}>{t('inflation.currentRate', 'Current Rate')}</span>
            <span className={styles.rateValue}>{currentInflation.inflationRate}%</span>
          </div>
        </div>
        <div className={styles.rateCard}>
          <span className={styles.rateIcon}>🔮</span>
          <div className={styles.rateInfo}>
            <span className={styles.rateLabel}>{t('inflation.forecastRate', 'Forecast 2025')}</span>
            <span className={styles.rateValue}>{forecastInflation?.inflationRate || 'N/A'}%</span>
          </div>
        </div>
        <div className={styles.rateCard}>
          <span className={styles.rateIcon}>🍔</span>
          <div className={styles.rateInfo}>
            <span className={styles.rateLabel}>{t('inflation.food', 'Food')}</span>
            <span className={styles.rateValue}>{currentInflation.foodInflation}%</span>
          </div>
        </div>
        <div className={styles.rateCard}>
          <span className={styles.rateIcon}>🏠</span>
          <div className={styles.rateInfo}>
            <span className={styles.rateLabel}>{t('inflation.housing', 'Housing')}</span>
            <span className={styles.rateValue}>{currentInflation.housingInflation}%</span>
          </div>
        </div>
        <div className={styles.rateCard}>
          <span className={styles.rateIcon}>🚌</span>
          <div className={styles.rateInfo}>
            <span className={styles.rateLabel}>{t('inflation.transport', 'Transport')}</span>
            <span className={styles.rateValue}>{currentInflation.transportInflation}%</span>
          </div>
        </div>
        <div className={styles.rateCard}>
          <span className={styles.rateIcon}>💡</span>
          <div className={styles.rateInfo}>
            <span className={styles.rateLabel}>{t('inflation.utilities', 'Utilities')}</span>
            <span className={styles.rateValue}>{currentInflation.utilitiesInflation}%</span>
          </div>
        </div>
      </div>

      {salaryNum > 0 && projectedValues && (
        <>
          <div className={styles.sliderSection}>
            <label className={styles.label}>
              {t('inflation.projectionYears', 'Projection years')}: {projectionYears}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={projectionYears}
              onChange={(e) => setProjectionYears(Number(e.target.value))}
              className={styles.slider}
            />
          </div>

          <div className={styles.projectionSummary}>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>{t('inflation.currentSalary', 'Current Salary')}</span>
              <span className={styles.summaryValue}>{formatSalary(salaryNum)}</span>
            </div>
            <div className={styles.summaryArrow}>→</div>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>
                {t('inflation.in', 'In')} {projectionYears} {t('inflation.years', 'years')}
              </span>
              <span className={styles.summaryValueHighlight}>
                {formatSalary(projectedValues[projectedValues.length - 1].salary)}
              </span>
            </div>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>{t(lossKey, lossDefault)}</span>
              <span className={styles.summaryValueNegative}>
                -{formatCurrency(Math.round(salaryNum - projectedValues[projectedValues.length - 1].cumulative), originCountry.currency)}
              </span>
            </div>
          </div>

          <div className={styles.projectionTable}>
            <table>
              <thead>
                <tr>
                  <th>{t('inflation.year', 'Year')}</th>
                  <th>{t('inflation.nominalSalary', 'Nominal Salary')}</th>
                  <th>{t('inflation.realValue', 'Real Value')}</th>
                  <th>{t('inflation.purchasingPower', 'Purchasing Power')}</th>
                </tr>
              </thead>
              <tbody>
                {projectedValues.map((proj) => {
                  const realValue = proj.salary / Math.pow(1 + currentInflation.inflationRate / 100, proj.year - new Date().getFullYear());
                  const purchasingPower = (realValue / salaryNum) * 100;
                  
                  return (
                    <tr key={proj.year}>
                      <td>{proj.year}</td>
                      <td>{formatSalary(proj.salary)}</td>
                      <td>{formatSalary(realValue)}</td>
                      <td>
                        <div className={styles.powerBar}>
                          <div 
                            className={styles.powerFill} 
                            style={{ width: `${Math.min(purchasingPower, 100)}%` }}
                          />
                          <span>{purchasingPower.toFixed(1)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className={styles.insight}>
            <h4>{t('inflation.insight', 'Key Insights')}</h4>
            <ul>
              {currentInflation.inflationRate > 5 && (
                <li>{t('inflation.highInflation', 'High inflation significantly erodes purchasing power over time')}</li>
              )}
              {currentInflation.housingInflation > currentInflation.inflationRate && (
                <li>{t('inflation.housingConcern', 'Housing costs are rising faster than overall inflation - consider this in relocation decisions')}</li>
              )}
              {forecastInflation && forecastInflation.inflationRate < currentInflation.inflationRate && (
                <li>{t('inflation.improving', 'Inflation is expected to moderate in the coming years')}</li>
              )}
              <li>{t('inflation.advice', 'To maintain your standard of life, aim for salary increases above the inflation rate')}</li>
            </ul>
          </div>
        </>
      )}

      {!salary && (
        <div className={styles.noData}>
          <p>{t('inflation.enterSalary', 'Enter your salary to see inflation projections')}</p>
        </div>
      )}
    </motion.div>
  );
};

export default InflationAdjusted;
