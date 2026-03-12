import { useTranslation } from 'react-i18next';
import useAppStore from '../../store/useAppStore';
import { formatCurrency } from '../../services/utils/formatters';
import styles from './AffiliateLinks.module.scss';

interface Affiliate {
  id: string;
  name: string;
  nameEs: string;
  description: string;
  descriptionEs: string;
  url: string;
  icon: string;
}

const affiliates: Affiliate[] = [
  {
    id: 'wise',
    name: 'Wise',
    nameEs: 'Wise',
    description: 'Send money abroad with the real exchange rate',
    descriptionEs: 'Envía dinero al extranjero con el tipo de cambio real',
    url: 'https://wise.com/?utm_source=howpooriam&utm_medium=referral',
    icon: '💱'
  },
  {
    id: 'revolut',
    name: 'Revolut',
    nameEs: 'Revolut',
    description: 'All-in-one financial superapp',
    descriptionEs: 'Superapp financiera todo en uno',
    url: 'https://revolut.com/?invite_code=REFERRAL&utm_source=howpooriam&utm_medium=referral',
    icon: '💳'
  },
  {
    id: 'remitly',
    name: 'Remitly',
    nameEs: 'Remitly',
    description: 'Fast and secure international transfers',
    descriptionEs: 'Transferencias internacionales rápidas y seguras',
    url: 'https://remitly.com/?utm_source=howpooriam&utm_medium=referral',
    icon: '🏦'
  }
];

const AffiliateLinks: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { originCountry, salaryInUSD } = useAppStore();

  if (!originCountry || salaryInUSD === 0) {
    return null;
  }

  const isSpanish = i18n.language === 'es';

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        {isSpanish ? '💰 Envía dinero al extranjero' : '💰 Send money abroad'}
      </h3>
      <p className={styles.subtitle}>
        {isSpanish 
          ? `Compara precios y envía tu salario de ${formatCurrency(salaryInUSD, 'USD')} de forma segura`
          : `Compare rates and send your salary of ${formatCurrency(salaryInUSD, 'USD')} securely`
        }
      </p>
      
      <div className={styles.grid}>
        {affiliates.map((affiliate) => (
          <a
            key={affiliate.id}
            href={affiliate.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <span className={styles.icon}>{affiliate.icon}</span>
            <div className={styles.content}>
              <span className={styles.name}>
                {isSpanish ? affiliate.nameEs : affiliate.name}
              </span>
              <span className={styles.description}>
                {isSpanish ? affiliate.descriptionEs : affiliate.description}
              </span>
            </div>
            <span className={styles.cta}>
              {isSpanish ? 'Ver más →' : 'Learn more →'}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default AffiliateLinks;
