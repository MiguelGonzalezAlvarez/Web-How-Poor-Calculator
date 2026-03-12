import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import styles from './RemoteSalaryCalculator.module.scss';

interface RemoteSalaryData {
  countryId: string;
  usCompany: number;
  euCompany: number;
  ukCompany: number;
}

const remoteSalaryData: RemoteSalaryData[] = [
  { countryId: 'us', usCompany: 120000, euCompany: 85000, ukCompany: 95000 },
  { countryId: 'es', usCompany: 65000, euCompany: 45000, ukCompany: 50000 },
  { countryId: 'de', usCompany: 75000, euCompany: 55000, ukCompany: 60000 },
  { countryId: 'gb', usCompany: 80000, euCompany: 58000, ukCompany: 65000 },
  { countryId: 'fr', usCompany: 70000, euCompany: 50000, ukCompany: 55000 },
  { countryId: 'pt', usCompany: 55000, euCompany: 40000, ukCompany: 45000 },
  { countryId: 'nl', usCompany: 72000, euCompany: 52000, ukCompany: 57000 },
  { countryId: 'mx', usCompany: 45000, euCompany: 32000, ukCompany: 35000 },
  { countryId: 'ca', usCompany: 90000, euCompany: 65000, ukCompany: 72000 },
  { countryId: 'au', usCompany: 85000, euCompany: 60000, ukCompany: 68000 },
];

const RemoteSalaryCalculator: React.FC = () => {
  const { t } = useTranslation();
  const { originCountry, salary } = useAppStore();

  const remoteData = useMemo(() => {
    if (!originCountry) return remoteSalaryData[0];
    return remoteSalaryData.find(r => r.countryId === originCountry.id) || remoteSalaryData[0];
  }, [originCountry]);

  const salaryNum = salary ? parseFloat(salary.replace(/[^0-9.-]/g, '')) : 0;

  const comparisons = useMemo(() => {
    return [
      { company: 'US Company', remote: remoteData.usCompany, diff: remoteData.usCompany - salaryNum, percent: salaryNum > 0 ? ((remoteData.usCompany - salaryNum) / salaryNum * 100).toFixed(1) : '0' },
      { company: 'EU Company', remote: remoteData.euCompany, diff: remoteData.euCompany - salaryNum, percent: salaryNum > 0 ? ((remoteData.euCompany - salaryNum) / salaryNum * 100).toFixed(1) : '0' },
      { company: 'UK Company', remote: remoteData.ukCompany, diff: remoteData.ukCompany - salaryNum, percent: salaryNum > 0 ? ((remoteData.ukCompany - salaryNum) / salaryNum * 100).toFixed(1) : '0' },
    ];
  }, [remoteData, salaryNum]);

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
            🖥️ {t('remoteCalc.title', 'Remote Salary Calculator')}
          </h3>
          <p className={styles.subtitle}>
            {t('remoteCalc.selectCountry', 'Select a country to see remote salary potential')}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          🖥️ {t('remoteCalc.title', 'Remote Salary Calculator')}
        </h3>
        <p className={styles.subtitle}>
          {t('remoteCalc.subtitle', `Working remotely for international companies from ${originCountry.nameEs}`)}
        </p>
      </div>

      <div className={styles.infoBox}>
        <p>{t('remoteCalc.info', 'Remote work for international companies can significantly increase your earning potential. Salaries shown are approximate gross annual salaries.')}</p>
      </div>

      <div className={styles.comparisonGrid}>
        {comparisons.map((comp) => (
          <div key={comp.company} className={styles.compCard}>
            <div className={styles.compHeader}>
              <span className={styles.compIcon}>🏢</span>
              <span className={styles.compName}>{comp.company}</span>
            </div>
            <div className={styles.compSalary}>
              <span className={styles.salaryLabel}>{t('remoteCalc.remoteSalary', 'Remote Salary')}</span>
              <span className={styles.salaryValue}>${comp.remote.toLocaleString()}</span>
            </div>
            {salaryNum > 0 && (
              <div className={styles.compDiff}>
                <span className={`${styles.diffValue} ${comp.diff > 0 ? styles.positive : styles.negative}`}>
                  {comp.diff > 0 ? '+' : ''}${comp.diff.toLocaleString()} ({comp.percent}%)
                </span>
                <span className={styles.diffLabel}>{t('remoteCalc.vsLocal', 'vs local salary')}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.insight}>
        <h4>💡 {t('remoteCalc.insights', 'Key Insights')}</h4>
        <ul>
          {remoteData.usCompany > salaryNum * 1.3 && (
            <li>{t('remoteCalc.usAdvantage', 'Working for US companies can increase your salary by 30%+')}</li>
          )}
          <li>{t('remoteCalc.taxes', 'Consider tax implications of receiving foreign income')}</li>
          <li>{t('remoteCalc.benefits', 'Many remote positions include additional benefits like equipment stipends')}</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default RemoteSalaryCalculator;
