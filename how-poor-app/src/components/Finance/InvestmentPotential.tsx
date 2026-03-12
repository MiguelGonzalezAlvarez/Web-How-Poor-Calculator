import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './InvestmentPotential.module.scss';

interface InvestmentData {
  countryId: string;
  stockMarket: string;
  stockMarketEs: string;
  avgReturn: number;
  riskLevel: string;
  riskLevelEs: string;
  bankInterest: number;
  inflation: number;
  realReturn: number;
  propertyYield: number;
}

const investmentData: InvestmentData[] = [
  { countryId: 'us', stockMarket: 'S&P 500', stockMarketEs: 'S&P 500', avgReturn: 10, riskLevel: 'Medium', riskLevelEs: 'Medio', bankInterest: 4.5, inflation: 3.1, realReturn: 6.9, propertyYield: 4.2 },
  { countryId: 'es', stockMarket: 'IBEX 35', stockMarketEs: 'IBEX 35', avgReturn: 7, riskLevel: 'High', riskLevelEs: 'Alto', bankInterest: 3.2, inflation: 2.8, realReturn: 4.2, propertyYield: 4.5 },
  { countryId: 'de', stockMarket: 'DAX', stockMarketEs: 'DAX', avgReturn: 8, riskLevel: 'Medium', riskLevelEs: 'Medio', bankInterest: 3.0, inflation: 2.5, realReturn: 5.5, propertyYield: 3.0 },
  { countryId: 'gb', stockMarket: 'FTSE 100', stockMarketEs: 'FTSE 100', avgReturn: 7, riskLevel: 'Medium', riskLevelEs: 'Medio', bankInterest: 4.8, inflation: 3.2, realReturn: 3.8, propertyYield: 3.8 },
  { countryId: 'fr', stockMarket: 'CAC 40', stockMarketEs: 'CAC 40', avgReturn: 8, riskLevel: 'Medium', riskLevelEs: 'Medio', bankInterest: 2.8, inflation: 2.3, realReturn: 5.7, propertyYield: 3.5 },
  { countryId: 'pt', stockMarket: 'PSI 20', stockMarketEs: 'PSI 20', avgReturn: 6, riskLevel: 'High', riskLevelEs: 'Alto', bankInterest: 2.5, inflation: 2.9, realReturn: 3.1, propertyYield: 4.2 },
  { countryId: 'mx', stockMarket: 'IPC', stockMarketEs: 'IPC', avgReturn: 12, riskLevel: 'High', riskLevelEs: 'Alto', bankInterest: 8.5, inflation: 4.2, realReturn: 7.8, propertyYield: 4.8 },
  { countryId: 'ca', stockMarket: 'TSX', stockMarketEs: 'TSX', avgReturn: 8, riskLevel: 'Medium', riskLevelEs: 'Medio', bankInterest: 4.0, inflation: 2.6, realReturn: 5.4, propertyYield: 3.5 },
];

