import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './LifestyleComparison.module.scss';

interface LifestyleOption {
  id: string;
  name: string;
  nameEs: string;
  icon: string;
  housing: { sqm: number; quality: string; qualityEs: string };
  transport: { type: string; typeEs: string; quality: string; qualityEs: string };
  dining: { level: string; levelEs: string; frequency: string; frequencyEs: string };
  vacation: { perYear: number; type: string; typeEs: string };
}

const lifestyleOptions: LifestyleOption[] = [
  {
    id: 'economy',
    name: 'Economy',
    nameEs: 'Económico',
    icon: '🏃',
    housing: { sqm: 30, quality: 'Basic apartment', qualityEs: 'Apartamento básico' },
    transport: { type: 'Public transport', typeEs: 'Transporte público', quality: 'Standard', qualityEs: 'Estándar' },
    dining: { level: 'Home cooking', levelEs: 'Comida en casa', frequency: 'Rarely eat out', frequencyEs: 'Rara vez fuera' },
    vacation: { perYear: 0, type: 'Staycation', typeEs: 'Cerca de casa' }
  },
  {
    id: 'comfort',
    name: 'Comfort',
    nameEs: 'Cómodo',
    icon: '🚶',
    housing: { sqm: 50, quality: 'Good apartment', qualityEs: 'Buen apartamento' },
    transport: { type: 'Public + occasional', typeEs: 'Público + ocasional', quality: 'Good', qualityEs: 'Bueno' },
    dining: { level: 'Mix', levelEs: 'Mixto', frequency: 'Eat out sometimes', frequencyEs: 'A veces fuera' },
    vacation: { perYear: 1, type: 'Regional trips', typeEs: 'Viajes regionales' }
  },
  {
    id: 'premium',
    name: 'Premium',
    nameEs: 'Premium',
    icon: '🏎️',
    housing: { sqm: 80, quality: 'Luxury apartment/house', qualityEs: 'Apartamento/casa de lujo' },
    transport: { type: 'Car', typeEs: 'Coche propio', quality: 'Premium', qualityEs: 'Premium' },
    dining: { level: 'Dining out', levelEs: 'Comer fuera', frequency: 'Frequently', frequencyEs: 'Frecuentemente' },
    vacation: { perYear: 2, type: 'International travel', typeEs: 'Viajes internacionales' }
  }
];

const LifestyleComparison: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, originCountry, calculatedResults, salaryType } = useAppStore();

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';

  const lifestyleData = useMemo(() => {
    if (!salaryNum || !originCountry) return null;

    const country = originCountry;
    const colIndex = country.costOfLivingIndex || 70;

    const monthlyNet = isNet ? salaryNum : salaryNum * 0.7;
    const monthlyBudget = monthlyNet / 12;

    const getBudgetForLevel = (level: string) => {
      const multipliers: Record<string, number> = {
        economy: 0.4,
        comfort: 0.6,
        premium: 0.85
      };
      const baseBudget = 1500 * (colIndex / 70);
      return Math.round(baseBudget * (multipliers[level] || 0.5));
    };

    const options = lifestyleOptions.map(option => {
      const budget = getBudgetForLevel(option.id);
      const affordable = budget <= monthlyBudget;
      const budgetDiff = monthlyBudget - budget;

      return {
        ...option,
        budget,
        affordable,
        budgetDiff,
        salaryNeeded: Math.round(budget * 12 * 1.4)
      };
    });

    return {
      monthlyBudget,
      options,
      countryName: i18n.language === 'es' ? country.nameEs : country.name,
      currency: country.currency,
      currencySymbol: country.currencySymbol
    };
  }, [salaryNum, originCountry, salaryType, i18n.language]);

  if (!lifestyleData) return null;

  const formatAmount = (amount: number) => {
    return formatCurrency(amount, lifestyleData.currency);
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
          🏠 {t('lifestyle.title') || 'Estilo de Vida'}
        </h3>
        <p className={styles.subtitle}>
          {t('lifestyle.subtitle') || `¿Qué tipo de vida puedes permitirte en ${lifestyleData.countryName}?`}
        </p>
      </div>

      <div className={styles.budgetInfo}>
        <span className={styles.budgetLabel}>{t('lifestyle.yourBudget') || 'Tu presupuesto mensual'}:</span>
        <span className={styles.budgetValue}>{formatAmount(lifestyleData.monthlyBudget)}</span>
      </div>

      <div className={styles.optionsGrid}>
        {lifestyleData.options.map((option, index) => (
          <motion.div 
            key={option.id}
            className={`${styles.optionCard} ${option.affordable ? styles.affordable : styles.expensive}`}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <div className={styles.optionHeader}>
              <span className={styles.optionIcon}>{option.icon}</span>
              <span className={styles.optionName}>
                {i18n.language === 'es' ? option.nameEs : option.name}
              </span>
              <span className={`${styles.optionBadge} ${option.affordable ? styles.affordableBadge : styles.expensiveBadge}`}>
                {option.affordable ? t('lifestyle.affordable') || '✓ Disponible' : t('lifestyle.expensive') || '✗ Limitado'}
              </span>
            </div>

            <div className={styles.optionDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🏠</span>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>{t('lifestyle.housing') || 'Vivienda'}</span>
                  <span className={styles.detailValue}>{option.housing.sqm}m² - {i18n.language === 'es' ? option.housing.qualityEs : option.housing.quality}</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🚗</span>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>{t('lifestyle.transport') || 'Transporte'}</span>
                  <span className={styles.detailValue}>{i18n.language === 'es' ? option.transport.typeEs : option.transport.type}</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>🍽️</span>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>{t('lifestyle.dining') || 'Comida'}</span>
                  <span className={styles.detailValue}>{i18n.language === 'es' ? option.dining.levelEs : option.dining.level}</span>
                </div>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>✈️</span>
                <div className={styles.detailContent}>
                  <span className={styles.detailLabel}>{t('lifestyle.vacation') || 'Vacaciones'}</span>
                  <span className={styles.detailValue}>{option.vacation.perYear}x {i18n.language === 'es' ? option.vacation.typeEs : option.vacation.type}</span>
                </div>
              </div>
            </div>

            <div className={styles.optionFooter}>
              <div className={styles.costInfo}>
                <span className={styles.costLabel}>{t('lifestyle.monthlyCost') || 'Costo mensual'}</span>
                <span className={styles.costValue}>{formatAmount(option.budget)}</span>
              </div>
              {!option.affordable && (
                <div className={styles.salaryNeeded}>
                  <span className={styles.salaryLabel}>{t('lifestyle.salaryNeeded') || 'Salario necesario'}</span>
                  <span className={styles.salaryValue}>{formatAmount(option.salaryNeeded)}/año</span>
                </div>
              )}
              {option.affordable && (
                <div className={styles.surplus}>
                  <span className={styles.surplusLabel}>{t('lifestyle.surplus') || 'Sobrante'}</span>
                  <span className={styles.surplusValue}>+{formatAmount(option.budgetDiff)}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.insight}>
        <p>
          💡 {t('lifestyle.insight') || 'Los cálculos son aproximados. El costo real varía según ciudad específica dentro del país.'}
        </p>
      </div>
    </motion.div>
  );
};

export default LifestyleComparison;
