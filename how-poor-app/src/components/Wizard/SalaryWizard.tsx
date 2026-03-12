import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import { taxRatesData } from '../../data/taxes';
import { getPercentilesByIndustry } from '../../data/salaryTrends';
import { countries } from '../../data/countries';
import styles from './SalaryWizard.module.scss';

interface WizardState {
  step: number;
  originCountry: string | null;
  currentSalary: string;
  salaryType: 'gross' | 'net';
  destinationCountry: string | null;
  industry: string;
}

const SalaryWizard: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { setSelectedCountry, setIndustry, setSalaryType, setSalary } = useAppStore();
  
  const [state, setState] = useState<WizardState>({
    step: 1,
    originCountry: null,
    currentSalary: '',
    salaryType: 'gross',
    destinationCountry: null,
    industry: 'general'
  });

  const [result, setResult] = useState<{
    minimum: number;
    recommended: number;
    optimal: number;
    currency: string;
    currencySymbol: string;
  } | null>(null);

  const handleNext = () => {
    if (state.step < 4) {
      setState(prev => ({ ...prev, step: prev.step + 1 }));
    }
  };

  const handleBack = () => {
    if (state.step > 1) {
      setState(prev => ({ ...prev, step: prev.step - 1 }));
    }
  };

  const calculateResult = () => {
    const salaryNum = parseFloat(state.currentSalary.replace(/[^0-9.-]/g, '')) || 0;
    if (!state.originCountry || !state.destinationCountry) return;

    const origin = countries.find(c => c.id === state.originCountry);
    const dest = countries.find(c => c.id === state.destinationCountry);
    if (!origin || !dest) return;

    const originTax = taxRatesData[origin.id];
    const destTax = taxRatesData[dest.id];
    
    const grossSalary = state.salaryType === 'net' && originTax
      ? salaryNum / (1 - originTax.total)
      : salaryNum;

    const colFactor = (dest.costOfLivingIndex || 70) / (origin.costOfLivingIndex || 70);
    const ppFactor = (dest.purchasingPowerIndex || 70) / (origin.purchasingPowerIndex || 70);
    const multiplier = colFactor * 0.4 + ppFactor * 0.6;

    const destGross = grossSalary * multiplier;
    const destNet = destGross * (1 - (destTax?.total || 0.30));

    const min = Math.round(state.salaryType === 'net' ? destNet : destGross * 0.85);
    const recommended = Math.round(state.salaryType === 'net' ? destNet : destGross);
    const optimal = Math.round(state.salaryType === 'net' ? destNet : destGross * 1.25);

    setResult({
      minimum: min,
      recommended,
      optimal,
      currency: dest.currency,
      currencySymbol: dest.currencySymbol
    });

    setState(prev => ({ ...prev, step: 5 }));
  };

  const applyResult = () => {
    if (result && state.destinationCountry) {
      setSelectedCountry(state.originCountry);
      setSelectedCountry(state.destinationCountry);
      setSalary(state.currentSalary);
      setSalaryType(state.salaryType);
      setIndustry(state.industry);
    }
  };

  const canProceed = () => {
    switch (state.step) {
      case 1: return !!state.originCountry;
      case 2: return parseFloat(state.currentSalary.replace(/[^0-9.-]/g, '')) > 0;
      case 3: return !!state.destinationCountry && state.destinationCountry !== state.originCountry;
      case 4: return true;
      default: return false;
    }
  };

  const formatSalary = (amount: number) => {
    return result ? formatCurrency(amount, result.currency) : '';
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
          🧙 {t('wizard.title') || 'Asistente de Salario'}
        </h3>
        <p className={styles.subtitle}>
          {t('wizard.subtitle') || 'Descubre cuánto deberías pedir en 4 pasos'}
        </p>
      </div>

      <div className={styles.progress}>
        {[1, 2, 3, 4].map(step => (
          <div 
            key={step} 
            className={`${styles.progressStep} ${state.step >= step ? styles.active : ''} ${state.step > step ? styles.completed : ''}`}
          >
            <span className={styles.stepNumber}>{step}</span>
            {step < 4 && <div className={styles.stepLine} />}
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {state.step === 1 && (
            <motion.div 
              key="step1"
              className={styles.stepContent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h4 className={styles.stepTitle}>
                🌍 {t('wizard.step1') || '¿De dónde vienes?'}
              </h4>
              <p className={styles.stepDesc}>
                {t('wizard.step1Desc') || 'Selecciona tu país actual'}
              </p>
              <div className={styles.countryGrid}>
                {countries.slice(0, 12).map(country => (
                  <button
                    key={country.id}
                    className={`${styles.countryBtn} ${state.originCountry === country.id ? styles.selected : ''}`}
                    onClick={() => setState(prev => ({ ...prev, originCountry: country.id }))}
                  >
                    <span className={styles.flag}>{country.flag}</span>
                    <span className={styles.countryName}>
                      {i18n.language === 'es' ? country.nameEs : country.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.step === 2 && (
            <motion.div 
              key="step2"
              className={styles.stepContent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h4 className={styles.stepTitle}>
                💰 {t('wizard.step2') || '¿Cuánto ganas ahora?'}
              </h4>
              <p className={styles.stepDesc}>
                {t('wizard.step2Desc') || 'Ingresa tu salario actual'}
              </p>
              
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  className={styles.salaryInput}
                  value={state.currentSalary}
                  onChange={(e) => setState(prev => ({ ...prev, currentSalary: e.target.value.replace(/[^0-9]/g, '') }))}
                  placeholder={t('wizard.salaryPlaceholder') || 'Ej: 50000'}
                />
                <div className={styles.salaryTypeBtns}>
                  <button
                    className={`${styles.typeBtn} ${state.salaryType === 'gross' ? styles.active : ''}`}
                    onClick={() => setState(prev => ({ ...prev, salaryType: 'gross' }))}
                  >
                    {t('salary.gross') || 'Bruto'}
                  </button>
                  <button
                    className={`${styles.typeBtn} ${state.salaryType === 'net' ? styles.active : ''}`}
                    onClick={() => setState(prev => ({ ...prev, salaryType: 'net' }))}
                  >
                    {t('salary.net') || 'Neto'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {state.step === 3 && (
            <motion.div 
              key="step3"
              className={styles.stepContent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h4 className={styles.stepTitle}>
                🎯 {t('wizard.step3') || '¿A dónde vas?'}
              </h4>
              <p className={styles.stepDesc}>
                {t('wizard.step3Desc') || 'Selecciona tu país destino'}
              </p>
              <div className={styles.countryGrid}>
                {countries.filter(c => c.id !== state.originCountry).slice(0, 12).map(country => (
                  <button
                    key={country.id}
                    className={`${styles.countryBtn} ${state.destinationCountry === country.id ? styles.selected : ''}`}
                    onClick={() => setState(prev => ({ ...prev, destinationCountry: country.id }))}
                  >
                    <span className={styles.flag}>{country.flag}</span>
                    <span className={styles.countryName}>
                      {i18n.language === 'es' ? country.nameEs : country.name}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state.step === 4 && (
            <motion.div 
              key="step4"
              className={styles.stepContent}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h4 className={styles.stepTitle}>
                🏭 {t('wizard.step4') || '¿En qué industria?'}
              </h4>
              <p className={styles.stepDesc}>
                {t('wizard.step4Desc') || 'Selecciona tu industria'}
              </p>
              <div className={styles.industryGrid}>
                {[
                  { id: 'general', name: 'General', nameEs: 'General' },
                  { id: 'tech', name: 'Technology', nameEs: 'Tecnología' },
                  { id: 'finance', name: 'Finance', nameEs: 'Finanzas' },
                  { id: 'healthcare', name: 'Healthcare', nameEs: 'Salud' },
                  { id: 'marketing', name: 'Marketing', nameEs: 'Marketing' }
                ].map(ind => (
                  <button
                    key={ind.id}
                    className={`${styles.industryBtn} ${state.industry === ind.id ? styles.selected : ''}`}
                    onClick={() => setState(prev => ({ ...prev, industry: ind.id }))}
                  >
                    {i18n.language === 'es' ? ind.nameEs : ind.name}
                  </button>
                ))}
              </div>
              <button className={styles.calculateBtn} onClick={calculateResult}>
                {t('wizard.calculate') || 'Calcular'}
              </button>
            </motion.div>
          )}

          {state.step === 5 && result && (
            <motion.div 
              key="result"
              className={styles.stepContent}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h4 className={styles.stepTitle}>
                {t('wizard.result') || '¡Aquí está tu resultado!'}
              </h4>
              
              <div className={styles.resultCards}>
                <div className={styles.resultCard}>
                  <span className={styles.resultLabel}>{t('salaryTarget.minimum') || 'Mínimo'}</span>
                  <span className={styles.resultValue}>{formatSalary(result.minimum)}</span>
                </div>
                <div className={`${styles.resultCard} ${styles.highlight}`}>
                  <span className={styles.resultLabel}>{t('salaryTarget.recommended') || 'Recomendado'}</span>
                  <span className={styles.resultValue}>{formatSalary(result.recommended)}</span>
                </div>
                <div className={styles.resultCard}>
                  <span className={styles.resultLabel}>{t('salaryTarget.optimal') || 'Óptimo'}</span>
                  <span className={styles.resultValue}>{formatSalary(result.optimal)}</span>
                </div>
              </div>

              <button className={styles.applyBtn} onClick={applyResult}>
                {t('wizard.apply') || 'Aplicar a la calculadora'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {state.step < 5 && (
        <div className={styles.navigation}>
          {state.step > 1 && (
            <button className={styles.backBtn} onClick={handleBack}>
              ← {t('wizard.back') || 'Atrás'}
            </button>
          )}
          <button 
            className={styles.nextBtn} 
            onClick={handleNext}
            disabled={!canProceed()}
          >
            {state.step === 4 ? t('wizard.finish') || 'Finalizar' : `${t('wizard.next') || 'Siguiente'} →`}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default SalaryWizard;
