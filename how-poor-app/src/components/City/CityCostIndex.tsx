import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { citiesData, getCityById } from '../../data/cities';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './CityCostIndex.module.scss';

const CityCostIndex: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry } = useAppStore();
  
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [compareCity, setCompareCity] = useState<string | null>(null);

  const countryCities = useMemo(() => {
    if (!originCountry) return citiesData.slice(0, 6);
    return citiesData.filter(city => city.countryId === originCountry.id);
  }, [originCountry]);

  const handleCitySelect = (cityId: string) => {
    if (compareMode && selectedCity) {
      setCompareCity(cityId);
    } else {
      setSelectedCity(cityId);
    }
  };

  const getComparisonResult = (city1Id: string, city2Id: string) => {
    const city1 = getCityById(city1Id);
    const city2 = getCityById(city2Id);
    if (!city1 || !city2) return null;

    const diff = city1.costIndex - city2.costIndex;
    if (Math.abs(diff) < 10) return 'similar';
    return diff > 0 ? 'more' : 'less';
  };

  const formatIndex = (index: number) => {
    return `${index}%`;
  };

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
            🏙️ {t('city.title') || 'City Cost Index'}
          </h3>
          <p className={styles.subtitle}>
            {t('city.selectCountry') || 'Select a country to see city comparisons'}
          </p>
        </div>
      </motion.div>
    );
  }

  const city1 = selectedCity ? getCityById(selectedCity) : null;
  const city2 = compareCity ? getCityById(compareCity) : null;
  const comparisonResult = selectedCity && compareCity 
    ? getComparisonResult(selectedCity, compareCity) 
    : null;

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          🏙️ {t('city.title') || 'City Cost Index'}
        </h3>
        <p className={styles.subtitle}>
          {t('city.subtitle') || `Compare cities in ${originCountry.nameEs}`}
        </p>
      </div>

      <div className={styles.actions}>
        <button 
          className={`${styles.compareToggle} ${compareMode ? styles.active : ''}`}
          onClick={() => {
            setCompareMode(!compareMode);
            setCompareCity(null);
          }}
        >
          {t('city.compare') || 'Compare'}
        </button>
      </div>

      <div className={styles.cityGrid}>
        {countryCities.map((city) => (
          <motion.div
            key={city.id}
            className={`${styles.cityCard} ${
              selectedCity === city.id ? styles.selected : ''
            } ${compareCity === city.id ? styles.compared : ''}`}
            onClick={() => handleCitySelect(city.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={styles.cityName}>{city.name}</div>
            <div className={styles.cityIndex}>
              <span className={styles.indexLabel}>{t('city.costIndex') || 'Cost'}</span>
              <span className={styles.indexValue}>{formatIndex(city.costIndex)}</span>
            </div>
            <div className={styles.cityDetails}>
              <div className={styles.detailRow}>
                <span>🏠 {t('city.rent') || 'Rent'}</span>
                <span>{formatIndex(city.rentIndex)}</span>
              </div>
              <div className={styles.detailRow}>
                <span>🛒 {t('city.groceries') || 'Groceries'}</span>
                <span>{formatIndex(city.groceriesIndex)}</span>
              </div>
              <div className={styles.detailRow}>
                <span>🍽️ {t('city.restaurants') || 'Restaurants'}</span>
                <span>{formatIndex(city.restaurantsIndex)}</span>
              </div>
              <div className={styles.detailRow}>
                <span>🚌 {t('city.transport') || 'Transport'}</span>
                <span>{formatIndex(city.transportIndex)}</span>
              </div>
            </div>
            <div className={styles.cityScores}>
              <div className={styles.scoreItem}>
                <span className={styles.scoreLabel}>⭐ {t('city.quality') || 'Quality'}</span>
                <span className={styles.scoreValue}>{city.qualityOfLife}</span>
              </div>
              <div className={styles.scoreItem}>
                <span className={styles.scoreLabel}>🔒 {t('city.safety') || 'Safety'}</span>
                <span className={styles.scoreValue}>{city.safety}</span>
              </div>
              <div className={styles.scoreItem}>
                <span className={styles.scoreLabel}>☀️ {t('city.climate') || 'Climate'}</span>
                <span className={styles.scoreValue}>{city.climate}</span>
              </div>
              <div className={styles.scoreItem}>
                <span className={styles.scoreLabel}>💼 {t('city.remote') || 'Remote'}</span>
                <span className={styles.scoreValue}>{city.remoteFriendly}%</span>
              </div>
            </div>
            <div className={styles.salaryInfo}>
              <span className={styles.salaryLabel}>{t('city.avgSalary') || 'Avg Salary'}</span>
              <span className={styles.salaryValue}>{formatCurrency(city.averageSalary, 'USD')}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedCity && city1 && (
        <div className={styles.selectedCityDetail}>
          <h4>{t('city.selectedCity') || 'Selected City'}: {city1.name}</h4>
          <div className={styles.detailGrid}>
            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>💰</span>
              <span className={styles.detailLabel}>{t('city.costIndex') || 'Cost Index'}</span>
              <span className={styles.detailValue}>{city1.costIndex}%</span>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>🏠</span>
              <span className={styles.detailLabel}>{t('city.rentIndex') || 'Rent Index'}</span>
              <span className={styles.detailValue}>{city1.rentIndex}%</span>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>⭐</span>
              <span className={styles.detailLabel}>{t('city.qualityOfLife') || 'Quality of Life'}</span>
              <span className={styles.detailValue}>{city1.qualityOfLife}</span>
            </div>
            <div className={styles.detailCard}>
              <span className={styles.detailIcon}>🏢</span>
              <span className={styles.detailLabel}>{t('city.startups') || 'Startups Score'}</span>
              <span className={styles.detailValue}>{city1.startupsScore}</span>
            </div>
          </div>
        </div>
      )}

      {compareMode && compareCity && city1 && city2 && comparisonResult && (
        <div className={styles.comparisonResult}>
          <h4>{t('city.comparison') || 'Comparison'}: {city1.name} vs {city2.name}</h4>
          <div className={styles.comparisonContent}>
            {comparisonResult === 'similar' ? (
              <p className={styles.similarResult}>
                {t('city.similarCost') || 'Both cities have similar cost of living'}
              </p>
            ) : comparisonResult === 'more' ? (
              <p className={styles.moreResult}>
                {city1.name} {t('city.is') || 'is'} {Math.abs(city1.costIndex - city2.costIndex)}% {t('city.moreExpensive') || 'more expensive than'} {city2.name}
              </p>
            ) : (
              <p className={styles.lessResult}>
                {city1.name} {t('city.is') || 'is'} {Math.abs(city1.costIndex - city2.costIndex)}% {t('city.cheaper') || 'cheaper than'} {city2.name}
              </p>
            )}
          </div>
          <div className={styles.compareDetails}>
            <div className={styles.compareRow}>
              <span>{t('city.rent') || 'Rent'}</span>
              <span>{city1.rentIndex}% vs {city2.rentIndex}%</span>
            </div>
            <div className={styles.compareRow}>
              <span>{t('city.groceries') || 'Groceries'}</span>
              <span>{city1.groceriesIndex}% vs {city2.groceriesIndex}%</span>
            </div>
            <div className={styles.compareRow}>
              <span>{t('city.transport') || 'Transport'}</span>
              <span>{city1.transportIndex}% vs {city2.transportIndex}%</span>
            </div>
            <div className={styles.compareRow}>
              <span>{t('city.quality') || 'Quality'}</span>
              <span>{city1.qualityOfLife} vs {city2.qualityOfLife}</span>
            </div>
            <div className={styles.compareRow}>
              <span>{t('city.remote') || 'Remote Friendly'}</span>
              <span>{city1.remoteFriendly}% vs {city2.remoteFriendly}%</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CityCostIndex;
