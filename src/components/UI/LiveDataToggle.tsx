import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import styles from './LiveDataToggle.module.scss';

const LiveDataToggle: React.FC = () => {
  const { t } = useTranslation();
  const { liveDataMode, toggleLiveDataMode } = useAppStore();

  return (
    <button
      className={`${styles.toggle} ${liveDataMode ? styles.active : ''}`}
      onClick={toggleLiveDataMode}
      title={t('liveData.toggleTooltip', 'Toggle live exchange rates')}
    >
      <span className={styles.icon}>📡</span>
      <span className={styles.label}>
        {t('liveData.label', 'Live Rates')}
      </span>
      <span className={styles.status}>
        {liveDataMode ? t('liveData.on', 'ON') : t('liveData.off', 'OFF')}
      </span>
    </button>
  );
};

export default LiveDataToggle;
