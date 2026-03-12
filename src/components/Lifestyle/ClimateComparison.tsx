import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import styles from './ClimateComparison.module.scss';

interface ClimateData {
  countryId: string;
  avgTemp: number;
  sunshine: number;
  rainfall: number;
  humidity: number;
  airQuality: number;
  seasons: string;
}

const climateData: ClimateData[] = [
  { countryId: 'us', avgTemp: 55, sunshine: 65, rainfall: 30, humidity: 45, airQuality: 75, seasons: '4' },
  { countryId: 'es', avgTemp: 65, sunshine: 75, rainfall: 20, humidity: 50, airQuality: 85, seasons: '4' },
  { countryId: 'de', avgTemp: 48, sunshine: 55, rainfall: 35, humidity: 55, airQuality: 80, seasons: '4' },
  { countryId: 'gb', avgTemp: 50, sunshine: 45, rainfall: 40, humidity: 60, airQuality: 78, seasons: '4' },
  { countryId: 'fr', avgTemp: 55, sunshine: 60, rainfall: 28, humidity: 52, airQuality: 82, seasons: '4' },
  { countryId: 'pt', avgTemp: 62, sunshine: 80, rainfall: 25, humidity: 48, airQuality: 88, seasons: '4' },
  { countryId: 'mx', avgTemp: 70, sunshine: 70, rainfall: 35, humidity: 55, airQuality: 70, seasons: '2' },
  { countryId: 'ca', avgTemp: 42, sunshine: 55, rainfall: 32, humidity: 50, airQuality: 85, seasons: '4' },
  { countryId: 'au', avgTemp: 65, sunshine: 75, rainfall: 20, humidity: 45, airQuality: 82, seasons: '4' },
  { countryId: 'nl', avgTemp: 48, sunshine: 50, rainfall: 38, humidity: 58, airQuality: 80, seasons: '4' },
];

const ClimateComparison: React.FC = () => {
  const { t } = useTranslation();
  const { originCountry, destinationCountry } = useAppStore();

  const originData = useMemo(() => {
    if (!originCountry) return climateData[0];
    return climateData.find(c => c.countryId === originCountry.id) || climateData[0];
  }, [originCountry]);

  const destinationData = useMemo(() => {
    if (!destinationCountry) return null;
    return climateData.find(c => c.countryId === destinationCountry.id);
  }, [destinationCountry]);

  const getTempClass = (temp: number) => {
    if (temp >= 70) return styles.hot;
    if (temp >= 55) return styles.warm;
    if (temp >= 40) return styles.moderate;
    return styles.cold;
  };

  const getAirClass = (quality: number) => {
    if (quality >= 85) return styles.excellent;
    if (quality >= 75) return styles.good;
    return styles.moderate;
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
          🌤️ {t('climate.title', 'Climate Comparison')}
        </h3>
        <p className={styles.subtitle}>
          {t('climate.subtitle', 'Compare climate conditions between countries')}
        </p>
      </div>

      <div className={styles.countriesRow}>
        <div className={styles.countryCard}>
          <span className={styles.cardLabel}>{t('climate.current', 'Current')}</span>
          <span className={styles.countryName}>{originCountry?.nameEs || 'US'}</span>
        </div>
        {destinationData && (
          <>
            <div className={styles.arrow}>→</div>
            <div className={styles.countryCard}>
              <span className={styles.cardLabel}>{t('climate.destination', 'Destination')}</span>
              <span className={styles.countryName}>{destinationCountry?.nameEs || 'ES'}</span>
            </div>
          </>
        )}
      </div>

      <div className={styles.metricsGrid}>
        <div className={styles.metricCard}>
          <span className={styles.metricIcon}>🌡️</span>
          <span className={styles.metricLabel}>{t('climate.temp', 'Avg Temp')}</span>
          <span className={`${styles.metricValue} ${getTempClass(originData.avgTemp)}`}>{originData.avgTemp}°F</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricIcon}>☀️</span>
          <span className={styles.metricLabel}>{t('climate.sunshine', 'Sunshine')}</span>
          <span className={styles.metricValue}>{originData.sunshine}%</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricIcon}>🌧️</span>
          <span className={styles.metricLabel}>{t('climate.rainfall', 'Rainfall')}</span>
          <span className={styles.metricValue}>{originData.rainfall} days</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricIcon}>💧</span>
          <span className={styles.metricLabel}>{t('climate.humidity', 'Humidity')}</span>
          <span className={styles.metricValue}>{originData.humidity}%</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricIcon}>🌬️</span>
          <span className={styles.metricLabel}>{t('climate.air', 'Air Quality')}</span>
          <span className={`${styles.metricValue} ${getAirClass(originData.airQuality)}`}>{originData.airQuality}</span>
        </div>
        <div className={styles.metricCard}>
          <span className={styles.metricIcon}>🍂</span>
          <span className={styles.metricLabel}>{t('climate.seasons', 'Seasons')}</span>
          <span className={styles.metricValue}>{originData.seasons}</span>
        </div>
      </div>

      {destinationData && (
        <>
          <div className={styles.divider}>
            <span>{t('climate.destinationData', 'Destination Data')}</span>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>🌡️</span>
              <span className={styles.metricLabel}>{t('climate.temp', 'Avg Temp')}</span>
              <span className={`${styles.metricValue} ${getTempClass(destinationData.avgTemp)}`}>{destinationData.avgTemp}°F</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>☀️</span>
              <span className={styles.metricLabel}>{t('climate.sunshine', 'Sunshine')}</span>
              <span className={styles.metricValue}>{destinationData.sunshine}%</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>🌧️</span>
              <span className={styles.metricLabel}>{t('climate.rainfall', 'Rainfall')}</span>
              <span className={styles.metricValue}>{destinationData.rainfall} days</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>💧</span>
              <span className={styles.metricLabel}>{t('climate.humidity', 'Humidity')}</span>
              <span className={styles.metricValue}>{destinationData.humidity}%</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>🌬️</span>
              <span className={styles.metricLabel}>{t('climate.air', 'Air Quality')}</span>
              <span className={`${styles.metricValue} ${getAirClass(destinationData.airQuality)}`}>{destinationData.airQuality}</span>
            </div>
            <div className={styles.metricCard}>
              <span className={styles.metricIcon}>🍂</span>
              <span className={styles.metricLabel}>{t('climate.seasons', 'Seasons')}</span>
              <span className={styles.metricValue}>{destinationData.seasons}</span>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default ClimateComparison;
