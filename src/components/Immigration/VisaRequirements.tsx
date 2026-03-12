import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import useAppStore from '../../store/useAppStore';
import styles from './VisaRequirements.module.scss';

interface VisaData {
  countryId: string;
  visaType: string;
  visaTypeEs: string;
  processingTime: string;
  processingTimeEs: string;
  cost: number;
  requirements: string[];
  requirementsEs: string[];
  validity: string;
  workAllowed: boolean;
}

const visaData: VisaData[] = [
  { countryId: 'es', visaType: 'Digital Nomad Visa', visaTypeEs: 'Visa Nómada Digital', processingTime: '1-3 months', processingTimeEs: '1-3 meses', cost: 460, requirements: ['Proof of income €2,334/month', 'Health insurance', 'Clean criminal record', 'Remote work contract'], requirementsEs: ['Ingresos €2,334/mes', 'Seguro médico', 'Antecedentes penales limpios', 'Contrato remoto'], validity: '3 years (renewable)', workAllowed: true },
  { countryId: 'pt', visaType: 'Digital Nomad Visa', visaTypeEs: 'Visa Nómada Digital', processingTime: '2-4 months', processingTimeEs: '2-4 meses', cost: 350, requirements: ['Proof of income €3,500/month', 'Health insurance', 'Remote work for foreign company'], requirementsEs: ['Ingresos €3,500/mes', 'Seguro médico', 'Trabajo remoto para empresa extranjera'], validity: '2 years (renewable)', workAllowed: true },
  { countryId: 'de', visaType: 'EU Blue Card', visaTypeEs: 'Tarjeta Azul UE', processingTime: '2-4 months', processingTimeEs: '2-4 meses', cost: 375, requirements: ['University degree', 'Job offer €45,300+', 'Health insurance', 'Clean criminal record'], requirementsEs: ['Título universitario', 'Oferta laboral €45,300+', 'Seguro médico', 'Antecedentes limpios'], validity: '4 years', workAllowed: true },
  { countryId: 'gb', visaType: 'Skilled Worker Visa', visaTypeEs: 'Visa Trabajador Cualificado', processingTime: '3-8 weeks', processingTimeEs: '3-8 semanas', cost: 610, requirements: ['Job offer from approved sponsor', 'English proficiency', 'Proof of funds', 'Clean criminal record'], requirementsEs: ['Oferta de sponsor aprobado', 'Inglés fluido', 'Fondos suficientes', 'Antecedentes limpios'], validity: '5 years (renewable)', workAllowed: true },
  { countryId: 'nl', visaType: 'Kennismigrant Visa', visaTypeEs: 'Visa Kennismigrant', processingTime: '2-4 weeks', processingTimeEs: '2-4 semanas', cost: 310, requirements: ['Job offer €3,000+/month', 'University degree or 5yrs experience', 'Health insurance'], requirementsEs: ['Oferta €3,000+/mes', 'Título o 5 años experiencia', 'Seguro médico'], validity: '5 years (max)', workAllowed: true },
  { countryId: 'mx', visaType: 'Residente Temporal', visaTypeEs: 'Temporary Resident', processingTime: '2-4 weeks', processingTimeEs: '2-4 semanas', cost: 330, requirements: ['Proof of income $2,600/month', 'Bank statements', 'No criminal record', 'Application from abroad'], requirementsEs: ['Ingresos $2,600/mes', 'Estados de cuenta', 'Sin antecedentes', 'Solicitud desde afuera'], validity: '1-4 years', workAllowed: true },
];

const VisaRequirements: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { destinationCountry } = useAppStore();

  const visaInfo = useMemo(() => {
    if (!destinationCountry) return visaData[0];
    return visaData.find(v => v.countryId === destinationCountry.id) || visaData[0];
  }, [destinationCountry]);

  const isEs = i18n.language === 'es';

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          📋 {t('visa.title', 'Visa Requirements')}
        </h3>
        <p className={styles.subtitle}>
          {t('visa.subtitle', 'Work visa information for your destination')}
        </p>
      </div>

      {!destinationCountry && (
        <div className={styles.placeholder}>
          <p>{t('visa.selectDestination', 'Select a destination country to see visa requirements')}</p>
        </div>
      )}

      {destinationCountry && (
        <>
          <div className={styles.visaCard}>
            <div className={styles.visaHeader}>
              <span className={styles.visaIcon}>🛂</span>
              <div className={styles.visaInfo}>
                <span className={styles.visaType}>{isEs ? visaInfo.visaTypeEs : visaInfo.visaType}</span>
                <span className={styles.visaValidity}>{visaInfo.validity}</span>
              </div>
            </div>

            <div className={styles.visaDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>⏱️</span>
                <div className={styles.detailInfo}>
                  <span className={styles.detailLabel}>{t('visa.processing', 'Processing Time')}</span>
                  <span className={styles.detailValue}>{isEs ? visaInfo.processingTimeEs : visaInfo.processingTime}</span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>💰</span>
                <div className={styles.detailInfo}>
                  <span className={styles.detailLabel}>{t('visa.cost', 'Approximate Cost')}</span>
                  <span className={styles.detailValue}>${visaInfo.cost} USD</span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailIcon}>💼</span>
                <div className={styles.detailInfo}>
                  <span className={styles.detailLabel}>{t('visa.workAllowed', 'Work Allowed')}</span>
                  <span className={`${styles.detailValue} ${visaInfo.workAllowed ? styles.success : styles.error}`}>
                    {visaInfo.workAllowed ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.requirements}>
              <h4>📝 {t('visa.requirements', 'Requirements')}</h4>
              <ul>
                {(isEs ? visaInfo.requirementsEs : visaInfo.requirements).map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.disclaimer}>
            <p>⚠️ {t('visa.disclaimer', 'Visa requirements change frequently. Always verify with the official immigration website of the destination country.')}</p>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default VisaRequirements;
