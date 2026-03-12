import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { calculateFamilyCosts } from '../../data/family';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './FamilyCostCalculator.module.scss';

const FamilyCostCalculator: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry } = useAppStore();
  
  const [numberOfChildren, setNumberOfChildren] = useState(1);
  const [childrenAges, setChildrenAges] = useState<number[]>([5]);
  const [schoolType, setSchoolType] = useState<'public' | 'private' | 'international'>('public');
  const [needsChildcare, setNeedsChildcare] = useState(false);
  const [childcareHours, setChildcareHours] = useState(20);

  const familyCosts = useMemo(() => {
    if (!originCountry) return null;

    return calculateFamilyCosts(
      originCountry.id,
      numberOfChildren,
      childrenAges,
      schoolType,
      needsChildcare,
      childcareHours
    );
  }, [originCountry, numberOfChildren, childrenAges, schoolType, needsChildcare, childcareHours]);

  const handleChildrenChange = (count: number) => {
    setNumberOfChildren(count);
    setChildrenAges(Array(count).fill(5));
  };

  const handleAgeChange = (index: number, age: number) => {
    const newAges = [...childrenAges];
    newAges[index] = age;
    setChildrenAges(newAges);
  };

  if (!originCountry || !familyCosts) return null;

  const formatAmount = (amount: number) => {
    return formatCurrency(Math.round(amount), originCountry.currency);
  };

  const totalMonthly = familyCosts.monthlyChildcare + 
                       (familyCosts.annualEducation / 12) + 
                       (familyCosts.annualHealthcare / 12) + 
                       (familyCosts.annualActivities / 12);

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          👶 {t('family.title') || 'Costos Familiares'}
        </h3>
        <p className={styles.subtitle}>
          {t('family.subtitle') || `Costo real de criar hijos en ${originCountry.nameEs}`}
        </p>
      </div>

      <div className={styles.inputs}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>{t('family.numberOfChildren') || 'Número de hijos'}</label>
          <div className={styles.childrenButtons}>
            {[0, 1, 2, 3, 4].map(num => (
              <button
                key={num}
                className={`${styles.childBtn} ${numberOfChildren === num ? styles.active : ''}`}
                onClick={() => handleChildrenChange(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {numberOfChildren > 0 && (
          <>
            <div className={styles.inputGroup}>
              <label className={styles.label}>{t('family.schoolType') || 'Tipo de escuela'}</label>
              <div className={styles.schoolButtons}>
                {(['public', 'private', 'international'] as const).map(type => (
                  <button
                    key={type}
                    className={`${styles.schoolBtn} ${schoolType === type ? styles.active : ''}`}
                    onClick={() => setSchoolType(type)}
                  >
                    {type === 'public' && '🏛️'}
                    {type === 'private' && '🏫'}
                    {type === 'international' && '🌍'}
                    <span>{t(`family.${type}`) || type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>{t('family.childcare') || '¿Necesitas guardería?'}</label>
              <div className={styles.toggleRow}>
                <button
                  className={`${styles.toggleBtn} ${needsChildcare ? styles.active : ''}`}
                  onClick={() => setNeedsChildcare(true)}
                >
                  {t('family.yes') || 'Sí'}
                </button>
                <button
                  className={`${styles.toggleBtn} ${!needsChildcare ? styles.active : ''}`}
                  onClick={() => setNeedsChildcare(false)}
                >
                  {t('family.no') || 'No'}
                </button>
              </div>
            </div>

            {needsChildcare && (
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  {t('family.childcareHours') || 'Horas semanales de guardería'}: {childcareHours}
                </label>
                <input
                  type="range"
                  min="10"
                  max="40"
                  step="5"
                  value={childcareHours}
                  onChange={(e) => setChildcareHours(Number(e.target.value))}
                  className={styles.slider}
                />
              </div>
            )}

            <div className={styles.childrenList}>
              {childrenAges.map((age, idx) => (
                <div key={idx} className={styles.childRow}>
                  <span className={styles.childLabel}>Hijo {idx + 1}:</span>
                  <select
                    value={age}
                    onChange={(e) => handleAgeChange(idx, Number(e.target.value))}
                    className={styles.ageSelect}
                  >
                    <option value={1}>{t('family.age1') || '0-2 años'}</option>
                    <option value={3}>{t('family.age3') || '3-5 años'}</option>
                    <option value={5}>{t('family.age5') || '6-12 años'}</option>
                    <option value={13}>{t('family.age13') || '13-17 años'}</option>
                    <option value={18}>{t('family.age18') || '18+ años'}</option>
                  </select>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {numberOfChildren > 0 && (
        <>
          <div className={styles.summaryCards}>
            <div className={styles.summaryCard}>
              <span className={styles.cardIcon}>🧒</span>
              <span className={styles.cardLabel}>{t('family.monthlyChildcare') || 'Guardería mensual'}</span>
              <span className={styles.cardValue}>{formatAmount(familyCosts.monthlyChildcare)}</span>
            </div>
            <div className={styles.summaryCard}>
              <span className={styles.cardIcon}>📚</span>
              <span className={styles.cardLabel}>{t('family.annualEducation') || 'Educación anual'}</span>
              <span className={styles.cardValue}>{formatAmount(familyCosts.annualEducation)}</span>
            </div>
            <div className={styles.summaryCard}>
              <span className={styles.cardIcon}>🏥</span>
              <span className={styles.cardLabel}>{t('family.annualHealthcare') || 'Salud anual'}</span>
              <span className={styles.cardValue}>{formatAmount(familyCosts.annualHealthcare)}</span>
            </div>
            <div className={styles.summaryCard}>
              <span className={styles.cardIcon}>⚽</span>
              <span className={styles.cardLabel}>{t('family.annualActivities') || 'Actividades anuales'}</span>
              <span className={styles.cardValue}>{formatAmount(familyCosts.annualActivities)}</span>
            </div>
          </div>

          <div className={styles.totalCard}>
            <div className={styles.totalRow}>
              <span>{t('family.totalAnnual') || 'Costo familiar anual'}</span>
              <span className={styles.totalValue}>{formatAmount(familyCosts.totalAnnual)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>{t('family.governmentBenefits') || 'Ayudas gubernamentales'}</span>
              <span className={styles.benefitsValue}>-{formatAmount(familyCosts.governmentBenefits)}</span>
            </div>
            <div className={`${styles.totalRow} ${styles.netCost}`}>
              <span>{t('family.netCost') || 'Costo neto anual'}</span>
              <span className={styles.netValue}>{formatAmount(familyCosts.netAnnualCost)}</span>
            </div>
            <div className={styles.totalRow}>
              <span>{t('family.monthly') || 'Costo mensual promedio'}</span>
              <span className={styles.monthlyValue}>{formatAmount(totalMonthly)}</span>
            </div>
          </div>

          <div className={styles.insight}>
            {totalMonthly > 1500 ? (
              <p>⚠️ {t('family.insightExpensive') || 'El costo familiar es significativo. Considera los beneficios fiscales disponibles.'}</p>
            ) : totalMonthly > 800 ? (
              <p>➖ {t('family.insightModerate') || 'Costo moderado. Las ayudas gubernamentales pueden reducir significativamente el costo neto.'}</p>
            ) : (
              <p>✅ {t('family.insightAffordable') || 'Costo relativamente accesible para la región. Aprovecha las ayudas disponibles.'}</p>
            )}
          </div>
        </>
      )}

      {numberOfChildren === 0 && (
        <div className={styles.noChildren}>
          <p>{t('family.noChildren') || 'Ajusta el número de hijos para ver el cálculo'}</p>
        </div>
      )}
    </motion.div>
  );
};

export default FamilyCostCalculator;
