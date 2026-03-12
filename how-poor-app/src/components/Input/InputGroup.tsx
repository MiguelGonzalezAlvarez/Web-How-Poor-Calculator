import { useState, ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { currencies, industries, countries } from '../../data/countries';
import useAppStore from '../../store/useAppStore';
import SalaryTypeToggle from './SalaryTypeToggle';
import styles from './InputGroup.module.scss';

const SalaryInput: React.FC = () => {
  const { t } = useTranslation();
  const { salary, setSalary } = useAppStore();
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setSalary(value);
    
    if (value) {
      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        setError('Ingresa un número válido');
      } else if (numValue <= 0) {
        setError('El salario debe ser mayor a 0');
      } else if (numValue > 10000000) {
        setError('El salario máximo es 10,000,000');
      } else {
        setError(null);
      }
    } else {
      setError(null);
    }
  };

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor="salary-input">
        {t('input.salary')}
      </label>
      <input
        id="salary-input"
        type="text"
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        value={salary}
        onChange={handleChange}
        placeholder={t('input.salaryPlaceholder')}
        aria-describedby={error ? 'salary-error' : undefined}
        aria-invalid={!!error}
      />
      {error && (
        <span id="salary-error" className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

const CurrencySelector: React.FC = () => {
  const { t } = useTranslation();
  const { currency, setCurrency } = useAppStore();

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor="currency-select">
        {t('input.currency')}
      </label>
      <select
        id="currency-select"
        className={styles.select}
        value={currency}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setCurrency(e.target.value)}
        aria-label={t('input.currency')}
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            {curr.flag} {curr.code} - {curr.nameEs}
          </option>
        ))}
      </select>
    </div>
  );
};

const CountrySelector: React.FC = () => {
  const { t } = useTranslation();
  const { selectedCountry, setSelectedCountry } = useAppStore();

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor="country-select">
        {t('input.country')}
      </label>
      <select
        id="country-select"
        className={styles.select}
        value={selectedCountry || ''}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedCountry(e.target.value || null)}
        aria-label={t('input.country')}
      >
        <option value="">{t('input.countryPlaceholder')}</option>
        {countries.map((country) => (
          <option key={country.id} value={country.id}>
            {country.flag} {country.nameEs}
          </option>
        ))}
      </select>
    </div>
  );
};

const RegionSelector: React.FC = () => {
  const { t } = useTranslation();
  const { selectedCountry, selectedRegion, setSelectedRegion } = useAppStore();

  const country = countries.find((c) => c.id === selectedCountry);
  const regions = country?.regions || [];

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor="region-select">
        {t('input.region')}
      </label>
      <select
        id="region-select"
        className={styles.select}
        value={selectedRegion || ''}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedRegion(e.target.value || null)}
        disabled={!selectedCountry}
        aria-label={t('input.region')}
      >
        <option value="">{t('input.regionPlaceholder')}</option>
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.nameEs}
          </option>
        ))}
      </select>
    </div>
  );
};

const IndustrySelector: React.FC = () => {
  const { t } = useTranslation();
  const { industry, setIndustry } = useAppStore();

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor="industry-select">
        {t('input.industry')}
      </label>
      <select
        id="industry-select"
        className={styles.select}
        value={industry}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => setIndustry(e.target.value)}
        aria-label={t('input.industry')}
      >
        {industries.map((ind) => (
          <option key={ind.id} value={ind.id}>
            {ind.nameEs}
          </option>
        ))}
      </select>
    </div>
  );
};

export { SalaryInput, CurrencySelector, CountrySelector, RegionSelector, IndustrySelector, SalaryTypeToggle };
