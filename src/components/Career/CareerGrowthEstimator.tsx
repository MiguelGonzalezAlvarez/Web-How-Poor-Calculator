import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { getCareerGrowth, projectSalary, industries, careerLevels, CareerGrowthData } from '../../data/careerGrowth';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './CareerGrowthEstimator.module.scss';

const CareerGrowthEstimator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry, salary } = useAppStore();
  
  const [selectedIndustry, setSelectedIndustry] = useState('tech');
  const [currentLevel, setCurrentLevel] = useState('mid');
  const [targetLevel, setTargetLevel] = useState('senior');
  const [projectionYears, setProjectionYears] = useState(10);

  const careerGrowth = useMemo(() => {
    if (!originCountry) return null;
    return getCareerGrowth(originCountry.id, selectedIndustry);
  }, [originCountry, selectedIndustry]);

  const salaryNum = salary ? parseFloat(salary.replace(/[^0-9.-]/g, '')) : 0;

  const currentGrowthRate = useMemo(() => {
    if (!careerGrowth) return 5;
    switch (currentLevel) {
      case 'entry': return careerGrowth.entryLevelGrowth;
      case 'mid': return careerGrowth.midLevelGrowth;
      case 'senior': return careerGrowth.seniorLevelGrowth;
      case 'executive': return careerGrowth.executiveGrowth;
      default: return 5;
    }
  }, [careerGrowth, currentLevel]);

  const projectedSalaries = useMemo(() => {
    if (!salaryNum || !careerGrowth) return [];
    return projectSalary(salaryNum, currentGrowthRate, projectionYears);
  }, [salaryNum, currentGrowthRate, projectionYears]);

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
            {t('career.title', '📊 Career Growth Estimator')}
          </h3>
          <p className={styles.subtitle}>
            {t('career.selectCountry', 'Select a country to see career projections')}
          </p>
        </div>
      </motion.div>
    );
  }

  const formatSalary = (value: number) => {
    return formatCurrency(Math.round(value), originCountry.currency);
  };

  const finalSalary = projectedSalaries[projectedSalaries.length - 1];
  const totalGrowth = finalSalary ? finalSalary.salary - salaryNum : 0;
  const growthPercentage = salaryNum > 0 ? ((totalGrowth / salaryNum) * 100).toFixed(1) : '0';

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          {t('career.title', '📊 Career Growth Estimator')}
        </h3>
        <p className={styles.subtitle}>
          {t('career.subtitle', `Project your salary growth in ${originCountry.nameEs}`)}
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.selectGroup}>
          <label className={styles.label}>{t('career.industry', 'Industry')}</label>
          <select 
            className={styles.select}
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            {industries.map(ind => (
              <option key={ind.id} value={ind.id}>
                {i18n.language === 'es' ? ind.nameEs : ind.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label className={styles.label}>{t('career.currentLevel', 'Current Level')}</label>
          <select 
            className={styles.select}
            value={currentLevel}
            onChange={(e) => setCurrentLevel(e.target.value)}
          >
            {careerLevels.map(level => (
              <option key={level.id} value={level.id}>
                {i18n.language === 'es' ? level.nameEs : level.name} ({level.yearsExp} {t('career.years', 'years')})
              </option>
            ))}
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label className={styles.label}>{t('career.targetLevel', 'Target Level')}</label>
          <select 
            className={styles.select}
            value={targetLevel}
            onChange={(e) => setTargetLevel(e.target.value)}
          >
            {careerLevels.map(level => (
              <option key={level.id} value={level.id}>
                {i18n.language === 'es' ? level.nameEs : level.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.sliderGroup}>
          <label className={styles.label}>
            {t('career.projectionYears', 'Projection Years')}: {projectionYears}
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={projectionYears}
            onChange={(e) => setProjectionYears(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>

      {careerGrowth && (
        <div className={styles.growthRates}>
          <div className={styles.rateCard}>
            <span className={styles.rateLabel}>{t('career.avgGrowth', 'Avg Annual Growth')}</span>
            <span className={styles.rateValue}>{currentGrowthRate}%</span>
          </div>
          <div className={styles.rateCard}>
            <span className={styles.rateLabel}>{t('career.promotionFreq', 'Promotion Every')}</span>
            <span className={styles.rateValue}>{careerGrowth.avgYearsToPromotion} {t('career.years', 'years')}</span>
          </div>
        </div>
      )}

      {salaryNum > 0 && projectedSalaries.length > 0 && (
        <>
          <div className={styles.projectionSummary}>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>{t('career.currentSalary', 'Current')}</span>
              <span className={styles.summaryValue}>{formatSalary(salaryNum)}</span>
            </div>
            <div className={styles.summaryArrow}>→</div>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>
                {t('career.after', 'After')} {projectionYears} {t('career.years', 'years')}
              </span>
              <span className={styles.summaryValueHighlight}>
                {formatSalary(finalSalary.salary)}
              </span>
            </div>
            <div className={styles.summaryCard}>
              <span className={styles.summaryLabel}>{t('career.totalGrowth', 'Total Growth')}</span>
              <span className={styles.summaryValuePositive}>
                +{growthPercentage}% ({formatSalary(totalGrowth)})
              </span>
            </div>
          </div>

          <div className={styles.projectionTable}>
            <table>
              <thead>
                <tr>
                  <th>{t('career.year', 'Year')}</th>
                  <th>{t('career.salary', 'Projected Salary')}</th>
                  <th>{t('career.growth', 'Growth from Today')}</th>
                </tr>
              </thead>
              <tbody>
                {projectedSalaries.filter((_, i) => i % 2 === 0 || i === projectedSalaries.length - 1).map((proj) => (
                  <tr key={proj.year}>
                    <td>{proj.year}</td>
                    <td>{formatSalary(proj.salary)}</td>
                    <td>
                      <span className={styles.growthBadge}>
                        +{((proj.totalGrowth / salaryNum) * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.insight}>
            <h4>{t('career.insight', 'Key Insights')}</h4>
            <ul>
              {currentGrowthRate > 6 && (
                <li>{t('career.highGrowth', 'Your industry has strong growth potential - consider negotiating aggressively')}</li>
              )}
              {currentGrowthRate < 4 && (
                <li>{t('career.moderateGrowth', 'Moderate growth expected - consider upskilling to accelerate advancement')}</li>
              )}
              {careerGrowth && careerGrowth.avgYearsToPromotion <= 2 && (
                <li>{t('career.fastPromotions', 'Fast-paced environment with quick promotions')}</li>
              )}
              {careerGrowth && careerGrowth.avgYearsToPromotion >= 4 && (
                <li>{t('career.slowPromotions', 'Slower promotion cycles - patience and consistency are key')}</li>
              )}
              <li>{t('career.advice', 'Remember: salary growth depends on performance, market conditions, and negotiation skills')}</li>
            </ul>
          </div>
        </>
      )}

      {!salary && (
        <div className={styles.noData}>
          <p>{t('career.enterSalary', 'Enter your salary to see career growth projections')}</p>
        </div>
      )}
    </motion.div>
  );
};

export default CareerGrowthEstimator;
