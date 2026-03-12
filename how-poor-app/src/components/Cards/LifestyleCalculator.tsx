import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { countries } from '../../data/countries';
import { formatCurrency, calculateCostOfLiving } from '../../services/utils/formatters';
import { Country } from '../../types';
import styles from './LifestyleCalculator.module.scss';

interface LifestyleOption {
  id: string;
  name: string;
  nameEs: string;
  multiplier: number;
}

interface LifestyleCategory {
  type?: LifestyleOption[];
  area?: LifestyleOption[];
  level?: LifestyleOption[];
  entertainment?: LifestyleOption[];
  health?: LifestyleOption[];
}

interface LifestyleOptions {
  housing: LifestyleCategory;
  food: LifestyleCategory;
  transport: LifestyleCategory;
  lifestyle: LifestyleCategory;
}

interface Selection {
  housingType: string;
  housingArea: string;
  foodLevel: string;
  transportType: string;
  entertainment: string;
  healthInsurance: string;
}

interface CalculationResult {
  country: Country;
  monthly: number;
  annual: number;
  required: number;
}

const lifestyleOptions: LifestyleOptions = {
  housing: {
    type: [
      { id: 'studio', name: 'Studio', nameEs: 'Estudio', multiplier: 0.6 },
      { id: '1br', name: '1 Bedroom', nameEs: '1 Habitación', multiplier: 1.0 },
      { id: '2br', name: '2 Bedrooms', nameEs: '2 Habitaciones', multiplier: 1.4 },
      { id: '3br', name: '3 Bedrooms', nameEs: '3 Habitaciones', multiplier: 1.8 }
    ],
    area: [
      { id: 'center', name: 'City Center', nameEs: 'Centro', multiplier: 1.3 },
      { id: 'suburbs', name: 'Suburbs', nameEs: 'Afueras', multiplier: 0.8 }
    ]
  },
  food: {
    level: [
      { id: 'basic', name: 'Basic', nameEs: 'Básico', multiplier: 0.6 },
      { id: 'moderate', name: 'Moderate', nameEs: 'Moderado', multiplier: 1.0 },
      { id: 'gourmet', name: 'Gourmet', nameEs: 'Gourmet', multiplier: 1.5 }
    ]
  },
  transport: {
    type: [
      { id: 'public', name: 'Public Transport', nameEs: 'Transporte público', multiplier: 0.4 },
      { id: 'car', name: 'Car', nameEs: 'Coche', multiplier: 1.2 },
      { id: 'taxi', name: 'Taxi/Rideshare', nameEs: 'Taxi', multiplier: 0.8 },
      { id: 'bike', name: 'Bike/Walk', nameEs: 'Bici/Caminar', multiplier: 0.2 }
    ]
  },
  lifestyle: {
    entertainment: [
      { id: 'low', name: 'Low', nameEs: 'Bajo', multiplier: 0.5 },
      { id: 'medium', name: 'Medium', nameEs: 'Medio', multiplier: 1.0 },
      { id: 'high', name: 'High', nameEs: 'Alto', multiplier: 1.8 }
    ],
    health: [
      { id: 'none', name: 'No insurance', nameEs: 'Sin seguro', multiplier: 0 },
      { id: 'basic', name: 'Basic insurance', nameEs: 'Seguro básico', multiplier: 0.5 },
      { id: 'premium', name: 'Premium insurance', nameEs: 'Seguro premium', multiplier: 1.0 }
    ]
  }
};

interface Props {
  onClose: () => void;
}

