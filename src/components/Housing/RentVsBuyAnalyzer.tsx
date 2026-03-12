import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { getHousingByCountry, calculateRentVsBuy, HousingMarketData } from '../../data/housingMarkets';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './RentVsBuyAnalyzer.module.scss';

const RentVsBuyAnalyzer: React.FC = () => {
  const { t } = useTranslation();
  const { originCountry } = useAppStore();
  
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const [yearsToStay, setYearsToStay] = useState(7);
  const [downPayment, setDownPayment] = useState(20);
  const [propertyType, setPropertyType] = useState<'1br' | '2br' | '3br'>('1br');

  const countryHousing = useMemo(() => {
    if (!originCountry) return [];
    return getHousingByCountry(originCountry.id);
  }, [originCountry]);

  const selectedHousing = useMemo(() => {
    if (!selectedCityId) return countryHousing[0];
    return countryHousing.find(h => h.cityId === selectedCityId) || countryHousing[0];
  }, [selectedCityId, countryHousing]);

  const analysis = useMemo(() => {
    if (!selectedHousing) return null;

    const rentPrice = propertyType === '1br' ? selectedHousing.averageRent1BR :
                      propertyType === '2br' ? selectedHousing.averageRent2BR :
                      selectedHousing.averageRent3BR;
    
    const buyPrice = propertyType === '1br' ? selectedHousing.avgBuyPrice1BR :
                     propertyType === '2br' ? selectedHousing.avgBuyPrice2BR :
                     selectedHousing.avgBuyPrice3BR;

    return calculateRentVsBuy(rentPrice, buyPrice, selectedHousing.mortgageRate5yr, yearsToStay, downPayment);
  }, [selectedHousing, propertyType, yearsToStay, downPayment]);

  if (!originCountry || countryHousing.length === 0) {
    return (
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>
            🏠 {t('rentVsBuy.title') || 'Rent vs Buy Analyzer'}
          </h3>
          <p className={styles.subtitle}>
            {t('rentVsBuy.selectCountry') || 'Select a country to analyze rent vs buy options'}
          </p>
        </div>
      </motion.div>
    );
  }

  const getRecommendationColor = () => {
    if (!analysis) return '';
    if (analysis.recommendation === 'buy') return styles.recommendBuy;
    if (analysis.recommendation === 'rent') return styles.recommendRent;
    return styles.recommendNeutral;
  };

  const getRecommendationText = () => {
    if (!analysis) return '';
    if (analysis.recommendation === 'buy') return t('rentVsBuy.buy') || 'Buy';
    if (analysis.recommendation === 'rent') return t('rentVsBuy.rent') || 'Rent';
    return t('rentVsBuy.neutral') || 'Neutral';
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
          🏠 {t('rentVsBuy.title') || 'Rent vs Buy Analyzer'}
        </h3>
        <p className={styles.subtitle}>
          {t('rentVsBuy.subtitle') || `Should you rent or buy in ${originCountry.nameEs}?`}
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.selectGroup}>
          <label className={styles.label}>{t('rentVsBuy.city') || 'City'}</label>
          <select 
            className={styles.select}
            value={selectedCityId || countryHousing[0]?.cityId || ''}
            onChange={(e) => setSelectedCityId(e.target.value)}
          >
            {countryHousing.map(h => (
              <option key={h.cityId} value={h.cityId}>{h.cityName}</option>
            ))}
          </select>
        </div>

        <div className={styles.selectGroup}>
          <label className={styles.label}>{t('rentVsBuy.propertyType') || 'Property Type'}</label>
          <div className={styles.propertyButtons}>
            {(['1br', '2br', '3br'] as const).map(type => (
              <button
                key={type}
                className={`${styles.propertyBtn} ${propertyType === type ? styles.active : ''}`}
                onClick={() => setPropertyType(type)}
              >
                {type === '1br' && '1 🛏️'}
                {type === '2br' && '2 🛏️'}
                {type === '3br' && '3 🛏️'}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.sliderGroup}>
          <label className={styles.label}>
            {t('rentVsBuy.yearsToStay') || 'Years to stay'}: {yearsToStay}
          </label>
          <input
            type="range"
            min="3"
            max="15"
            value={yearsToStay}
            onChange={(e) => setYearsToStay(Number(e.target.value))}
            className={styles.slider}
          />
        </div>

        <div className={styles.sliderGroup}>
          <label className={styles.label}>
            {t('rentVsBuy.downPayment') || 'Down payment'}: {downPayment}%
          </label>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className={styles.slider}
          />
        </div>
      </div>

      {selectedHousing && analysis && (
        <>
          <div className={`${styles.recommendation} ${getRecommendationColor()}`}>
            <span className={styles.recommIcon}>
              {analysis.recommendation === 'buy' ? '🏡' : analysis.recommendation === 'rent' ? '🔑' : '⚖️'}
            </span>
            <div className={styles.recommText}>
              <span className={styles.recommLabel}>{t('rentVsBuy.recommendation') || 'Recommendation'}</span>
              <span className={styles.recommValue}>{getRecommendationText()}</span>
            </div>
          </div>

          <div className={styles.comparisonGrid}>
            <div className={styles.costCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>🔑</span>
                <span className={styles.cardTitle}>{t('rentVsBuy.rentOption') || 'Renting'}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.monthlyCost}>
                  <span className={styles.costLabel}>{t('rentVsBuy.monthly') || 'Monthly'}</span>
                  <span className={styles.costValue}>
                    {formatCurrency(
                      propertyType === '1br' ? selectedHousing.averageRent1BR :
                      propertyType === '2br' ? selectedHousing.averageRent2BR :
                      selectedHousing.averageRent3BR,
                      'USD'
                    )}
                  </span>
                </div>
                <div className={styles.totalCost}>
                  <span className={styles.costLabel}>{t('rentVsBuy.total') || `Total (${yearsToStay} years)`}</span>
                  <span className={styles.costValue}>{formatCurrency(analysis.totalRentCost, 'USD')}</span>
                </div>
              </div>
              <div className={styles.cardPros}>
                <span>✅ {t('rentVsBuy.flexibility') || 'Flexibility'}</span>
                <span>✅ {t('rentVsBuy.noMaintenance') || 'No maintenance'}</span>
                <span>✅ {t('rentVsBuy.lowerUpfront') || 'Lower upfront cost'}</span>
              </div>
            </div>

            <div className={styles.costCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardIcon}>🏡</span>
                <span className={styles.cardTitle}>{t('rentVsBuy.buyOption') || 'Buying'}</span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.monthlyCost}>
                  <span className={styles.costLabel}>{t('rentVsBuy.monthly') || 'Monthly'}</span>
                  <span className={styles.costValue}>{formatCurrency(Math.round(analysis.monthlyMortgage), 'USD')}</span>
                </div>
                <div className={styles.totalCost}>
                  <span className={styles.costLabel}>{t('rentVsBuy.total') || `Total (${yearsToStay} years)`}</span>
                  <span className={styles.costValue}>{formatCurrency(Math.round(analysis.totalBuyCost), 'USD')}</span>
                </div>
              </div>
              <div className={styles.cardPros}>
                <span>✅ {t('rentVsBuy.equity') || 'Build equity'}</span>
                <span>✅ {t('rentVsBuy.stability') || 'Stability'}</span>
                <span>✅ {t('rentVsBuy.customization') || 'Customization'}</span>
              </div>
            </div>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>{t('rentVsBuy.priceToRent') || 'Price-to-Rent Ratio'}</span>
              <span className={styles.metricValue}>{selectedHousing.priceToRentRatio}:1</span>
              <span className={styles.metricHint}>
                {selectedHousing.priceToRentRatio > 20 ? t('rentVsBuy.rentBetter') || 'Renting typically better' : 
                 selectedHousing.priceToRentRatio < 15 ? t('rentVsBuy.buyBetter') || 'Buying typically better' : 
                 t('rentVsBuy.balanced') || 'Balanced market'}
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>{t('rentVsBuy.rentalYield') || 'Rental Yield'}</span>
              <span className={styles.metricValue}>{selectedHousing.rentalYield}%</span>
              <span className={styles.metricHint}>
                {selectedHousing.rentalYield > 5 ? t('rentVsBuy.goodYield') || 'Good investment yield' : 
                 selectedHousing.rentalYield < 3 ? t('rentVsBuy.lowYield') || 'Low yield - appreciation focus' : 
                 t('rentVsBuy.avgYield') || 'Average yield'}
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>{t('rentVsBuy.priceGrowth') || '1-Year Price Growth'}</span>
              <span className={`${styles.metricValue} ${selectedHousing.priceGrowth1yr >= 0 ? styles.positive : styles.negative}`}>
                {selectedHousing.priceGrowth1yr >= 0 ? '+' : ''}{selectedHousing.priceGrowth1yr}%
              </span>
              <span className={styles.metricHint}>
                {selectedHousing.priceGrowth1yr > 0 ? t('rentVsBuy.appreciating') || 'Market appreciating' : 
                 selectedHousing.priceGrowth1yr < 0 ? t('rentVsBuy.declining') || 'Market cooling' : 
                 t('rentVsBuy.stable') || 'Stable market'}
              </span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricLabel}>{t('rentVsBuy.mortgageRate') || '5yr Mortgage Rate'}</span>
              <span className={styles.metricValue}>{selectedHousing.mortgageRate5yr}%</span>
              <span className={styles.metricHint}>
                {t('rentVsBuy.currentRate') || 'Current average rate'}
              </span>
            </div>
          </div>

          <div className={styles.insight}>
            <h4>{t('rentVsBuy.insight') || 'Key Insights'}</h4>
            <ul>
              {analysis.rentBreakEven > yearsToStay && (
                <li>{t('rentVsBuy.breakEvenBuy') || `Buying breaks even after ${Math.round(analysis.rentBreakEven)} years - buy if staying longer`}</li>
              )}
              {analysis.rentBreakEven <= yearsToStay && (
                <li>{t('rentVsBuy.breakEvenRent') || `Renting is more cost-effective for ${yearsToStay} years`}</li>
              )}
              {selectedHousing.priceGrowth1yr > 3 && (
                <li>{t('rentVsBuy.highGrowth') || 'Strong price appreciation - buying may be better for long-term gains'}</li>
              )}
              {selectedHousing.priceGrowth1yr < 0 && (
                <li>{t('rentVsBuy.coolingMarket') || 'Market is cooling - consider renting and waiting'}</li>
              )}
              {selectedHousing.priceToRentRatio > 25 && (
                <li>{t('rentVsBuy.highRatio') || 'High price-to-rent ratio favors renting in the short term'}</li>
              )}
            </ul>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default RentVsBuyAnalyzer;
