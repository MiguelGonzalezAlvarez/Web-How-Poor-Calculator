import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import styles from './OnboardingTour.module.scss';

interface OnboardingTourProps {
  onComplete: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ onComplete }) => {
  const { t, i18n } = useTranslation();
  const { language, setLanguage } = useAppStore();
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: i18n.language === 'es' ? '🌍 ¿Cómo funciona?' : '🌍 How does it work?',
      description: i18n.language === 'es' 
        ? 'Descubre cuánto vale tu salario en otros países. ¿Es mejor mudarte o negociar más?'
        : 'Find out how much your salary is worth in other countries. Is it better to move or negotiate more?',
      highlight: null,
    },
    {
      title: i18n.language === 'es' ? '💰 Introduce tu salario' : '💰 Enter your salary',
      description: i18n.language === 'es'
        ? 'Ingresa tu salario bruto anual. Incluye bonuses y compensación si tienes.'
        : 'Enter your annual gross salary. Include bonuses and compensation if you have.',
      highlight: 'salary',
    },
    {
      title: i18n.language === 'es' ? '🗺️ Elige tu destino' : '🗺️ Choose your destination',
      description: i18n.language === 'es'
        ? 'Compara tu poder adquisitivo en docenas de países y ciudades.'
        : 'Compare your purchasing power in dozens of countries and cities.',
      highlight: 'results',
    },
    {
      title: i18n.language === 'es' ? '🎯 Usa los filtros' : '🎯 Use the filters',
      description: i18n.language === 'es'
        ? 'Filtra por salary, calidad de vida, alquiler o seguridad. ¡Lo que más te importe!'
        : 'Filter by salary, quality of life, rent or safety. What matters most to you!',
      highlight: 'filters',
    },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.tour}>
        <div className={styles.progress}>
          {steps.map((_, index) => (
            <div 
              key={index} 
              className={`${styles.dot} ${index <= step ? styles.active : ''}`}
            />
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.icon}>
            {step === 0 ? '🌍' : step === 1 ? '💰' : step === 2 ? '🗺️' : '🎯'}
          </div>
          <h2 className={styles.title}>{steps[step].title}</h2>
          <p className={styles.description}>{steps[step].description}</p>
        </div>

        <div className={styles.actions}>
          <button className={styles.skipButton} onClick={handleSkip}>
            {i18n.language === 'es' ? 'Saltar' : 'Skip'}
          </button>
          <button className={styles.nextButton} onClick={handleNext}>
            {step === steps.length - 1 
              ? (i18n.language === 'es' ? '¡Empezar!' : 'Get Started!')
              : (i18n.language === 'es' ? 'Siguiente' : 'Next')
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
