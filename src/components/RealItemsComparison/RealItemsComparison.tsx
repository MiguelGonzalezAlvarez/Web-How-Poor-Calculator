import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { products, calculateWorkHours } from '../../data/products';
import styles from './RealItemsComparison.module.scss';

type Category = 'all' | 'tech' | 'food' | 'transport' | 'housing' | 'entertainment' | 'fashion' | 'services';

const topProducts = [
  'iphone15pro',
  'macbookpro14',
  'toyotacamry',
  'teslamodel3',
  'rent1brcenter',
  'netflix',
  'gym',
  'bigmac',
  'hairstyle',
  'nike'
];

const RealItemsComparison: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { salary, currency, originCountry, calculatedResults, salaryType } = useAppStore();
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;
  const isNet = salaryType === 'net';
  
  const monthlySalary = salaryNum / 12;
  const hourlyRate = monthlySalary / 160;
  const hourlyRateUSD = hourlyRate;

  const categories: { id: Category; label: string; labelEs: string; icon: string }[] = [
    { id: 'all', label: 'All', labelEs: 'Todo', icon: '📦' },
    { id: 'tech', label: 'Tech', labelEs: 'Tecnología', icon: '📱' },
    { id: 'food', label: 'Food', labelEs: 'Comida', icon: '🍔' },
    { id: 'transport', label: 'Transport', labelEs: 'Transporte', icon: '🚗' },
    { id: 'housing', label: 'Housing', labelEs: 'Vivienda', icon: '🏠' },
    { id: 'entertainment', label: 'Entertainment', labelEs: 'Ocio', icon: '🎬' },
    { id: 'fashion', label: 'Fashion', labelEs: 'Moda', icon: '👕' },
    { id: 'services', label: 'Services', labelEs: 'Servicios', icon: '💼' }
  ];

  const filteredProducts = useMemo(() => {
    return topProducts
      .map(id => products.find(p => p.id === id))
      .filter(Boolean)
      .filter(p => !activeCategory || activeCategory === 'all' || p?.category === activeCategory);
  }, [activeCategory]);

  if (!originCountry || !calculatedResults.length) return null;

  const getHoursInCountry = (productId: string, countryId: string): number => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    
    const multiplier = getCountryMultiplier(countryId);
    const priceUSD = product.basePriceUSD * multiplier;
    return calculateWorkHours(priceUSD, hourlyRateUSD);
  };

  const getCountryMultiplier = (countryId: string): number => {
    const multipliers: Record<string, number> = {
      us: 1.0, es: 0.85, gb: 1.05, de: 0.95, fr: 0.90, it: 0.82, pt: 0.70,
      nl: 1.10, ch: 1.35, jp: 0.90, br: 0.60, mx: 0.55, ca: 0.95, au: 1.05
    };
    return multipliers[countryId] || 0.85;
  };

  const bestResult = calculatedResults.find(r => r.status === 'better');
  const worstResult = calculatedResults.find(r => r.status === 'worse');

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          ⏱️ {t('realItems.title') || '¿Cuántas horas trabajas para...?'}
        </h3>
        <p className={styles.subtitle}>
          {t('realItems.subtitle') || `Comparando con tu salario ${isNet ? 'neto' : 'bruto'} de ${formatCurrency(salaryNum, currency)}/año`}
        </p>
      </div>

      <div className={styles.categories}>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`${styles.categoryBtn} ${activeCategory === cat.id ? styles.active : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span>{cat.icon}</span>
            <span>{i18n.language === 'es' ? cat.labelEs : cat.label}</span>
          </button>
        ))}
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('realItems.product') || 'Producto'}</th>
              <th>
                <span className={styles.flag}>{originCountry.flag}</span>
                {originCountry.nameEs}
              </th>
              {bestResult && (
                <th className={styles.best}>
                  <span className={styles.flag}>{bestResult.country.flag}</span>
                  {bestResult.country.nameEs}
                  <span className={styles.badge}>Mejor</span>
                </th>
              )}
              {worstResult && (
                <th className={styles.worst}>
                  <span className={styles.flag}>{worstResult.country.flag}</span>
                  {worstResult.country.nameEs}
                  <span className={styles.badge}>Peor</span>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredProducts.map((product, index) => {
                if (!product) return null;
                const originHours = getHoursInCountry(product.id, originCountry.id);
                const bestHours = bestResult ? getHoursInCountry(product.id, bestResult.country.id) : 0;
                const worstHours = worstResult ? getHoursInCountry(product.id, worstResult.country.id) : 0;

                return (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                  >
                    <td className={styles.productCell}>
                      <span className={styles.productIcon}>
                        {getProductEmoji(product.category)}
                      </span>
                      <span className={styles.productName}>
                        {i18n.language === 'es' ? product.nameEs : product.name}
                      </span>
                    </td>
                    <td className={styles.hoursCell}>
                      <span className={styles.hours}>{Math.round(originHours)}</span>
                      <span className={styles.hoursLabel}>hrs</span>
                    </td>
                    {bestResult && (
                      <td className={`${styles.hoursCell} ${styles.positive}`}>
                        <span className={styles.hours}>{Math.round(bestHours)}</span>
                        <span className={styles.hoursLabel}>hrs</span>
                        <span className={styles.diff}>
                          {originHours - bestHours > 0 ? `-${Math.round(originHours - bestHours)}` : ''}
                        </span>
                      </td>
                    )}
                    {worstResult && (
                      <td className={`${styles.hoursCell} ${styles.negative}`}>
                        <span className={styles.hours}>{Math.round(worstHours)}</span>
                        <span className={styles.hoursLabel}>hrs</span>
                        <span className={styles.diff}>
                          +{Math.round(worstHours - originHours)}
                        </span>
                      </td>
                    )}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#22c55e' }} />
          <span>{t('realItems.lessWork') || 'Menos horas de trabajo'}</span>
        </div>
        <div className={styles.legendItem}>
          <span className={styles.legendColor} style={{ background: '#ef4444' }} />
          <span>{t('realItems.moreWork') || 'Más horas de trabajo'}</span>
        </div>
      </div>
    </motion.div>
  );
};

const getProductEmoji = (category: string): string => {
  const emojis: Record<string, string> = {
    tech: '📱',
    food: '🍔',
    transport: '🚗',
    housing: '🏠',
    entertainment: '🎬',
    fashion: '👕',
    services: '💼'
  };
  return emojis[category] || '📦';
};

export default RealItemsComparison;
