import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import { getTips } from '../../data/negotiationTips';
import styles from './SalaryNegotiationTips.module.scss';

const SalaryNegotiationTips: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry, selectedIndustry } = useAppStore();
  
  const [activeTab, setActiveTab] = useState<'general' | 'tactics' | 'common'>('general');

  const tips = originCountry ? getTips(originCountry.id) : getTips('us');

  if (!originCountry) {
    return (
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>
            💼 {t('negotiation.title', 'Salary Negotiation Tips')}
          </h3>
          <p className={styles.subtitle}>
            {t('negotiation.selectCountry', 'Select a country to get tailored tips')}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          💼 {t('negotiation.title', 'Salary Negotiation Tips')}
        </h3>
        <p className={styles.subtitle}>
          {t('negotiation.subtitle', `Negotiation strategies for ${originCountry.nameEs}`)}
        </p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'general' ? styles.active : ''}`}
          onClick={() => setActiveTab('general')}
        >
          📝 {t('negotiation.general', 'General Tips')}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'tactics' ? styles.active : ''}`}
          onClick={() => setActiveTab('tactics')}
        >
          🎯 {t('negotiation.tactics', 'Tactics')}
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'common' ? styles.active : ''}`}
          onClick={() => setActiveTab('common')}
        >
          💰 {t('negotiation.common', 'Common Benefits')}
        </button>
      </div>

      <div className={styles.tipsList}>
        {tips[activeTab].map((tip, index) => (
          <motion.div 
            key={index}
            className={styles.tipCard}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className={styles.tipNumber}>{index + 1}</span>
            <p className={styles.tipText}>{tip}</p>
          </motion.div>
        ))}
      </div>

      <div className={styles.insight}>
        <h4>⚡ {t('negotiation.reminder', 'Remember')}</h4>
        <ul>
          <li>{t('negotiation.always', 'Always negotiate - the worst they can say is no')}</li>
          <li>{t('negotiation.confidence', 'Confidence is key - practice your pitch')}</li>
          <li>{t('negotiation.timing', 'Wait for the offer before negotiating')}</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default SalaryNegotiationTips;
