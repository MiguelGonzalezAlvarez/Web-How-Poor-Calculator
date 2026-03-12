import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { motion } from 'framer-motion';
import styles from './SalaryTypeToggle.module.scss';

const SalaryTypeToggle: React.FC = () => {
  const { t } = useTranslation();
  const { salaryType, setSalaryType } = useAppStore();

  return (
    <div className={styles.container}>
      <span className={styles.label}>{t('input.salaryType') || 'Tipo de salario'}</span>
      <div className={styles.toggleWrapper}>
        <motion.button
          className={`${styles.toggle} ${salaryType === 'gross' ? styles.active : ''}`}
          onClick={() => setSalaryType('gross')}
          whileTap={{ scale: 0.95 }}
        >
          <span className={styles.icon}>💰</span>
          <span className={styles.text}>{t('salary.gross') || 'Bruto'}</span>
        </motion.button>
        <motion.button
          className={`${styles.toggle} ${salaryType === 'net' ? styles.active : ''}`}
          onClick={() => setSalaryType('net')}
          whileTap={{ scale: 0.95 }}
        >
          <span className={styles.icon}>🏦</span>
          <span className={styles.text}>{t('salary.net') || 'Neto'}</span>
        </motion.button>
      </div>
      <p className={styles.hint}>
        {salaryType === 'gross' 
          ? (t('salary.grossHint') || 'Antes de impuestos')
          : (t('salary.netHint') || 'Después de impuestos')
        }
      </p>
    </div>
  );
};

export default SalaryTypeToggle;
