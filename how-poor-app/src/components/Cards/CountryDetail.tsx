import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { formatCurrency, calculateCostOfLiving, calculateTaxBreakdown } from '../../services/utils/formatters';
import { countries } from '../../data/countries';
import { Country } from '../../types';
import styles from './CountryDetail.module.scss';

const CountryDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { selectedDetailCountry, setSelectedDetailCountry, salary } = useAppStore();

  if (!selectedDetailCountry) {
    return null;
  }

  const country = countries.find((c: Country) => c.id === selectedDetailCountry);
  const salaryNum = parseFloat(salary.replace(/[^0-9.-]/g, '')) || 0;

  if (!country) {
    return null;
  }

  const costData = calculateCostOfLiving(country.costOfLivingIndex || 60);
  const taxData = calculateTaxBreakdown(salaryNum, country.code);

  const categories = {
    groceries: ['bread', 'cheese', 'beef', 'chicken', 'milk', 'eggs', 'coffee', 'rice', 'vegetables', 'fruits'],
    entertainment: ['beer', 'wine', 'restaurant', 'cinema', 'gym'],
    housing: ['rent1br', 'rent3br'],
    utilities: ['utilities', 'internet', 'transport']
  };

  const getItemLabel = (item: string): string => {
    return t(`detail.items.${item}`);
  };

  const countryName = i18n.language === 'es' ? country.nameEs : country.name;
  const rentIndex = country.rentIndex || Math.round(country.costOfLivingIndex * 0.8);

  return (
    <div className={styles.overlay} onClick={() => setSelectedDetailCountry(null)}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.titleWrapper}>
            <span className={styles.flag}>{country.flag}</span>
            <h2 className={styles.title}>{countryName}</h2>
          </div>
          <button className={styles.closeButton} onClick={() => setSelectedDetailCountry(null)}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('detail.overview')}</h3>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>GDP PPP per cápita</span>
                <span className={styles.statValue}>{formatCurrency(country.gdpPppPerCapita, 'USD')}</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>{t('results.columns.costOfLiving')}</span>
                <span className={styles.statValue}>{country.costOfLivingIndex}</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>{t('results.columns.purchasingPower')}</span>
                <span className={styles.statValue}>{country.purchasingPowerIndex}</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statLabel}>{t('results.columns.rent')}</span>
                <span className={styles.statValue}>{rentIndex}</span>
              </div>
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('detail.groceries')}</h3>
            <div className={styles.itemsGrid}>
              {categories.groceries.map((item) => (
                <div key={item} className={styles.itemCard}>
                  <span className={styles.itemLabel}>{getItemLabel(item)}</span>
                  <span className={styles.itemPrice}>
                    {formatCurrency(costData[item]?.priceInCountry || 0, country.currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('detail.housing')}</h3>
            <div className={styles.itemsGrid}>
              {categories.housing.map((item) => (
                <div key={item} className={styles.itemCard}>
                  <span className={styles.itemLabel}>{getItemLabel(item)}</span>
                  <span className={styles.itemPrice}>
                    {formatCurrency(costData[item]?.priceInCountry || 0, country.currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('detail.utilities')}</h3>
            <div className={styles.itemsGrid}>
              {categories.utilities.map((item) => (
                <div key={item} className={styles.itemCard}>
                  <span className={styles.itemLabel}>{getItemLabel(item)}</span>
                  <span className={styles.itemPrice}>
                    {formatCurrency(costData[item]?.priceInCountry || 0, country.currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('detail.entertainment')}</h3>
            <div className={styles.itemsGrid}>
              {categories.entertainment.map((item) => (
                <div key={item} className={styles.itemCard}>
                  <span className={styles.itemLabel}>{getItemLabel(item)}</span>
                  <span className={styles.itemPrice}>
                    {formatCurrency(costData[item]?.priceInCountry || 0, country.currency)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{t('detail.taxes')}</h3>
            {taxData ? (
              <div className={styles.taxCard}>
                <div className={styles.taxRow}>
                  <span>{t('detail.gross')}</span>
                  <span className={styles.taxValue}>{formatCurrency(taxData.gross, country.currency)}</span>
                </div>
                <div className={styles.taxRow}>
                  <span>Impuestos</span>
                  <span className={styles.taxDeduction}>-{formatCurrency(taxData.gross - taxData.net, country.currency)}</span>
                </div>
                <div className={styles.taxRow}>
                  <span>{t('detail.net')}</span>
                  <span className={styles.taxNet}>{formatCurrency(taxData.net, country.currency)}</span>
                </div>
                <div className={styles.taxRow}>
                  <span>{t('detail.taxRate')}</span>
                  <span className={styles.taxPercent}>{(taxData.effectiveRate * 100).toFixed(1)}%</span>
                </div>
              </div>
            ) : (
              <p className={styles.noData}>Datos de impuestos no disponibles</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
