import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import styles from './QuickModeToggle.module.scss';

const QuickModeToggle: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { quickMode, setQuickMode } = useAppStore();

  return (
    <label className={styles.toggle}>
      <input
        type="checkbox"
        checked={quickMode}
        onChange={(e) => setQuickMode(e.target.checked)}
      />
      <span className={styles.slider}></span>
      <span className={styles.label}>
        {i18n.language === 'es' ? 'Modo Rápido' : 'Quick Mode'}
      </span>
    </label>
  );
};

export default QuickModeToggle;