const InvestmentPotential: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry, salary } = useAppStore();

  const investData = useMemo(() => {
    if (!originCountry) return investmentData[0];
    return investmentData.find(i => i.countryId === originCountry.id) || investmentData[0];
  }, [originCountry]);

  const salaryNum = salary ? parseFloat(salary.replace(/[^0-9.-]/g, '')) : 0;
  const isEs = i18n.language === 'es';

  const investmentOptions = useMemo(() => {
    if (!salaryNum) return [];
    const monthly = salaryNum / 12;
    return [
      { name: 'Stock Market', nameEs: 'Bolsa', amount: monthly * 0.3, return10: monthly * 0.3 * Math.pow(1 + investData.avgReturn / 100, 10) },
      { name: 'Bank Savings', nameEs: 'Ahorro Banco', amount: monthly * 0.2, return10: monthly * 0.2 * Math.pow(1 + investData.bankInterest / 100, 10) },
      { name: 'Property', nameEs: 'Propiedad', amount: monthly * 0.1, return10: monthly * 0.1 * Math.pow(1 + investData.propertyYield / 100, 10) },
    ];
  }, [salaryNum, investData]);

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
            💹 {t('investment.title', 'Investment Potential')}
          </h3>
          <p className={styles.subtitle}>
            {t('investment.selectCountry', 'Select a country to see investment options')}
          </p>
        </div>
      </motion.div>
    );
  }

  const formatAmount = (value: number) => {
    return formatCurrency(Math.round(value), originCountry.currency);
  };

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          💹 {t('investment.title', 'Investment Potential')}
        </h3>
        <p className={styles.subtitle}>
          {t('investment.subtitle', `Investment opportunities in ${originCountry.nameEs}`)}
        </p>
      </div>

      <div className={styles.marketInfo}>
        <div className={styles.marketCard}>
          <span className={styles.marketIcon}>📈</span>
          <div className={styles.marketInfo}>
            <span className={styles.marketLabel}>{t('investment.market', 'Stock Market')}</span>
            <span className={styles.marketValue}>{isEs ? investData.stockMarketEs : investData.stockMarket}</span>
          </div>
        </div>
        <div className={styles.marketCard}>
          <span className={styles.marketIcon}>📊</span>
          <div className={styles.marketInfo}>
            <span className={styles.marketLabel}>{t('investment.avgReturn', 'Avg Return')}</span>
            <span className={styles.marketValue}>{investData.avgReturn}%</span>
          </div>
        </div>
        <div className={styles.marketCard}>
          <span className={styles.marketIcon}>⚠️</span>
          <div className={styles.marketInfo}>
            <span className={styles.marketLabel}>{t('investment.risk', 'Risk Level')}</span>
            <span className={styles.marketValue}>{isEs ? investData.riskLevelEs : investData.riskLevel}</span>
          </div>
        </div>
        <div className={styles.marketCard}>
          <span className={styles.marketIcon}>🏦</span>
          <div className={styles.marketInfo}>
            <span className={styles.marketLabel}>{t('investment.bankRate', 'Bank Interest')}</span>
            <span className={styles.marketValue}>{investData.bankInterest}%</span>
          </div>
        </div>
        <div className={styles.marketCard}>
          <span className={styles.marketIcon}>💵</span>
          <div className={styles.marketInfo}>
            <span className={styles.marketLabel}>{t('investment.realReturn', 'Real Return')}</span>
            <span className={styles.marketValue}>{investData.realReturn}%</span>
          </div>
        </div>
        <div className={styles.marketCard}>
          <span className={styles.marketIcon}>🏠</span>
          <div className={styles.marketInfo}>
            <span className={styles.marketLabel}>{t('investment.propertyYield', 'Property Yield')}</span>
            <span className={styles.marketValue}>{investData.propertyYield}%</span>
          </div>
        </div>
      </div>

      {salaryNum > 0 && (
        <div className={styles.projectionSection}>
          <h4>{t('investment.10year', '10-Year Projection (investing 20% of salary)')}</h4>
          <div className={styles.projectionList}>
            {investmentOptions.map((opt, idx) => (
              <div key={idx} className={styles.projectionCard}>
                <div className={styles.projInfo}>
                  <span className={styles.projName}>{isEs ? opt.nameEs : opt.name}</span>
                  <span className={styles.projMonthly}>{formatAmount(opt.amount)}/mo</span>
                </div>
                <div className={styles.projReturns}>
                  <span className={styles.projLabel}>{t('investment.after10', 'After 10 years')}</span>
                  <span className={styles.projValue}>{formatAmount(opt.return10)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={styles.disclaimer}>
        <p>⚠️ {t('investment.disclaimer', 'Investments involve risk. Past performance does not guarantee future results. Consult a financial advisor.')}</p>
      </div>
    </motion.div>
  );
};

export default InvestmentPotential;
