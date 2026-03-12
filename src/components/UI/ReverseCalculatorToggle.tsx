import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import styles from './ReverseCalculatorToggle.module.scss';

const ReverseCalculatorToggle: React.FC = () => {
  const { t } = useTranslation();
  const { reverseMode, toggleReverseMode } = useAppStore();

  return (
    <div className={styles.container}>
      <span className={styles.label}>{t('reverseCalculator.title')}</span>
      <button
        className={`${styles.toggle} ${reverseMode ? styles.active : ''}`}
        onClick={toggleReverseMode}
        role="switch"
        aria-checked={reverseMode}
      >
        <span className={reverseMode ? styles.activeText : ''}>
          {t('reverseCalculator.equivalent')}
        </span>
        <span className={styles.switch}>
          <span className={styles.thumb} />
        </span>
        <span className={!reverseMode ? styles.activeText : ''}>
          {t('reverseCalculator.offer')}
        </span>
      </button>
    </div>
  );
};

export default ReverseCalculatorToggle;