const LifestyleCalculator: React.FC<Props> = ({ onClose }) => {
  const { t, i18n } = useTranslation();
  const isSpanish = i18n.language === 'es';

  const [selections, setSelections] = useState<Selection>({
    housingType: '1br',
    housingArea: 'center',
    foodLevel: 'moderate',
    transportType: 'public',
    entertainment: 'medium',
    healthInsurance: 'basic'
  });

  const handleSelection = (key: keyof Selection, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
  };

  const calculateRequiredSalary = (country: Country): CalculationResult => {
    const costData = calculateCostOfLiving(country.costOfLivingIndex || 60);
    
    const baseRent = costData.rent1br?.priceInCountry || 1200;
    const rentMultiplier = lifestyleOptions.housing.type?.find(o => o.id === selections.housingType)?.multiplier || 1;
    const areaMultiplier = lifestyleOptions.housing.area?.find(o => o.id === selections.housingArea)?.multiplier || 1;
    const rent = baseRent * rentMultiplier * areaMultiplier;

    const baseFood = 300;
    const foodMultiplier = lifestyleOptions.food.level?.find(o => o.id === selections.foodLevel)?.multiplier || 1;
    const food = baseFood * foodMultiplier;

    const baseTransport = 80;
    const transportMultiplier = lifestyleOptions.transport.type?.find(o => o.id === selections.transportType)?.multiplier || 1;
    const transport = baseTransport * transportMultiplier;

    const baseEntertainment = 150;
    const entertainmentMultiplier = lifestyleOptions.lifestyle.entertainment?.find(o => o.id === selections.entertainment)?.multiplier || 1;
    const entertainment = baseEntertainment * entertainmentMultiplier;

    const baseHealth = 100;
    const healthMultiplier = lifestyleOptions.lifestyle.health?.find(o => o.id === selections.healthInsurance)?.multiplier || 0.5;
    const health = baseHealth * healthMultiplier;

    const utilities = costData.utilities?.priceInCountry || 150;
    const internet = costData.internet?.priceInCountry || 40;

    const monthlyTotal = rent + food + transport + entertainment + health + utilities + internet;
    const annualTotal = monthlyTotal * 12;
    const requiredSalary = annualTotal * 1.35;

    return {
      country,
      monthly: monthlyTotal,
      annual: annualTotal,
      required: Math.round(requiredSalary)
    };
  };

  const results = useMemo(() => {
    return countries.map((country: Country) => {
      const salary = calculateRequiredSalary(country);
      return {
        country,
        monthly: salary.monthly,
        annual: salary.annual,
        required: salary.required
      };
    }).sort((a: CalculationResult, b: CalculationResult) => a.required - b.required);
  }, [selections]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>{t('scenario.title') || 'Calculadora de Estilo de Vida'}</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          <div className={styles.optionsGrid}>
            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                {t('scenario.housingType') || 'Tipo de vivienda'}
              </label>
              <div className={styles.optionButtons}>
                {lifestyleOptions.housing.type?.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.optionButton} ${selections.housingType === option.id ? styles.active : ''}`}
                    onClick={() => handleSelection('housingType', option.id)}
                  >
                    {isSpanish ? option.nameEs : option.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                {t('scenario.housingArea') || 'Zona'}
              </label>
              <div className={styles.optionButtons}>
                {lifestyleOptions.housing.area?.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.optionButton} ${selections.housingArea === option.id ? styles.active : ''}`}
                    onClick={() => handleSelection('housingArea', option.id)}
                  >
                    {isSpanish ? option.nameEs : option.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                {t('scenario.foodLevel') || 'Nivel de comida'}
              </label>
              <div className={styles.optionButtons}>
                {lifestyleOptions.food.level?.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.optionButton} ${selections.foodLevel === option.id ? styles.active : ''}`}
                    onClick={() => handleSelection('foodLevel', option.id)}
                  >
                    {isSpanish ? option.nameEs : option.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                {t('scenario.transport') || 'Transporte'}
              </label>
              <div className={styles.optionButtons}>
                {lifestyleOptions.transport.type?.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.optionButton} ${selections.transportType === option.id ? styles.active : ''}`}
                    onClick={() => handleSelection('transportType', option.id)}
                  >
                    {isSpanish ? option.nameEs : option.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                {t('scenario.entertainment') || 'Ocio'}
              </label>
              <div className={styles.optionButtons}>
                {lifestyleOptions.lifestyle.entertainment?.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.optionButton} ${selections.entertainment === option.id ? styles.active : ''}`}
                    onClick={() => handleSelection('entertainment', option.id)}
                  >
                    {isSpanish ? option.nameEs : option.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <label className={styles.optionLabel}>
                {t('scenario.healthInsurance') || 'Seguro médico'}
              </label>
              <div className={styles.optionButtons}>
                {lifestyleOptions.lifestyle.health?.map(option => (
                  <button
                    key={option.id}
                    className={`${styles.optionButton} ${selections.healthInsurance === option.id ? styles.active : ''}`}
                    onClick={() => handleSelection('healthInsurance', option.id)}
                  >
                    {isSpanish ? option.nameEs : option.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.resultsSection}>
            <h3 className={styles.resultsTitle}>
              {t('scenario.salaryNeeded') || 'Salario mínimo necesario'}
            </h3>
            <div className={styles.resultsTable}>
              <div className={styles.tableHeader}>
                <span>{t('results.columns.country')}</span>
                <span>{t('scenario.monthly') || 'Mensual'}</span>
                <span>{t('scenario.annual') || 'Anual'}</span>
              </div>
              <div className={styles.tableBody}>
                {results.slice(0, 15).map(result => (
                  <div key={result.country.id} className={styles.tableRow}>
                    <span className={styles.countryCell}>
                      <span className={styles.flag}>{result.country.flag}</span>
                      <span>{result.country.nameEs}</span>
                    </span>
                    <span className={styles.salaryCell}>
                      {formatCurrency(result.monthly, result.country.currency)}
                    </span>
                    <span className={styles.salaryCell}>
                      {formatCurrency(result.annual, result.country.currency)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LifestyleCalculator;
